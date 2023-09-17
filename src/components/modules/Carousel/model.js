import { createStore, createEvent, sample } from 'effector';
import { spread } from 'patronum/spread';

export const offsetRight = createEvent();
export const offsetLeft = createEvent();
export const viewWidthChanged = createEvent()

export const $offset = createStore(0);
export const $currentSlide = createStore(0);
export const $viewWidth = createStore(450)
  .on(viewWidthChanged, (viewWidth, newWidth) => newWidth);

sample({
  clock: viewWidthChanged,
  source: { offset: $offset, currentSlide: $currentSlide, viewWidth: $viewWidth },
  fn: ({ offset, currentSlide, viewWidth }) => {
    let newOffset = viewWidth * currentSlide;
    if (newOffset === 0) return { offset: newOffset };
    return {offset: -newOffset};
  },
  target: spread({
    targets: { offset: $offset },
  }),
});

sample({
  clock: offsetRight,
  source: { offset: $offset, currentSlide: $currentSlide, viewWidth: $viewWidth },
  filter: ({ offset, viewWidth }) => (-(viewWidth * 2) <= (offset - viewWidth)),
  fn: ({ offset, currentSlide, viewWidth }) => {
    const newOffset = offset - viewWidth;
    const newSlide = ++currentSlide;
    return { offset: newOffset, currentSlide: newSlide };
  },
  target: spread({
    targets: { offset: $offset, currentSlide: $currentSlide },
  }),
});

sample({
  clock: offsetLeft,
  source: { offset: $offset, currentSlide: $currentSlide, viewWidth: $viewWidth },
  filter: ({ offset, viewWidth }) => ((offset + viewWidth) <= 0),
  fn: ({ offset, currentSlide, viewWidth }) => {
    const newOffset = offset + viewWidth;
    const newSlide = --currentSlide;
    return { offset: newOffset, currentSlide: newSlide };
  },
  target: spread({
    targets: { offset: $offset, currentSlide: $currentSlide },
  }),
});


$offset.watch((offset) => console.log('Current Offset = ', offset));
$currentSlide.watch((slide) => console.log('Current Slide = ', slide));
$viewWidth.watch((width) => console.log('Width = ', width));
