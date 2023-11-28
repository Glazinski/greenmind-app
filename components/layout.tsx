import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

interface LayoutProps extends React.PropsWithChildren {
  as?: React.ElementType;
  style?: object;
}

export const Layout = ({ style, children, as }: LayoutProps) => {
  const {
    colors: { background },
  } = useTheme();

  const Component = as || View;

  return (
    <Component
      style={[styles.container, { backgroundColor: background }, style]}
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
