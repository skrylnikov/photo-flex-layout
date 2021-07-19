import { photoFlexLayout } from '../src';

describe('Photo flex layout', () => {
  it('empty layout', () => {
    const layout = photoFlexLayout([]);

    expect(layout.boxes.length).toBe(0);
  });
  it('square layout', () => {
    const layout = photoFlexLayout([1, 1, 1], {
      targetRowHeight: 100,
      containerWidth: 300,
      boxSpacing: 0,
      containerPadding: 0,
    });

    expect(layout.containerHeight).toBe(100);
    expect(layout.boxes.length).toBe(3);
    expect(layout.boxes.map(x => x.rowId)).toEqual([0, 0, 0]);
    expect(layout.boxes.map(x => x.top)).toEqual([0, 0, 0]);
    expect(layout.boxes.map(x => x.aspectRatio)).toEqual([1, 1, 1]);
    expect(layout.boxes.map(x => x.left)).toEqual([0, 100, 200]);
  });
  it('simple layout', () => {
    const layout = photoFlexLayout([0.5, 1.5, 1, 1, 1, 1], {
      targetRowHeight: 200,
      containerWidth: 500,
      boxSpacing: 0,
      containerPadding: 0,
    });

    expect(layout.containerHeight).toBe(334);
    expect(layout.boxes.length).toBe(6);
    expect(layout.boxes.map(x => x.rowId)).toEqual([0, 0, 0, 1, 1, 1]);
    expect(layout.boxes.map(x => x.top)).toEqual([0, 0, 0, 167, 167, 167]);
    expect(layout.boxes.map(x => x.aspectRatio)).toEqual([
      0.5,
      1.5,
      1,
      1,
      1,
      1,
    ]);
  });
});
