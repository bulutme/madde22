import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';
import Add from './add.png';
import Added from './added.png';

type Icon = 'add' | 'added';
type Variant = 'green' | 'primary' | 'secondary' | 'invalid';

type CommonProps = {
  children?: React.ReactNode;
  fullWidth?: boolean;
  icon?: Icon;
  withIcon?: boolean;
  outline?: boolean;
  size?: FormComponentSize;
  variant?: Variant;
  apiCallFinished?: boolean;
};

type ButtonElementProps = React.PropsWithoutRef<
  JSX.IntrinsicElements['button']
>;
type DivElementProps = React.PropsWithoutRef<JSX.IntrinsicElements['div']>;
type AnchorElementProps = React.PropsWithoutRef<JSX.IntrinsicElements['a']>;

export type Props = CommonProps &
  (ButtonElementProps | AnchorElementProps | DivElementProps);

const icons: Record<Icon, React.ReactNode> = {
  add: <img className={styles.icon} src={Add.src} alt="Add" />,
  added: <img className={styles.icon} src={Added.src} alt="Added" />,
};

const sizeStyles: Record<FormComponentSize, string> = {
  xlarge: styles.sizeXlarge,
  large: styles.sizeLarge,
  medium: styles.sizeMedium,
  small: styles.sizeSmall,
};

const variantStyles: Record<Variant, string> = {
  green: styles.variantGreen,
  primary: styles.variantPrimary,
  secondary: styles.variantSecondary,
  invalid: styles.variantInvalid,
};

function Button(
  {
    children,
    className,
    icon,
    fullWidth = false,
    outline = false,
    size = 'medium',
    variant = 'primary',
    withIcon = false,
    ...props
  }: Props,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>,
) {
  const commonProps = {
    ...props,
    className: classNames(
      styles.button,
      fullWidth && styles.fullWidth,
      sizeStyles[size],
      variantStyles[variant],
      outline && styles.outline,
      withIcon && styles.withIcon,
      !children && styles.noChildren,
      className,
    ),
    ref,
  };

  const newChildren = (
    <>
      {icon !== undefined && icons[icon]}

      {children}
    </>
  );

  if ('href' in props) {
    return (
      <a {...(commonProps as AnchorElementProps)} href={props.href}>
        {newChildren}
      </a>
    );
  }

  return (
    <button
      {...(commonProps as ButtonElementProps)}
      type={(props as ButtonElementProps).type}
    >
      {newChildren}
    </button>
  );
}

export default React.forwardRef(Button);
