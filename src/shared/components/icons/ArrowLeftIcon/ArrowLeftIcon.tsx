import * as React from 'react';

import type { IconProps } from '../Icon';
import Icon from '../Icon';

const ArrowLeftIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        d="M15.09 19.92L8.57 13.4C7.8 12.63 7.8 11.37 8.57 10.6L15.09 4.07999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Icon>
  );
};

export default ArrowLeftIcon;
