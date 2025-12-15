import React, { JSX } from 'react';
import { RichText as ContentSdkRichText } from '@sitecore-content-sdk/nextjs';
import { RichTextProps } from './RichText.types';

export const WithText = ({ params, fields }: RichTextProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div className={`component rich-text ${styles}`} id={RenderingIdentifier || undefined}>
      <div className="component-content">
        <strong>WithText variantoss:</strong>
        {fields ? <ContentSdkRichText field={fields.Text} /> : <span className="is-empty-hint">Rich text</span>}
      </div>
    </div>
  );
};
