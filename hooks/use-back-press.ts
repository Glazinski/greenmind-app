import React from 'react';
import { BackHandler } from 'react-native';

export function useBackPress(backAction: () => boolean) {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [backAction]);
}
