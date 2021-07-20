# Photo Flex Layout

![Github license](https://badgen.net/github/license/skrylnikov/photo-flex-layout)
[![Npm version](https://badgen.net/npm/v/photo-flex-layout)](https://www.npmjs.com/package/photo-flex-layout)
![Npm types](https://badgen.net/npm/types/photo-flex-layout)
[![Bundlephobia size](https://badgen.net/bundlephobia/minzip/photo-flex-layout)](https://bundlephobia.com/package/photo-flex-layout)

Simple for use and beutiful layout for photo.

- **Small** 2 kbytes (minified and gzipped). Size Limit controls the size.
- **Beutiful** This is implementation [Google Photo Flex Layout](https://medium.com/google-design/google-photos-45b714dfbed1)
- **Framework agnostic**
- It has good **TypeScript** support.

```typescript
import { photoFlexLayout } from 'photo-flex-layout';

const { containerHeight, boxes } = photoFlexLayout([0.5, 1.5, 1, 1, 1, 1, 1]);

containerHeight; //183

boxes; // [{width: 77, height: 163, top: 10, left: 10, ...}, {width: 230, height: 163, top: 10, left: 97, ...}, ...]
```

## Install

```bash
npm install --save photo-flex-layout
```

## Usage

Without config:

```typescript
photoFlexLayout([0.5, 1.5, 1]);
```

With width and height:

```typescript
photoFlexLayout([
  { width: 100, height: 200 },
  { width: 200, height: 200 },
]);
```

Without paddings

```typescript
photoFlexLayout([...], { boxSpacing: 0, containerPadding: 0 });
```

With custom paddings

```typescript
photoFlexLayout([...], {
  boxSpacing: { horizontal: 10, vertical: 5 },
  containerPadding: { top: 20, bottom: 0, left: 0, right: 0 },
});
```

With custom width and target height

```typescript
photoFlexLayout([...], { targetRowHeight: 200, containerWidth: 500 });
```

## Thanks

Inspired by [react-photo-gallery](https://github.com/neptunian/react-photo-gallery) by [Sandra Gonzales](https://github.com/neptunian).
