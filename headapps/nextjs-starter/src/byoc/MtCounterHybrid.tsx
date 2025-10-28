import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

type Props = FEAAS.ExternalComponentProps & {
  /** Optional initial value from Pages (Number field) */
  initial?: number;
};

/**
 * HYBRID BYOC COMPONENT
 * - Server-side rendered for fast load
 * - Hydrates client-side with minimal JS for interactivity
 * - Displays a counter and identifies itself as a hybrid component
 */
function MtCounterHybrid({ initial }: Props) {
  const start = Number.isFinite(initial) ? Number(initial) : 0;

  // Generate a unique id to bind client-side script
  const elementId = React.useMemo(
    () => `mt-counter-${Math.random().toString(36).slice(2)}`,
    []
  );

  // Inline client-side hydration script
  const script = `
    (function(){
      var root = document.getElementById(${JSON.stringify(elementId)});
      if(!root) return;
      var valueEl = root.querySelector('[data-role="value"]');
      var btn = root.querySelector('[data-role="btn"]');
      if(!valueEl || !btn) return;
      var n = parseInt(valueEl.textContent || "0", 10);
      btn.addEventListener('click', function(){
        n += 1;
        valueEl.textContent = String(n);
      });
    })();
  `;

  return (
    <div
      id={elementId}
      style={{
        padding: '1.5rem',
        borderRadius: 10,
        border: '1px solid #d1d5db',
        background: '#f9fafb',
        margin: '1rem 0',
      }}
    >
      <h3 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>
        ⚙️ MtCounterHybrid (HYBRID BYOC)
      </h3>
      <p style={{ marginTop: 0, color: '#374151' }}>
        This is a <strong>hybrid</strong> BYOC component — rendered on the server
        and hydrated on the client for interactivity.
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '.75rem',
          marginTop: '0.75rem',
        }}
      >
        <strong>Count:</strong>
        <span data-role="value">{start}</span>
        <button
          type="button"
          data-role="btn"
          style={{
            padding: '.5rem .75rem',
            border: '1px solid #1f2937',
            background: 'white',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          +1
        </button>
      </div>

      {/* Hydration script */}
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </div>
  );
}

// Register with FEaaS as a hybrid component
export default FEAAS.registerComponent(MtCounterHybrid, {
  name: 'MtCounterHybrid',
  displayName: 'MtCounterHybrid',
  icon: '🔢',
  description:
    'SSR hybrid BYOC component with a counter and message identifying it as a hybrid component.',
});
