import clsx from 'clsx';
import styles from './Button.module.scss';

function Button({type = 'button', icon = null, children, className, onClick}) {
  return (
    <button type={type} onClick={onClick} className={clsx(styles.button, className)}>
      {icon}
      {children}
    </button>
  );
}

export default Button;
