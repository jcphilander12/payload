import React, { useCallback, useEffect, useState } from 'react';

import type { Props } from './types.js';

import { json } from '../../../../../fields/validations.js';
import { CodeEditor } from '../../../elements/CodeEditor/index.js';
import Error from '../../Error/index.js';
import FieldDescription from '../../FieldDescription/index.js';
import Label from '../../Label/index.js';
import useField from '../../useField/index.js';
import withCondition from '../../withCondition/index.js';
import './index.scss';

const baseClass = 'json-field';

const JSONField: React.FC<Props> = (props) => {
  const {
    admin: {
      className,
      condition,
      description,
      editorOptions,
      readOnly,
      style,
      width,
    } = {},
    label,
    name,
    path: pathFromProps,
    required,
    validate = json,
  } = props;

  const path = pathFromProps || name;
  const [stringValue, setStringValue] = useState<string>();
  const [jsonError, setJsonError] = useState<string>();

  const memoizedValidate = useCallback((value, options) => {
    return validate(value, { ...options, jsonError, required });
  }, [validate, required, jsonError]);

  const {
    errorMessage,
    initialValue,
    setValue,
    showError,
    value,
  } = useField<string>({
    condition,
    path,
    validate: memoizedValidate,
  });

  const handleChange = useCallback((val) => {
    if (readOnly) return;
    setStringValue(val);

    try {
      setValue(JSON.parse(val.trim() || '{}'));
      setJsonError(undefined);
    } catch (e) {
      setJsonError(e);
    }
  }, [readOnly, setValue, setStringValue]);

  useEffect(() => {
    setStringValue(JSON.stringify(initialValue, null, 2));
  }, [initialValue]);

  const classes = [
    baseClass,
    'field-type',
    className,
    showError && 'error',
    readOnly && 'read-only',
  ].filter(Boolean).join(' ');

  return (
    <div
      style={{
        ...style,
        width,
      }}
      className={classes}
    >
      <Error
        message={errorMessage}
        showError={showError}
      />
      <Label
        htmlFor={`field-${path}`}
        label={label}
        required={required}
      />
      <CodeEditor
        defaultLanguage="json"
        onChange={handleChange}
        options={editorOptions}
        readOnly={readOnly}
        value={stringValue}
      />
      <FieldDescription
        description={description}
        value={value}
      />
    </div>
  );
};

export default withCondition(JSONField);
