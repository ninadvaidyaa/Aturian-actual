import type { Theme } from '@mui/material/styles';

import { merge } from 'lodash-es';

import Alert from './Alert';
import AlertTitle from './AlertTitle';
import Typography from './Typography';

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Alert(theme),
    AlertTitle(),
    Typography()
  );
}
