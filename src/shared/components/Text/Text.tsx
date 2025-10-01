import * as React from 'react';

import styles from './Text.module.scss';

export type TextView = 'title' | 'subtitle' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
export type TextWeight = 'normal' | 'medium' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'accent';

export type TextProps = {
  className?: string;
  view?: TextView;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: TextWeight;
  children: React.ReactNode;
  color?: TextColor;
  maxLines?: number;
} & React.HTMLAttributes<HTMLElement>;

const getViewClass = (view?: TextView): string => {
  if (!view) return '';

  const viewClassMap: Record<TextView, string> = {
    'title': styles.textTitle,
    'subtitle': styles.textSubtitle,
    'button': styles.textButton,
    'p-20': styles.textP20,
    'p-18': styles.textP18,
    'p-16': styles.textP16,
    'p-14': styles.textP14,
  };

  return viewClassMap[view] || '';
};

const getWeightClass = (weight?: TextWeight): string => {
  if (!weight) return '';

  const weightClassMap: Record<TextWeight, string> = {
    'normal': styles.textWeightNormal,
    'medium': styles.textWeightMedium,
    'bold': styles.textWeightBold,
  };

  return weightClassMap[weight] || '';
};

const getColorClass = (color?: TextColor): string => {
  if (!color) return '';

  const colorClassMap: Record<TextColor, string> = {
    'primary': styles.textColorPrimary,
    'secondary': styles.textColorSecondary,
    'accent': styles.textColorAccent,
  };

  return colorClassMap[color] || '';
};

const Text: React.FC<TextProps> = ({
  className = '',
  view,
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines,
  style,
  ...props
}) => {
  const textClasses = [
    styles.text,
    getViewClass(view),
    getWeightClass(weight),
    getColorClass(color),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const combinedStyle: React.CSSProperties = {
    ...(maxLines
      ? {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical' as const,
          WebkitLineClamp: maxLines,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }
      : {}),
    ...style,
  };

  return (
    <Tag style={combinedStyle} className={textClasses} {...props}>
      {children}
    </Tag>
  );
};

export default React.memo(Text);
