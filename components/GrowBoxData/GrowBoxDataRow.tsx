import * as React from 'react';
import { View } from 'react-native';

export const GrowBoxDataRow = ({ children }: React.PropsWithChildren) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 10,
      }}
    >
      {children}
    </View>
  );
};
