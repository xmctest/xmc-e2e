// For testing: inline styles for .custom-title
const customTitleStyle = `
.custom-title {
  font-size: 45px;
  background-color: chocolate;
}
`;

import React, { JSX } from 'react';
import { Field, RichText as JssRichText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = ComponentProps & {
  fields: Fields;
};

export const Default = ({ params, fields }: RichTextProps): JSX.Element => {
  // Inject style tag for testing
  const styleTag = <style>{customTitleStyle}</style>;
  const { RenderingIdentifier, styles } = params;

  return (
    <>
      {styleTag}
      <div className={`component rich-text ${styles}`} id={RenderingIdentifier}>
        <div className="component-content">
          {fields ? (
            <JssRichText tag="p" field={fields.Text} className="custom-title" />
          ) : (
            <span className="is-empty-hint">Rich text</span>
          )}
        </div>
      </div>
    </>
  );
};
