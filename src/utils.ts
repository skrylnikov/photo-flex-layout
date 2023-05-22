import { IAspectRatioList } from './types';

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
    containerWidth - aspectRatioList.length * horizontalBoxSpacing;

  const totalAspectRatio = aspectRatioList.reduce(
    (acc, ratio) => acc + ratio,
    0,
  );
  // return Math.ceil(rowWidth / totalAspectRatio);
  return rowWidth / totalAspectRatio;
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
