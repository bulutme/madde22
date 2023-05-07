import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import Calendar from './calendar.png';
import Button from '../Button';
import Filters from '../Filters';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']> & {
  className?: string;
};

const menuItems = [
  { value: '/', name: 'Tüm Etkinlikler' },
  { value: 'theatre', name: 'Tiyatro' },
  { value: 'concert', name: 'Konser' },
  { value: 'standUp', name: 'Stand Up' },
  { value: 'cinema', name: 'Sinema' },
  { value: 'child', name: 'Çocuk' },
];

export default function Menu({ className, ...props }: Props) {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [activeButton, setActiveButton] = useState(0);

  const router = useRouter();
  useEffect(() => {
    if (router.pathname) {
      if (router.pathname === '/') {
        console.log(router.pathname, 'AAAA2');
        setActiveButton(1);
      } else {
        const selectedButton = menuItems.find(
          (item, index) => item.value === router.pathname.substring(1)
        );
        let index = menuItems.findIndex(
          (x) => x.value === selectedButton?.value
        );
        setActiveButton(index + 1);
      }
    }

    console.log(router.pathname, 'AAAA');
  }, [router.pathname]);

  return (
    <div {...props} className={classNames(styles.menu, className)}>
      <div className={styles.menuBar}>
        {menuItems.map((item, index) => (
          <Link href={item.value}>
            <Button
              onClick={() => setActiveButton(index + 1)}
              className={classNames(
                styles.menuItem,
                activeButton === index + 1 && styles.active
              )}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
      <div className={styles.navBar}>
        <div className={styles.filters}>
          <Filters />
        </div>
        <div className={styles.seeAtCalendar}>
          <img className={styles.icon} src={Calendar.src} alt="calendar" />
          <Button className={styles.button}>Takvimde Gör</Button>
        </div>
      </div>
    </div>
  );
}
