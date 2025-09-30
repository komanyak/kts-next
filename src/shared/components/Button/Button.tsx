import classNames from 'classnames';
import React from 'react';

import Loader from '../Loader';

import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      className={classNames(styles.btn, className, {
        [styles.btnDisabled]: disabled,
      })}
      disabled={loading || disabled}
      onClick={onClick}
      {...props}
    >
      {loading && <Loader size="s" className={styles.btnLoader} />}
      {children}
    </button>
  );
};

export default React.memo(Button);
