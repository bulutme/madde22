import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './Card.module.css';
import Place from './place.png';
import Button from '../Button';

type Type = string | 'Sinema' | 'Stand-up' | 'Tiyatro' | 'Konser';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']> & {
  className?: string;
  expand?: boolean;
  activity: string;
  place: string;
  summary: string;
  date: string;
  type: Type;
  image: string;
};

type SpanElementProps = React.PropsWithoutRef<JSX.IntrinsicElements['span']>;

export type CommonProps = Props & SpanElementProps;

const typeStyles: Record<Type, string> = {
  Sinema: styles.typeRed,
  'Stand-up': styles.typeYellow,
  Tiyatro: styles.typePurple,
  Konser: styles.typeGreen,
};

export default function Card({
  className,
  expand = false,
  activity,
  image,
  place,
  summary,
  type,
  date,
  ...props
}: CommonProps) {
  const commonProps = {
    ...props,
    className: classNames(styles.type, typeStyles[type]),
  };

  const [isAddedToCalendar, setIsAddedToCalendar] = useState(false);
  const [seeMore, setSeeMore] = useState(true);

  return (
    <div
      {...props}
      className={classNames(styles.card, !seeMore && styles.hidden, className)}
    >
      <div className={styles.background}>
        <span className={styles.date}>{date}</span>
        <span {...(commonProps as SpanElementProps)}>{type.toUpperCase()}</span>
        <img className={styles.image} src={image} alt="image" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{activity}</h3>
        <span className={styles.place}>
          <img className={styles.placeIcon} src={Place.src} alt="Place" />
          {place}
        </span>
        <p className={classNames(styles.summary, seeMore && styles.hidden)}>
          {seeMore ? `${summary.substring(0, 20)}...` : summary}{' '}
          <button
            className={styles.seeMore}
            onClick={() => setSeeMore(!seeMore)}
          >
            {seeMore ? 'Detaylı Bilgi' : 'Daha Az Gör'}
          </button>
        </p>
      </div>
      <div className={styles.buttons}>
        <Button className={styles.buyTicket}>Bilet Al</Button>
        <Button
          className={styles.addCalendar}
          icon={isAddedToCalendar ? 'added' : 'add'}
          onClick={() => setIsAddedToCalendar(!isAddedToCalendar)}
        >
          {isAddedToCalendar ? 'Takvime Eklendi' : 'Takvime Ekle'}
        </Button>
      </div>
    </div>
  );
}
