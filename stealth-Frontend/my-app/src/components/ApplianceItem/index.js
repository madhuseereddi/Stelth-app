// src/components/ApplianceItem.js

import React from 'react';
import './index.css';

const ApplianceItem = ({ eachItem }) => {
  // Use optional chaining and default values to handle cases where eachItem might be undefined
  const name = eachItem?.name || 'Unknown';
  const description = eachItem?.description || 'No description available';

  return (
    <li className="list-item">
      <p>{name}</p>
      <p>{description}</p>
    </li>
  );
};

export default ApplianceItem;
