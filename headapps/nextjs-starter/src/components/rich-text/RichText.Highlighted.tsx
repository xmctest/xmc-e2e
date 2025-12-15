import React, { JSX } from 'react';
import { RichText as ContentSdkRichText } from '@sitecore-content-sdk/nextjs';
import { RichTextProps } from './RichText.types';

export const Highlighted = ({ params, fields }: RichTextProps): JSX.Element => {
  const { RenderingIdentifier, styles, Theme = 'light' } = params;

  return (
    <div
      className={`component rich-text rich-text--highlighted rich-text--${Theme} ${styles}`}
      id={RenderingIdentifier || undefined}
    >
      <div className="component-content">
        <div className="rich-text-highlight-box">
          {fields ? (
            <ContentSdkRichText field={fields.Text} />
          ) : (
            <span className="is-empty-hint">Rich text</span>
          )}
        </div>
      </div>
    </div>
  );
};
