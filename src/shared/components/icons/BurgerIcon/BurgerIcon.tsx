import * as React from 'react';

export type BurgerIconProps = {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  isOpen?: boolean;
};

const BurgerIcon: React.FC<BurgerIconProps> = ({
  width = 24,
  height = 24,
  color = 'currentColor',
  className,
  isOpen = false,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transition: 'transform 0.3s ease',
        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
      }}
    >
      {isOpen ? (
        <>
          <path
            d="M18 6L6 18"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M3 12H21"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6H21"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 18H21"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

export default BurgerIcon;

