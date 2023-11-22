import { RootNavigator } from 'navigation/root-navigator';
import { useCheckUserDevices } from 'services/device/use-check-user-devices';

export const AuthenticatedApp = () => {
  useCheckUserDevices();

  return <RootNavigator />;
};
