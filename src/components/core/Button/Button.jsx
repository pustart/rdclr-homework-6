import clsx from 'clsx';
import styles from './Button.module.scss';

function Button({type = 'button', icon = null, children, className, onClick, view}) {
  return (
    <button type={type} onClick={onClick} className={clsx(styles.button, className, {
      [styles['button__default']]: view === 'default',
    })}>
      {icon}
      {children}
    </button>
  );
}

export default Button;
