import nock from 'nock';

import { render, screen, queryClient } from '../../utils/custom-render';
import { GrowBoxDeviceInformation } from '../../../components/grow-box/grow-box-device-information';
import { useActiveDeviceStore } from '../../../store/use-active-device-store';

describe('GrowBoxDeviceInformation tests', () => {
  const get = nock('http://localhost:3000').get('/devices/0');

  beforeAll(() => {
    useActiveDeviceStore.setState({
      deviceId: 0,
    });
  });

  afterEach(() => {
    nock.cleanAll();
    queryClient.clear();
  });

  it('should fetch assigned device successfully if id from response matches id from store', async () => {
    get.reply(200, {
      id: 0,
      user: 0,
      name: 'my device',
      image_url: 'image-url',
    });
    render(<GrowBoxDeviceInformation />);

    expect(screen.getByTestId('loading-spinner')).toBeOnTheScreen();
    const myDeviceView = await screen.findByText('my device');
    expect(myDeviceView).toBeOnTheScreen();
  });

  it('should render error message if error was returned', async () => {
    get.reply(404);
    render(<GrowBoxDeviceInformation />);

    expect(screen.getByTestId('loading-spinner')).toBeOnTheScreen();
    const errorView = await screen.findByText(
      'something_went_wrong with fetching device data'
    );
    expect(errorView).toBeOnTheScreen();
  });

  it(`should render "no device data" message if device wasn't found`, async () => {
    get.reply(200, undefined);
    render(<GrowBoxDeviceInformation />);

    expect(screen.getByTestId('loading-spinner')).toBeOnTheScreen();
    const messageView = await screen.findByText('no_device_data');
    expect(messageView).toBeOnTheScreen();
  });
});
