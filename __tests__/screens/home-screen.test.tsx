import { render, screen } from '../utils/custom-render';
import { RootNavigator } from '../../navigation/root-navigator';

describe('HomeScreen', () => {
  it('should', () => {
    render(<RootNavigator />);

    console.log(screen.debug());
  });
});
