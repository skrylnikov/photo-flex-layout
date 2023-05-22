import { photoFlexLayout } from '../src';

describe('Photo flex layout', () => {
  it('empty layout', () => {
    const layout = photoFlexLayout({
      targetRowHeight: 100,
      containerWidth: 300,
      boxSpacing: 0,
      items: [],
    });

    expect(layout.boxes.length).toBe(0);
  });
  it('square layout', () => {
    const layout = photoFlexLayout({
      targetRowHeight: 100,
      containerWidth: 300,
      boxSpacing: 0,
      items: [
        { width: 100, height: 100 },
        { width: 100, height: 100 },
        { width: 100, height: 100 },
      ],
    });

    expect(layout.containerHeight).toBe(100);
    expect(layout.boxes.length).toBe(3);
    expect(layout.boxes.map((x) => x.rowId)).toEqual([0, 0, 0]);
    expect(layout.boxes.map((x) => x.top)).toEqual([0, 0, 0]);
    expect(layout.boxes.map((x) => x.aspectRatio)).toEqual([1, 1, 1]);
    expect(layout.boxes.map((x) => x.left)).toEqual([0, 100, 200]);
  });
  it('simple layout', () => {
    const layout = photoFlexLayout({
      targetRowHeight: 200,
      containerWidth: 500,
      boxSpacing: 0,
      items: [
        { width: 100, height: 200 },
        { width: 150, height: 100 },
        { width: 100, height: 100 },
        { width: 100, height: 100 },
        { width: 100, height: 100 },
        { width: 100, height: 100 },
      ],
    });
    console.log(layout.boxes);
    expect(layout.containerHeight).toBe(334);
    expect(layout.boxes.length).toBe(6);
    expect(layout.boxes.map((x) => x.rowId)).toEqual([0, 0, 0, 1, 1, 1]);
    expect(layout.boxes.map((x) => x.top)).toEqual([0, 0, 0, 167, 167, 167]);
    expect(layout.boxes.map((x) => x.aspectRatio)).toEqual([
      0.5, 1.5, 1, 1, 1, 1,
    ]);
  });

  it('real example with bad rounding', () => {
    const layout = photoFlexLayout({
      targetRowHeight: 280,
      containerWidth: 1897,
      boxSpacing: 0,
      items: [
        { width: 3619, height: 5661 },
        { width: 5832, height: 3521 },
        { width: 5397, height: 1971 },
        { width: 5040, height: 4160 },
        { width: 4992, height: 3744 },
        { width: 6063, height: 3651 },
        { width: 2719, height: 4160 },
        { width: 4329, height: 3833 },
        { width: 4582, height: 4160 },
        { width: 4222, height: 4160 },
        { width: 4408, height: 3304 },
        { width: 2419, height: 2419 },
        { width: 4601, height: 3147 },
        { width: 4403, height: 4160 },
        { width: 3795, height: 2558 },
        { width: 4483, height: 2736 },
        { width: 4497, height: 4160 },
        { width: 3630, height: 4160 },
        { width: 4689, height: 2488 },
        { width: 4890, height: 3806 },
        { width: 4840, height: 4111 },
        { width: 5429, height: 3221 },
        { width: 2260, height: 2342 },
        { width: 3832, height: 3832 },
        { width: 5766, height: 4160 },
        { width: 4160, height: 4160 },
        { width: 2118, height: 2118 },
        { width: 5305, height: 4160 },
        { width: 6240, height: 3539 },
        { width: 2566, height: 2566 },
        { width: 2102, height: 2102 },
        { width: 4160, height: 4160 },
        { width: 3789, height: 3789 },
        { width: 4160, height: 6240 },
        { width: 5547, height: 4160 },
        { width: 5494, height: 4120 },
        { width: 4523, height: 4160 },
        { width: 6240, height: 4160 },
      ],
    });

    const row0 = layout.boxes.filter((x) => x.rowId === 0);
    const row1 = layout.boxes.filter((x) => x.rowId === 1);
    const row2 = layout.boxes.filter((x) => x.rowId === 2);
    const row3 = layout.boxes.filter((x) => x.rowId === 3);
    const row4 = layout.boxes.filter((x) => x.rowId === 4);
    const row5 = layout.boxes.filter((x) => x.rowId === 5);
    const row6 = layout.boxes.filter((x) => x.rowId === 6);

    expect(row0.reduce((acc, x) => acc + x.width, 0)).toBe(1897);
    expect(row1.reduce((acc, x) => acc + x.width, 0)).toBe(1897.0000000000002);
    expect(row2.reduce((acc, x) => acc + x.width, 0)).toBe(1897);
    expect(row3.reduce((acc, x) => acc + x.width, 0)).toBe(1897);
    expect(row4.reduce((acc, x) => acc + x.width, 0)).toBe(1897.02);
    expect(row5.reduce((acc, x) => acc + x.width, 0)).toBe(1897);
    expect(row6.reduce((acc, x) => acc + x.width, 0)).toBe(1897);
  });
});
