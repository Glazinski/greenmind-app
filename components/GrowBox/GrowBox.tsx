import * as React from 'react';

import { GrowBoxAssignedPlant } from './GrowBoxAssignedPlant';
import { GrowBoxDataTable } from './GrowBoxDataTable';
import { GrowBoxWaterPlant } from './GrowBoxWaterPlant';

import { GrowBoxDeviceInformation } from './GrowBoxDeviceInformation';

export const GrowBox = (): React.JSX.Element => (
  <>
    <GrowBoxDeviceInformation />
    <GrowBoxAssignedPlant />
    <GrowBoxDataTable />
    <GrowBoxWaterPlant />
  </>
);
