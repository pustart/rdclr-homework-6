import { createStore, createEvent, sample } from 'effector';
import { spread } from 'patronum/spread';

const VIEW_WIDTH = 450;

export const $offset = createStore(0);
export const $currentSlide = createStore(0);

export const offsetRight = createEvent();
export const offsetLeft = createEvent();

export const currentSlideIncrement = createEvent();
export const currentSlideDecrement = createEvent();

sample({
  clock: offsetRight,
  source: { offset: $offset, currentSlide: $currentSlide },
  filter: ({ offset }) => (-(VIEW_WIDTH * 2) <= (offset - VIEW_WIDTH)),
  fn: ({ offset, currentSlide }) => {
    const newOffset = offset - VIEW_WIDTH;
    const newSlide = ++currentSlide;
    return { offset: newOffset, currentSlide: newSlide };
  },
  target: spread({
    targets: { offset: $offset, currentSlide: $currentSlide },
  }),
});

sample({
  clock: offsetLeft,
  source: { offset: $offset, currentSlide: $currentSlide },
  filter: ({ offset }) => ((offset + VIEW_WIDTH) <= 0),
  fn: ({ offset, currentSlide }) => {
    const newOffset = offset + VIEW_WIDTH;
    const newSlide = --currentSlide;
    return { offset: newOffset, currentSlide: newSlide };
  },
  target: spread({
    targets: { offset: $offset, currentSlide: $currentSlide },
  }),
});


$offset.watch((offset) => console.log('Current Offset = ', offset));
$currentSlide.watch((slide) => console.log('Current Slide = ', slide));
