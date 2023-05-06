import * as React from 'react';
import { Animated, Easing } from 'react-native';

export const useSpinAnimation = (trigger: boolean) => {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (trigger) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [trigger]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return spin;
};
