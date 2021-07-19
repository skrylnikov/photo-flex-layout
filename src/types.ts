export type IAspectRatio = number;

export type IAspectRatioList = IAspectRatio[];

export interface IDimension {
  width: number;
  height: number;
}

export type IDimensionList = IDimension[];

export type IInput = Array<IAspectRatio | IDimension>;

export interface IPadding {
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
}

export interface ISpacing {
  horizontal?: number;
  vertical?: number;
}

/**
 * Options for configuring the flex layout.
 */

export interface IPhotoFlexLayoutOptions {
  /**
   * The width that boxes will be contained within irrelevant of padding.
   * @default 1060
   */

  containerWidth?: number;
  /**
   * Provide a single integer to apply padding to all sides or provide an object to apply
   * individual values to each side.
   * @default 5
   */
  containerPadding?: number | IPadding;
  /**
   * Provide a single integer to apply spacing both horizontally and vertically or provide an
   * object to apply individual values to each axis.
   * @default 10
   */
  boxSpacing?: number | ISpacing;
  /**
   * It's called a target because row height is the lever we use in order to fit everything in
   * nicely. The algorithm will get as close to the target row height as it can.
   * @default 250
   */
  targetRowHeight?: number;
}

export interface IOptionsStrict {
  containerWidth: number;
  containerPadding: Required<IPadding>;
  boxSpacing: Required<ISpacing>;
  targetRowHeight: number;
}

/**
 * Computed positional and sizing properties of a box in the layout.
 */
export interface ILayoutBox {
  /**
   * Aspect ratio of the box.
   */
  aspectRatio: number;
  /**
   * Distance between the top side of the box and the top boundary of the flex layout.
   */
  top: number;
  /**
   * Width of the box in a flex layout.
   */
  width: number;
  /**
   * Height of the box in a flex layout.
   */
  height: number;
  /**
   * Distance between the left side of the box and the left boundary of the flex layout.
   */
  left: number;
  /**
   * Row id.
   */
  rowId: number;
}

/**
 * Results from calculating the flex layout.
 */
export interface IPhotoFlexLayoutResult {
  /**
   * Height of the container containing the flex layout.
   */
  containerHeight: number;
  /**
   * Computed positional and sizing properties of a box in the flex layout.
   */
  boxes: ILayoutBox[];
}

export type IGraphBuilder = (start: number) => Map<number, number>;

export interface INode {
  id: number;
  weight: number;
}
