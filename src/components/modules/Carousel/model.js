import { createStore, createEvent, sample } from 'effector';
import { spread } from 'patronum/spread';

export const offsetRight = createEvent();
export const offsetLeft = createEvent();
export const viewWidthChanged = createEvent();
export const slideLengthSet = createEvent();

export const $offset = createStore(0);
export const $currentSlide = createStore(0);
export const $slideLength = createStore(0)
  .on(slideLengthSet, (_, newLength) => newLength);

export const $viewWidth = createStore(450)
  .on(viewWidthChanged, (viewWidth, newWidth) => newWidth);

sample({
  clock: viewWidthChanged,
  source: { offset: $offset, currentSlide: $currentSlide, viewWidth: $viewWidth },
  fn: ({ currentSlide, viewWidth }) => {
    let newOffset = viewWidth * currentSlide;
    if (newOffset === 0) return { offset: newOffset };
    return { offset: -newOffset };
  },
  target: spread({
    targets: { offset: $offset },
  }),
});

sample({
  clock: offsetRight,
  source: { offset: $offset, currentSlide: $currentSlide, viewWidth: $viewWidth, slideLength: $slideLength },
  fn: ({ offset, currentSlide, viewWidth, slideLength }) => {
    let newOffset = offset - viewWidth;
    let newSlide = ++currentSlide;
    if (currentSlide === slideLength) {
      newOffset = offset + ((slideLength - 1) * viewWidth);
      newSlide = 0;
    }
    return { offset: newOffset, currentSlide: newSlide };
  },
  target: spread({
    targets: { offset: $offset, currentSlide: $currentSlide },
  }),
});

sample({
  clock: offsetLeft,
  source: { offset: $offset, currentSlide: $currentSlide, viewWidth: $viewWidth, slideLength: $slideLength },
  fn: ({ offset, currentSlide, viewWidth, slideLength }) => {
    let newOffset = offset + viewWidth;
    let newSlide = --currentSlide;
    if (currentSlide < 0) {
      newOffset = offset - ((slideLength - 1) * viewWidth);
      newSlide = slideLength - 1;
    }
    return { offset: newOffset, currentSlide: newSlide };
  },
  target: spread({
    targets: { offset: $offset, currentSlide: $currentSlide },
  }),
});


$offset.watch((offset) => console.log('Current Offset = ', offset));
$currentSlide.watch((slide) => console.log('Current Slide = ', slide));
$slideLength.watch((length) => console.log('Length = ', length));
$viewWidth.watch((width) => console.log('Width = ', width));
