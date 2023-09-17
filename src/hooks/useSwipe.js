import { useEffect } from 'react';
import { SWIPE_DIRECTION } from '../constants/swipeDirection.constants';

function useSwipe(ref, onSwipe) {
  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    };

    let x1 = null;
    let y1 = null;

    const handleTouchStart = (e) => {
      e.preventDefault();
      const firstTouch = e.touches[0];

      x1 = firstTouch.clientX;
      y1 = firstTouch.clientY;
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      const x2 = e.changedTouches[0].clientX;
      const y2 = e.changedTouches[0].clientY;

      const xDiff = x2 - x1;
      const yDiff = y2 - y1;

      let direction = null;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          direction = SWIPE_DIRECTION.right;
        } else {
          direction = SWIPE_DIRECTION.left;

        }
      } else if (yDiff > 0) {
        direction = SWIPE_DIRECTION.bottom;

      } else {
        direction = SWIPE_DIRECTION.top;

      }

      if (direction && onSwipe) {
        onSwipe(direction);
      }

      x1 = null;
      y1 = null;
    };

    node.addEventListener('touchstart', handleTouchStart);
    node.addEventListener('touchend', handleTouchEnd);

    return function () {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
}

export default useSwipe;
