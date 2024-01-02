import { LabelWithUnit } from './label-with-unit';
import type { LabelProps } from './label-with-unit';

export function PercentageLabel({ children, ...rest }: LabelProps) {
  return (
    <LabelWithUnit unit="%" {...rest}>
      {children}
    </LabelWithUnit>
  );
}
