import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import Text from '../Text';

import styles from './Card.module.scss';


export interface CardProps {
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
  /** Показать бейдж "В корзине" */
  inCart?: boolean;
  /** Количество товара (если указано, показывается вместо "In Cart") */
  quantity?: number;
}

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  inCart = false,
  quantity,
}) => {
  return (
    <div className={classNames(styles.card, className)} onClick={onClick}>
      {/* Изображение */}
      <div className={styles.cardImage}>
        <Image 
          src={image} 
          alt="card"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
          style={{ objectFit: 'cover' }}
        />
        {(inCart || quantity) && (
          <div className={styles.inCartBadge}>
            <Text view="p-14" weight="medium">
              {quantity ? `×${quantity}` : 'In Cart'}
            </Text>
          </div>
        )}
      </div>

      {/* Контент карточки */}
      <div className={styles.cardBody}>
        {captionSlot && (
          <Text view="p-14" color="secondary" weight="medium" className={styles.captionSlot}>
            {captionSlot}
          </Text>
        )}
        <Text view="p-20" color="primary" weight="medium" maxLines={1} className={styles.cardTitle}>
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
