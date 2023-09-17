import styles from './Item.module.scss';
import { useStore } from 'effector-react';
import { $viewWidth } from '../../../modules/Carousel/model';

function Item({children}) {
  const width = useStore($viewWidth);

  return (
    <div
      className={styles['item__container']}
      style={{
        maxWidth: `${width}px`,
        minWidth: `${width}px`,
      }}
    >
      {children}
    </div>
  );
}

export default Item;
