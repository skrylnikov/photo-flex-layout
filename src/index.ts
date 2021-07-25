export * from './types';

import {
  IInput,
  IPhotoFlexLayoutOptions,
  IAspectRatioList,
  ILayoutBox,
  IPhotoFlexLayoutResult,
} from './types';
import {
  importToAspectRatioList,
  parseOptions,
  calcLimitNodeSearch,
  calcCost,
  calcCommonHeight,
} from './utils';
import { findShortestPath } from './find-shortest-path';

interface IMakeGetNeighborsOptions {
  aspectRatioList: IAspectRatioList;
  containerWidth: number;
  targetRowHeight: number;
  horizontalBoxSpacing: number;
  limitNodeSearch: number;
}

// return function that gets the neighboring nodes of node and returns costs
const makeGetNeighbors = ({
  aspectRatioList,
  targetRowHeight,
  containerWidth,
  limitNodeSearch,
  horizontalBoxSpacing,
}: IMakeGetNeighborsOptions) => (start: number) => {
  const results = new Map<number, number>();
  // start = +start;
  results.set(start, 0);
  for (let i = start + 1; i < aspectRatioList.length + 1; ++i) {
    if (i - start > limitNodeSearch) break;
    results.set(
      i,
      calcCost({
        aspectRatioList,
        start,
        end: i,
        containerWidth,
        targetRowHeight,
        horizontalBoxSpacing,
      }),
    );
  }
  return results;
};

export const photoFlexLayout = (
  input: IInput,
  options?: IPhotoFlexLayoutOptions,
): IPhotoFlexLayoutResult => {
  const aspectRatioList = importToAspectRatioList(input);
  const config = parseOptions(options);

  const limitNodeSearch = calcLimitNodeSearch(
    config.containerWidth,
    config.targetRowHeight,
  );

  const {
    targetRowHeight,
    containerWidth,
    containerPadding,
    boxSpacing,
  } = config;

  const getNeighbors = makeGetNeighbors({
    targetRowHeight,
    containerWidth:
      containerWidth - containerPadding.left - containerPadding.right,
    aspectRatioList,
    limitNodeSearch,
    horizontalBoxSpacing: boxSpacing.horizontal,
  });

  const path = findShortestPath(getNeighbors, 0, aspectRatioList.length);

  const result: ILayoutBox[] = [];

  let containerHeight = containerPadding.top;

  for (let rowId = 0; rowId < path.length - 1; ++rowId) {
    const row = aspectRatioList.slice(path[rowId], path[rowId + 1]);

    let height = calcCommonHeight({
      aspectRatioList: row,
      containerWidth:
        containerWidth - containerPadding.left - containerPadding.right,
      horizontalBoxSpacing: boxSpacing.horizontal,
    });

    if (rowId === path.length - 2) {
      height = Math.min(height, targetRowHeight * 1.5);
    }

    let left = containerPadding.left;

    for (
      let aspectRatioId = path[rowId];
      aspectRatioId < path[rowId + 1];
      ++aspectRatioId
    ) {
      const aspectRatio = aspectRatioList[aspectRatioId];

      const width = Math.round(height * aspectRatio);

      result.push({
        width,
        height,
        aspectRatio: aspectRatio,
        top: containerHeight,
        left,
        rowId,
      });

      left += width + boxSpacing.horizontal;
    }
    containerHeight += height + boxSpacing.vertical;
  }

  containerHeight += containerPadding.bottom;

  return {
    containerHeight,
    boxes: result,
  };
};
