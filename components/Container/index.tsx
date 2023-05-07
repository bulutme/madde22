import Card from '@/components/Card';
import activities from '../../data/activities.json';
import { useContext, useEffect, useState } from 'react';
import { Context } from '@/contexts';
import styles from './Container.module.css';
import { useRouter } from 'next/router';

interface Object {
  value: string;
  name: string;
}

interface Item {
  place: string;
  activity: string;
  image: string;
  summary: string;
  date: string;
  type: Object;
}

export default function Container() {
  const { selectedFilter } = useContext(Context);
  const [filteredActivities, setFilteredActivities] = useState<Item[]>([]);

  const router = useRouter();

  useEffect(() => {
    const filtered = activities
      .filter((item: Item) =>
        selectedFilter ? item.place === selectedFilter : activities
      )
      .filter((item) => router.pathname === "/" ? item : item.type.value === router.pathname.substring(1));
    console.log(filtered, 'AAAA');
    setFilteredActivities(filtered);
  }, [selectedFilter, router.pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((item: Item) => (
            <Card
              activity={item.activity}
              image={item.image}
              place={item.place}
              summary={item.summary}
              type={item.type.name}
              date={item.date}
            />
          ))
        ) : (
          <h1 className={styles.notFound}>ETKİNLİK BULUNAMADI</h1>
        )}
      </div>
    </div>
  );
}
