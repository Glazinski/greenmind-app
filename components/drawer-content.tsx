import { View, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Drawer as PaperDrawer,
  useTheme,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { useSignOut } from 'services/auth/mutations';

export const DrawerContent = ({
  navigation,
  state,
}: DrawerContentComponentProps) => {
  const { t } = useTranslation();
  const {
    colors: { background },
  } = useTheme();
  const currentRouteName = state.routes[state.index].name;
  const insets = useSafeAreaInsets();
  const { mutate: signOut, isLoading, isError } = useSignOut();

  const renderDrawerItem = (name: string, screen: string, icon: string) => (
    <PaperDrawer.Item
      label={name}
      onPress={() => navigation.navigate(screen)}
      active={currentRouteName.includes(screen)}
      icon={icon}
    />
  );

  const renderSignOutItem = () => {
    if (isLoading) {
      return <ActivityIndicator />;
    }

    let label = t('sign_out');
    if (isError) {
      label = t('try_again');
    }

    return (
      <PaperDrawer.Item
        label={label}
        active={false}
        onPress={() => signOut()}
        icon="logout"
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 20, backgroundColor: background },
      ]}
    >
      <PaperDrawer.Section>
        {renderDrawerItem(t('home'), 'Home', 'home')}
        {renderDrawerItem(t('devices'), 'Devices', 'devices')}
        {renderDrawerItem(t('plants'), 'Plants', 'leaf')}
        {renderDrawerItem(t('settings'), 'Settings', 'cog')}
      </PaperDrawer.Section>
      <View>{renderSignOutItem()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
});
