import * as React from 'react';

import styles from './Text.module.scss';

export enum TextView {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  BUTTON = 'button',
  P20 = 'p-20',
  P18 = 'p-18',
  P16 = 'p-16',
  P14 = 'p-14',
}

export enum TextWeight {
  NORMAL = 'normal',
  MEDIUM = 'medium',
  BOLD = 'bold',
}

export enum TextColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ACCENT = 'accent',
}

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
    [TextView.TITLE]: styles.textTitle,
    [TextView.SUBTITLE]: styles.textSubtitle,
    [TextView.BUTTON]: styles.textButton,
    [TextView.P20]: styles.textP20,
    [TextView.P18]: styles.textP18,
    [TextView.P16]: styles.textP16,
    [TextView.P14]: styles.textP14,
  };

  return viewClassMap[view] || '';
};

const getWeightClass = (weight?: TextWeight): string => {
  if (!weight) return '';

  const weightClassMap: Record<TextWeight, string> = {
    [TextWeight.NORMAL]: styles.textWeightNormal,
    [TextWeight.MEDIUM]: styles.textWeightMedium,
    [TextWeight.BOLD]: styles.textWeightBold,
  };

  return weightClassMap[weight] || '';
};

const getColorClass = (color?: TextColor): string => {
  if (!color) return '';

  const colorClassMap: Record<TextColor, string> = {
    [TextColor.PRIMARY]: styles.textColorPrimary,
    [TextColor.SECONDARY]: styles.textColorSecondary,
    [TextColor.ACCENT]: styles.textColorAccent,
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
