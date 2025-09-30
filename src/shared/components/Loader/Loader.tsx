import classNames from 'classnames';
import React from 'react';

import styles from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const getPath = (size: 's' | 'm' | 'l') => {
  switch (size) {
    case 's':
      return 'M13.3497 17.8462C10.1209 18.5916 6.89917 16.5785 6.15374 13.3497C5.40832 10.1209 7.42148 6.89919 10.6503 6.15377C13.879 5.40835 17.1008 7.42151 17.8462 10.6503L19.7949 10.2004C18.801 5.89534 14.5054 3.21113 10.2004 4.20503C5.89532 5.19893 3.21111 9.49456 4.205 13.7996C5.1989 18.1046 9.49454 20.7888 13.7996 19.795L13.3497 17.8462Z';
    case 'm':
      return 'M26.6993 35.6924C20.2418 37.1833 13.7983 33.157 12.3075 26.6994C10.8166 20.2418 14.843 13.7984 21.3005 12.3075C27.7581 10.8167 34.2015 14.843 35.6924 21.3006L39.5898 20.4008C37.6021 11.7907 29.0108 6.42227 20.4007 8.41006C11.7906 10.3979 6.42222 18.9891 8.41001 27.5992C10.3978 36.2093 18.9891 41.5777 27.5991 39.5899L26.6993 35.6924Z';
    case 'l':
    default:
      return 'M33.3741 44.6155C25.3022 46.4791 17.2479 41.4462 15.3843 33.3742C13.5207 25.3023 18.5536 17.248 26.6256 15.3844C34.6975 13.5209 42.7518 18.5538 44.6154 26.6257L49.4873 25.501C47.0025 14.7384 36.2634 8.02783 25.5008 10.5126C14.7382 12.9973 8.02771 23.7364 10.5124 34.499C12.9972 45.2616 23.7363 51.9721 34.4989 49.4874L33.3741 44.6155Z';
  }
};

const getViewBox = (size: 's' | 'm' | 'l') => {
  switch (size) {
    case 's':
      return '0 0 24 24';
    case 'm':
      return '0 0 48 48';
    case 'l':
    default:
      return '0 0 60 60';
  }
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className = '', ...props }) => {
  return (
    <svg
      className={classNames(
        styles.loader,
        styles[`loader${size.charAt(0).toUpperCase() + size.slice(1)}`],
        className
      )}
      {...props}
      viewBox={getViewBox(size)}
      xmlns="http://www.w3.org/2000/svg"
      fill="#518581"
    >
      <path d={getPath(size)} />
    </svg>
  );
};

export default React.memo(Loader);
