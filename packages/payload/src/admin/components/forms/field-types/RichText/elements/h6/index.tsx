import React from 'react';

import H6Icon from '../../../../../icons/headings/H6/index.js';
import ElementButton from '../Button.js';

const H6 = ({ attributes, children }) => (
  <h6 {...attributes}>{children}</h6>
);

const h6 = {
  Button: () => (
    <ElementButton format="h6">
      <H6Icon />
    </ElementButton>
  ),
  Element: H6,
};

export default h6;
