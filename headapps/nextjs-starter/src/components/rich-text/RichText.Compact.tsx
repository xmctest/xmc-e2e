import React, { JSX } from 'react';
import { RichText as ContentSdkRichText } from '@sitecore-content-sdk/nextjs';
import { RichTextProps } from './RichText.types';

export const Compact = ({ params, fields }: RichTextProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div
      className={`component rich-text rich-text--compact ${styles}`}
      id={RenderingIdentifier || undefined}
    >
      <div className="component-content compact-content">
        {fields ? (
          <ContentSdkRichText field={fields.Text} />
        ) : (
          <span className="is-empty-hint">Rich text</span>
        )}
      </div>
    </div>
  );
};
