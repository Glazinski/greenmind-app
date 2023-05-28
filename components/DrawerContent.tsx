import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Drawer as PaperDrawer,
  useTheme,
} from 'react-native-paper';

import { useSignOut } from 'services/auth/mutations';

export const DrawerContent = ({
  navigation,
  state,
}: DrawerContentComponentProps) => {
  const {
    colors: { background },
  } = useTheme();
  const currentRouteName = state.routes[state.index].name;
  const insets = useSafeAreaInsets();
  const { mutate: signOut, isLoading, isError } = useSignOut();

  const renderDrawerItem = (name: string, icon: string) => (
    <PaperDrawer.Item
      label={name}
      onPress={() => navigation.navigate(name)}
      active={currentRouteName.includes(name)}
      icon={icon}
    />
  );

  const renderSignOutItem = () => {
    if (isLoading) {
      return <ActivityIndicator />;
    }

    let label = 'Sign out';
    if (isError) {
      label = 'Try again';
    }

    return (
      <PaperDrawer.Item
        label={label}
        onPress={() => signOut()}
        active={false}
        icon="logout"
      />
    );
  };

  return (
    <>
      <PaperDrawer.Section
        style={{
          flex: 1,
          height: '130%',
          paddingTop: insets.top + 20,
          marginBottom: 0,
          backgroundColor: background,
        }}
      >
        {renderDrawerItem('Home', 'home')}
        {renderDrawerItem('Devices', 'devices')}
        {renderDrawerItem('Plants', 'leaf')}
      </PaperDrawer.Section>
      {renderSignOutItem()}
    </>
  );
};
