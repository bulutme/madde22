import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Button from '../Button';
/* import Container from '../Container'; */
import styles from './Header.module.css';
import Exclude from './Exclude.png';
import Menu from '../Menu';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['header']> & {
  className?: string;
};

export default function Header({ className, ...props }: Props) {
  const router = useRouter();

  return (
    <header {...props} className={classNames(styles.header, className)}>
      <img className={styles.exclude} src={Exclude.src} alt="Exclude" />
      <h1 className={styles.title}>ETKİNLİKLER</h1>
      <Menu />
      <Button size="small" variant="primary">
        Header
      </Button>
    </header>
  );
}
