import { useState, useRef, useEffect} from 'react';
import { useStore, useUnit } from 'effector-react';
import styles from './ViewWindow.module.scss';
import { $offset, $viewWidth, viewWidthChanged } from '../../modules/Carousel/model';
import Item from './Item/Item';

function ViewWindow({ children }) {
  const offset = useStore($offset);
  const viewWidth = useStore($viewWidth);
  const onViewWidthChanged = useUnit(viewWidthChanged);
  const viewWindowRef = useRef();

  useEffect(() => {
    const resizeHandler = () => {
      const width = viewWindowRef.current.offsetWidth;
      onViewWidthChanged(width);
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [onViewWidthChanged, viewWidth]);

  return (
    <div className={styles['view-window']} ref={viewWindowRef}>
      <div
        className={styles['view-window__items-container']}
        style={{
          transform: `translateX(${offset}px)`,
        }}
      >
        {children.map((item, index) => (
          <Item key={index}>{item}</Item>
        ))}
      </div>
    </div>
  );
}

// ViewWindow.Item = Item;

export default ViewWindow;
