'use client';

import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

/**
 * A simple example BYOC component for testing registration.
 * It just displays a colored box with a message and the current date.
 */
const MtByoc = (props: FEAAS.ExternalComponentProps) => {
  return (
    <div
      style={{
        padding: '1.5rem',
        margin: '1rem 0',
        backgroundColor: '#f0f9ff',
        border: '1px solid #93c5fd',
        borderRadius: '8px',
        color: '#1e3a8a',
        textAlign: 'center',
      }}
    >
      <h3>👋 Hello from BYOC!</h3>
      <p>This component was registered through the BYOC runtime.</p>
      <small>{new Date().toLocaleString()}</small>
    </div>
  );
};

export default FEAAS.registerComponent(MtByoc, {
  name: 'MtByoc',
  displayName: 'MtByoc',
  icon: '⭐',
  description: 'A simple BYOC test component that renders a message and timestamp.',
});
