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

## Install

```bash
npm add photo-flex-layout
```

## Usage

```typescript
import { photoFlexLayout } from 'photo-flex-layout';

const { containerHeight, boxes } = photoFlexLayout({
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

containerHeight; //334

boxes; // [{width: 83.5, height: 167, top: 0, left: 0, ...}, {width: 250.5, height: 167, top: 10, left: 83.5, ...}, ...]
```

## Thanks

Inspired by [react-photo-gallery](https://github.com/neptunian/react-photo-gallery) by [Sandra Gonzales](https://github.com/neptunian).
