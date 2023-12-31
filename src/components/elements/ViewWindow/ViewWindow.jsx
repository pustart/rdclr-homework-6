import { useRef, useEffect} from 'react';
import { useStore, useUnit } from 'effector-react';
import styles from './ViewWindow.module.scss';
import { $offset, $viewWidth, slideLengthSet, viewWidthChanged } from '../../modules/Carousel/model';
import Item from './Item/Item';

function ViewWindow({ children, items = null }) {
  const offset = useStore($offset);
  const viewWidth = useStore($viewWidth);
  const [onViewWidthChanged, setSlideLength] = useUnit([viewWidthChanged, slideLengthSet]);
  const viewWindowRef = useRef();

  useEffect(() => {
    setSlideLength(children.length);
  }, [children, setSlideLength]);

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
          <Item key={index} item={items[index]}>{item}</Item>
        ))}
      </div>
    </div>
  );
}

export default ViewWindow;
