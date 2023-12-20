import * as z from 'zod';

import i18n from 'lib/i18n';

export const RequiredStringSchema = z
  .string()
  .min(1, { message: i18n.t('required_error') as string });
