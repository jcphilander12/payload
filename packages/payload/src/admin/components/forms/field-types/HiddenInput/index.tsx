import React, { useEffect } from 'react';

import type { Props } from './types.js';

import useField from '../../useField/index.js';
import withCondition from '../../withCondition/index.js';

const HiddenInput: React.FC<Props> = (props) => {
  const {
    disableModifyingForm = true,
    name,
    path: pathFromProps,
    value: valueFromProps,
  } = props;

  const path = pathFromProps || name;

  const { setValue, value } = useField({
    path,
  });

  useEffect(() => {
    if (valueFromProps !== undefined) {
      setValue(valueFromProps, disableModifyingForm);
    }
  }, [valueFromProps, setValue, disableModifyingForm]);

  return (
    <input
      id={`field-${path.replace(/\./g, '__')}`}
      name={path}
      onChange={setValue}
      type="hidden"
      value={value as string || ''}
    />
  );
};

export default withCondition(HiddenInput);
