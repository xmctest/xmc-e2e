import React, { JSX } from 'react';
import { RichText as ContentSdkRichText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Text: { value: string };
}

type RichTextProps = ComponentProps & { fields: Fields };

export const Default = ({ params, fields }: RichTextProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div className={`component rich-text ${styles}`} id={RenderingIdentifier || undefined}>
      <div className="component-content">
        {fields ? <ContentSdkRichText field={fields.Text} /> : <span className="is-empty-hint">Rich text</span>}
      </div>
    </div>
  );
};
