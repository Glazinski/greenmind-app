import { render, screen } from '../../utils/custom-render';
import { GrowBoxDeviceInformation } from '../../../components/grow-box/grow-box-device-information';

describe('GrowBoxDeviceInformation tests', () => {
  test('should', () => {
    render(<GrowBoxDeviceInformation />);

    console.log(screen.debug());
  });
});
