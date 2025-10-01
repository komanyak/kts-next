import classNames from 'classnames';
import React from 'react';

import styles from './CardSkeleton.module.scss';

export type CardSkeletonProps = {
  className?: string;
};

const CardSkeleton: React.FC<CardSkeletonProps> = ({ className }) => {
  return (
    <div className={classNames(styles.cardSkeleton, className)}>
      <div className={styles.skeletonImage}>
        <div className={styles.skeletonShimmer} />
      </div>

      <div className={styles.skeletonBody}>
        <div className={styles.skeletonCaption}>
          <div className={styles.skeletonShimmer} />
        </div>

        <div className={styles.skeletonTitle}>
          <div className={styles.skeletonShimmer} />
        </div>

        <div className={styles.skeletonDescription}>
          <div className={styles.skeletonShimmer} />
        </div>
        <div className={styles.skeletonDescription}>
          <div className={styles.skeletonShimmer} />
        </div>
        <div className={styles.skeletonDescription}>
          <div className={styles.skeletonShimmer} />
        </div>
      </div>

      <div className={styles.skeletonFooter}>
        <div className={styles.skeletonButton}>
          <div className={styles.skeletonShimmer} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CardSkeleton);
