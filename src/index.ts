export * from './types';

import {
  IPhotoFlexLayoutOptions,
  IAspectRatioList,
  ILayoutBox,
  IPhotoFlexLayoutResult,
} from './types';
import { calcLimitNodeSearch, calcCost, calcCommonHeight } from './utils';
import { findShortestPath } from './find-shortest-path';

interface IMakeGetNeighborsOptions {
  aspectRatioList: IAspectRatioList;
  containerWidth: number;
  targetRowHeight: number;
  horizontalBoxSpacing: number;
  limitNodeSearch: number;
}

// return function that gets the neighboring nodes of node and returns costs
const makeGetNeighbors =
  ({
    aspectRatioList,
    targetRowHeight,
    containerWidth,
    limitNodeSearch,
    horizontalBoxSpacing,
  }: IMakeGetNeighborsOptions) =>
  (start: number) => {
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

export const photoFlexLayout = ({
  items,
  containerWidth,
  targetRowHeight,
  boxSpacing,
}: IPhotoFlexLayoutOptions): IPhotoFlexLayoutResult => {
  const aspectRatioList = items.map((x) => x.width / x.height);

  // containerWidth =
  //   containerWidth % 2 === 0 ? containerWidth : containerWidth - 1;

  const limitNodeSearch = calcLimitNodeSearch(containerWidth, targetRowHeight);

  const horizontalBoxSpacing =
    typeof boxSpacing === 'number' ? boxSpacing : boxSpacing.horizontal;
  const verticalBoxSpacing =
    typeof boxSpacing === 'number' ? boxSpacing : boxSpacing.vertical;

  const getNeighbors = makeGetNeighbors({
    targetRowHeight,
    containerWidth,
    aspectRatioList,
    limitNodeSearch,
    horizontalBoxSpacing,
  });

  const path = findShortestPath(getNeighbors, 0, aspectRatioList.length);

  const result: ILayoutBox[] = [];

  let containerHeight = 0;

  for (let rowId = 0; rowId < path.length - 1; ++rowId) {
    const row = aspectRatioList.slice(path[rowId], path[rowId + 1]);

    let height = calcCommonHeight({
      aspectRatioList: row,
      containerWidth,
      horizontalBoxSpacing,
    });

    if (rowId === path.length - 2 && height > targetRowHeight * 1.3) {
      height = targetRowHeight;
    }

    let left = 0;

    for (
      let aspectRatioId = path[rowId];
      aspectRatioId < path[rowId + 1];
      ++aspectRatioId
    ) {
      const aspectRatio = aspectRatioList[aspectRatioId];

      const width = Math.round(height * aspectRatio * 100) / 100;

      result.push({
        width,
        height,
        aspectRatio: aspectRatio,
        top: containerHeight,
        left,
        rowId,
      });

      left += width + horizontalBoxSpacing;
    }
    containerHeight += Math.ceil(height + verticalBoxSpacing);
  }

  return {
    containerHeight: containerHeight,
    boxes: result,
  };
};
