import { useState, useEffect, Children, cloneElement } from 'react';
import { useStore } from 'effector-react';
import styles from './ViewWindow.module.scss';
import { $offset } from '../../modules/Carousel/model';

const VIEW_WIDTH = 450;

function ViewWindow({ children }) {
  const [content, setContent] = useState([]);
  const offset = useStore($offset);

  useEffect(() => {
    setContent(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            height: '100%',
            maxWidth: `${VIEW_WIDTH}px`,
            minWidth: `${VIEW_WIDTH}px`,
          },
        });
      })
    );
  }, []);

  return (
    <div className={styles['view-window']}>
      <div
        className={styles['view-window__items-container']}
        style={{
          transform: `translateX(${offset}px)`,
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default ViewWindow;
