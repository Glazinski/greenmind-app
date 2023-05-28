import { RootNavigator } from 'navigation/RootNavigator';
import { useCheckUserDevices } from './services/device/useCheckUserDevices';

export const AuthenticatedApp = () => {
  useCheckUserDevices();

  return <RootNavigator />;
};
