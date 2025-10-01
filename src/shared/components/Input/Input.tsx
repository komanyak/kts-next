import classNames from 'classnames';
import React from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, afterSlot, ...props }, ref) => {
    return (
      <div className={classNames(styles.inputWrapper, className)}>
        <input
          ref={ref}
          className={styles.inputField}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />

        {afterSlot && <div className={styles.inputIcon}>{afterSlot}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default React.memo(Input);
