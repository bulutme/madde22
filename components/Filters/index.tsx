import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Filters.module.css';
import Button from '../Button';
import Filter from './filter.svg';
import Checked from './checked.svg';
import NotChecked from './notChecked.svg';
import { Context } from '@/contexts';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']> & {
  className?: string;
};

const places = [
  'Maximum Uniq Hall',
  'Maximum Uniq Box',
  'Maximum Uniq Lounge',
  'Maximum Uniq Açıkhava',
  'Bahçe Fuaye',
];

export default function Filters({ className, ...props }: Props) {
  const [open, setOpen] = useState(false);
  const { selectedFilter ,setSelectedFilterState } = useContext(Context);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(!open);
  };

    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [wrapperRef]);

  return (
    <div {...props} className={classNames(styles.filters, className)}>
      <img
        className={classNames(
          styles.filterIcon,
          open ? styles.active : styles.hidden
        )}
        src={Filter.src}
        alt="filter"
      />
      <Button
        onClick={handleOpen}
        className={classNames(styles.filterButton, open && styles.active)}
      >
        Filtreler
      </Button>
      <div ref={wrapperRef} className={classNames(styles.dropdown, !open && styles.hidden)}>
        <ul className={styles.menu}>
          <h3 className={styles.title}>Etkinlik Mekanı</h3>
          {places.map((place, index) => (
            <li key={index} className={styles.menuItem}>
              <Button
                onClick={() => {
                  setSelectedFilterState(selectedFilter === place ? '' : place);
                }}
                className={styles.option}
              >
                {selectedFilter === place ? (
                  <img
                    className={styles.icon}
                    src={Checked.src}
                    alt="checked"
                  />
                ) : (
                  <img
                    className={styles.icon}
                    src={NotChecked.src}
                    alt="not checked"
                  />
                )}
                {place}
              </Button>
            </li>
          ))}
          <h3 className={styles.title}>Etkinlik Tarihi</h3>
          <li className={styles.menuItem}>
            <Button className={classNames(styles.option, styles.disabled)}>
              <img
                className={styles.icon}
                src={NotChecked.src}
                alt="not checked"
              />
              Güncel Etkinlikler
            </Button>
          </li>
          <li className={styles.menuItem}>
            <Button className={classNames(styles.option, styles.disabled)}>
              <img
                className={styles.icon}
                src={NotChecked.src}
                alt="not checked"
              />
              Geçmiş Etkinlikler
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
