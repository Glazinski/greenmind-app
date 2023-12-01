import nock from 'nock';

import { render, screen } from '../../utils/custom-render';
import { GrowBoxDeviceInformation } from '../../../components/grow-box/grow-box-device-information';
import { useActiveDeviceStore } from '../../../store/use-active-device-store';

describe('GrowBoxDeviceInformation tests', () => {
  const get = nock('http://localhost:3000').get('/devices/0');

  beforeEach(() => {
    nock.cleanAll();
  });

  it('should fetch assigned device successfully if ids match', async () => {
    useActiveDeviceStore.setState({
      deviceId: 0,
    });
    get.reply(200, {
      id: 0,
      user: 0,
      name: 'my device',
      image_url: 'image-url',
    });
    render(<GrowBoxDeviceInformation />);

    expect(screen.getByTestId('loading-spinner')).toBeOnTheScreen();
    await screen.findByText('my device');
  });
});
