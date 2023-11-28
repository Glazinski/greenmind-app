import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { PolymorphicComponentProp } from 'lib/ts/polymorphic-component-props';

interface LayoutProps extends React.PropsWithChildren {
  style?: object;
}

export const Layout = <C extends React.ElementType>({
  style,
  children,
  as,
  ...rest
}: PolymorphicComponentProp<C, LayoutProps>) => {
  const {
    colors: { background },
  } = useTheme();

  const Component = as || View;

  return (
    <Component
      style={[styles.container, { backgroundColor: background }, style]}
      {...rest}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
