import * as React from 'react';

import type { CustomPublishButtonProps } from '../../../../src/admin/components/elements/types.js';

// In your projects, you can import as follows:
// import { CustomPublishButtonProps } from 'payload/types';

import classes from './index.module.scss';

export const CustomPublishButton: CustomPublishButtonProps = ({ DefaultButton, ...rest }) => {
  return (
    <div className={classes.customButton}>
      <DefaultButton {...rest} />
    </div>
  );
};
