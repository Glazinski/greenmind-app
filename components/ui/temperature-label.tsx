import { LabelWithUnit } from './label-with-unit';
import type { LabelProps } from './label-with-unit';

export function TemperatureLabel({ children, ...rest }: LabelProps) {
  return (
    <LabelWithUnit unit="°C" {...rest}>
      {children}
    </LabelWithUnit>
  );
}
