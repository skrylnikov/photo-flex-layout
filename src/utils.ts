import {
  IInput,
  IAspectRatioList,
  IPhotoFlexLayoutOptions,
  IOptionsStrict,
  IPadding,
  ISpacing,
} from './types';

export const importToAspectRatioList = (inputList: IInput): IAspectRatioList =>
  inputList.map(input =>
    typeof input === 'number' ? input : input.width / input.height,
  );

export const parseOptions = (
  config?: IPhotoFlexLayoutOptions,
): IOptionsStrict => {
  const containerWidth = Number.isFinite(config?.containerWidth)
    ? (config?.containerWidth as number)
    : 1060;
  const targetRowHeight = Number.isFinite(config?.targetRowHeight)
    ? (config?.targetRowHeight as number)
    : 250;

  const isPaddingNumber =
    typeof config?.containerPadding === 'number' &&
    Number.isFinite(config?.containerPadding);
  const isPaddingObject =
    !isPaddingNumber &&
    typeof config?.containerPadding === 'object' &&
    config?.containerPadding;

  const containerPadding: Required<IPadding> = {
    top: isPaddingNumber
      ? (config?.containerPadding as number)
      : isPaddingObject &&
        Number.isFinite((config?.containerPadding as IPadding).top)
      ? ((config?.containerPadding as IPadding).top as number)
      : 10,
    bottom: isPaddingNumber
      ? (config?.containerPadding as number)
      : isPaddingObject &&
        Number.isFinite((config?.containerPadding as IPadding).bottom)
      ? ((config?.containerPadding as IPadding).bottom as number)
      : 10,
    left: isPaddingNumber
      ? (config?.containerPadding as number)
      : isPaddingObject &&
        Number.isFinite((config?.containerPadding as IPadding).left)
      ? ((config?.containerPadding as IPadding).left as number)
      : 10,
    right: isPaddingNumber
      ? (config?.containerPadding as number)
      : isPaddingObject &&
        Number.isFinite((config?.containerPadding as IPadding).right)
      ? ((config?.containerPadding as IPadding).right as number)
      : 10,
  };

  const isSpacingNumber =
    typeof config?.boxSpacing === 'number' &&
    Number.isFinite(config?.boxSpacing);
  const isSpacingObject =
    !isSpacingNumber &&
    typeof config?.boxSpacing === 'object' &&
    config?.boxSpacing;

  const boxSpacing: Required<ISpacing> = {
    vertical: isSpacingNumber
      ? (config?.boxSpacing as number)
      : isSpacingObject &&
        Number.isFinite((config?.boxSpacing as ISpacing).vertical)
      ? ((config?.boxSpacing as ISpacing).vertical as number)
      : 10,
    horizontal: isSpacingNumber
      ? (config?.boxSpacing as number)
      : isSpacingObject &&
        Number.isFinite((config?.boxSpacing as ISpacing).horizontal)
      ? ((config?.boxSpacing as ISpacing).horizontal as number)
      : 10,
  };

  return {
    containerWidth,
    containerPadding,
    boxSpacing,
    targetRowHeight,
  };
};

export const calcLimitNodeSearch = (
  containerWidth: number,
  targetRowHeight: number,
) =>
  containerWidth > 500
    ? Math.round(containerWidth / targetRowHeight / 1.5) + 8
    : 5;

interface IGetCommonHeightOptions {
  aspectRatioList: IAspectRatioList;
  containerWidth: number;
  horizontalBoxSpacing: number;
}

export const calcCommonHeight = ({
  aspectRatioList,
  containerWidth,
  horizontalBoxSpacing,
}: IGetCommonHeightOptions) => {
  const rowWidth =
    containerWidth - aspectRatioList.length * (horizontalBoxSpacing * 2);

  const totalAspectRatio = aspectRatioList.reduce(
    (acc, ratio) => acc + ratio,
    0,
  );
  return Math.round(rowWidth / totalAspectRatio);
};

interface ICostOptions {
  aspectRatioList: IAspectRatioList;
  start: number;
  end: number;
  containerWidth: number;
  targetRowHeight: number;
  horizontalBoxSpacing: number;
}

// calculate the cost of breaking at this node (edge weight)
export const calcCost = ({
  aspectRatioList,
  start,
  end,
  containerWidth,
  targetRowHeight,
  horizontalBoxSpacing,
}: ICostOptions) => {
  const row = aspectRatioList.slice(start, end);
  const commonHeight = calcCommonHeight({
    aspectRatioList: row,
    containerWidth,
    horizontalBoxSpacing,
  });
  return Math.pow(Math.abs(commonHeight - targetRowHeight), 2);
};
