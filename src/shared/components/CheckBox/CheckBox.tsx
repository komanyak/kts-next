import classNames from 'classnames';
import React from 'react';

import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked,
  disabled,
  className,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  const checkboxClasses = classNames(
    styles.checkbox,
    {
      [styles.checkboxChecked]: checked,
      [styles.checkboxDisabled]: disabled,
    },
    className
  );

  return (
    <label className={checkboxClasses}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxCustom}>
        {checked && (
          <svg
            className={classNames(styles.checkboxIcon, styles.checkmark)}
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 11.6129L9.87755 18L20 7"
              stroke={disabled ? '#00000033' : '#518581'}
              strokeWidth="2"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

export default React.memo(CheckBox);
