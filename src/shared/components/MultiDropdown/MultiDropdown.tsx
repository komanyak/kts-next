'use client';

import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';

import Input from '../Input';
import ArrowDownIcon from '@icons/ArrowDownIcon';

import styles from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  ...props
}) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    const isSelected = value.some((item) => item.key === option.key);
    const newValue = isSelected
      ? value.filter((item) => item.key !== option.key)
      : [...value, option];
    onChange(newValue);
  };

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearch('');
      }
    }
  };

  return (
    <div ref={dropdownRef} className={classNames(styles.multiDropdown, className)}>
      <Input
        value={isOpen ? search : value.length > 0 ? getTitle(value) : ''}
        onChange={setSearch}
        placeholder={value.length === 0 ? getTitle(value) : ''}
        onFocus={() => {
          if (!disabled) {
            setIsOpen(true);
            setSearch('');
          }
        }}
        disabled={disabled}
        afterSlot={
          <div 
            className={classNames(styles.arrowIcon, { [styles.arrowIconOpen]: isOpen })} 
            onClick={handleToggleDropdown}
            onMouseDown={(e) => e.preventDefault()}
          >
            <ArrowDownIcon width={24} height={24} />
          </div>
        }
        {...props}
      />
      {isOpen && !disabled && (
        <div className={styles.dropdownOptions}>
          {filteredOptions.map((option) => (
            <div
              key={option.key}
              className={classNames(styles.dropdownOption, {
                [styles.selected]: value.some((v) => v.key === option.key),
              })}
              onClick={() => handleSelect(option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
