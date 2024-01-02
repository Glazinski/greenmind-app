import * as React from 'react';

import { GrowBoxAssignedPlant } from './grow-box-assigned-plant';
import { GrowBoxDataTable } from './grow-box-data-table';
import { GrowBoxWaterPlant } from './grow-box-water-plant';
import { GrowBoxDeviceInformation } from './grow-box-device-information';

export const GrowBox = (): React.JSX.Element => (
  <>
    <GrowBoxDeviceInformation />
    <GrowBoxAssignedPlant />
    <GrowBoxDataTable />
    <GrowBoxWaterPlant />
  </>
);
