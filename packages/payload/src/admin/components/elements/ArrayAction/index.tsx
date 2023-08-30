import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Props } from './types.js';

import Chevron from '../../icons/Chevron/index.js';
import Copy from '../../icons/Copy/index.js';
import More from '../../icons/More/index.js';
import Plus from '../../icons/Plus/index.js';
import X from '../../icons/X/index.js';
import Popup from '../Popup/index.js';
import './index.scss';

const baseClass = 'array-actions';

export const ArrayAction: React.FC<Props> = ({
  addRow,
  duplicateRow,
  hasMaxRows,
  index,
  moveRow,
  removeRow,
  rowCount,
}) => {
  const { t } = useTranslation('general');
  return (
    <Popup
      render={({ close }) => {
        return (
          <React.Fragment>
            {index !== 0 && (
              <button
                onClick={() => {
                  moveRow(index, index - 1);
                  close();
                }}
                className={`${baseClass}__action ${baseClass}__move-up`}
                type="button"
              >
                <Chevron />
                {t('moveUp')}
              </button>
            )}
            {index < rowCount - 1 && (
              <button
                onClick={() => {
                  moveRow(index, index + 1);
                  close();
                }}
                className={`${baseClass}__action ${baseClass}__move-down`}
                type="button"
              >
                <Chevron />
                {t('moveDown')}
              </button>
            )}
            {!hasMaxRows && (
              <React.Fragment>
                <button
                  onClick={() => {
                    addRow(index + 1);
                    close();
                  }}
                  className={`${baseClass}__action ${baseClass}__add`}
                  type="button"
                >
                  <Plus />
                  {t('addBelow')}
                </button>
                <button
                  onClick={() => {
                    duplicateRow(index);
                    close();
                  }}
                  className={`${baseClass}__action ${baseClass}__duplicate`}
                  type="button"
                >
                  <Copy />
                  {t('duplicate')}
                </button>
              </React.Fragment>
            )}
            <button
              onClick={() => {
                removeRow(index);
                close();
              }}
              className={`${baseClass}__action ${baseClass}__remove`}
              type="button"
            >
              <X />
              {t('remove')}
            </button>
          </React.Fragment>
        );
      }}
      button={<More />}
      buttonClassName={`${baseClass}__button`}
      className={baseClass}
      horizontalAlign="center"
    />
  );
};
