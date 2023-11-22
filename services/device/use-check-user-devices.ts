import React from 'react';

import { useActiveDeviceStore } from 'store/use-active-device-store';

import { useDevices } from './queries';

export const useCheckUserDevices = () => {
  const { deviceId, setDeviceId } = useActiveDeviceStore();
  const { data: devices, isLoading, isError } = useDevices();

  React.useEffect(() => {
    if (isLoading) return;

    if (isError) {
      setDeviceId(null);
      return;
    }

    if (!(devices?.length >= 0)) {
      setDeviceId(null);
      return;
    }

    if (!devices.find(({ id }) => id === deviceId)) {
      setDeviceId(null);
    }
  }, [isLoading, isError, devices, deviceId, setDeviceId]);
};
