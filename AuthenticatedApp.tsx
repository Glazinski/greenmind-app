import { View, Text, Button } from 'react-native';

import { useSignOut } from 'services/auth/mutations';

export const AuthenticatedApp = () => {
  const { mutate } = useSignOut();

  return (
    <View style={{ marginTop: 100 }}>
      <Button title="Sign out" onPress={() => mutate()} />
    </View>
  );
};
