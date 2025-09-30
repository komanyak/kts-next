import classNames from 'classnames';
import React from 'react';

import Text from '../Text';

import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={classNames(styles.card, className)} onClick={onClick}>
      {/* Изображение */}
      <div className={styles.cardImage}>
        <img src={image} alt="card" />
      </div>

      {/* Контент карточки */}
      <div className={styles.cardBody}>
        {captionSlot && (
          <Text view="p-14" color="secondary" weight="medium" className={styles.captionSlot}>
            {captionSlot}
          </Text>
        )}
        <Text view="p-20" color="primary" weight="medium" maxLines={2} className={styles.cardTitle}>
          {title}
        </Text>
        <Text
          view="p-16"
          color="secondary"
          weight="normal"
          maxLines={3}
          className={styles.cardSubtitle}
        >
          {subtitle}
        </Text>
      </div>
      {/* Футер карточки */}
      {(contentSlot || actionSlot) && (
        <div className={styles.cardFooter}>
          {contentSlot && (
            <Text view="p-18" weight="bold" color="primary" className={styles.cardContentSlot}>
              {contentSlot}
            </Text>
          )}
          {actionSlot && <div className={styles.cardAction}>{actionSlot}</div>}
        </div>
      )}
    </div>
  );
};

export default React.memo(Card);
