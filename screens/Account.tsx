import { View } from 'react-native';
import { useTheme, List } from 'react-native-paper';

import { useSignOut } from 'services/auth/mutations';

export const Account = (): JSX.Element => {
  const { mutate } = useSignOut();
  const {
    colors: { background },
  } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
        alignItems: 'center',
      }}
    >
      <List.Section style={{ width: '100%' }}>
        <List.Subheader>Account actions</List.Subheader>
        <List.Item
          style={{ paddingHorizontal: 20 }}
          title="Sign out"
          left={() => <List.Icon icon="logout" />}
          onPress={() => mutate()}
        />
      </List.Section>
    </View>
  );
};
