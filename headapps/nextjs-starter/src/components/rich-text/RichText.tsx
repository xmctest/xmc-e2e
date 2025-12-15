import React, { JSX } from 'react';
import { Field, RichText as ContentSdkRichText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = ComponentProps & {
  fields: Fields;
};

/**
 * Default variant
 */
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

/**
 * Compact variant
 */
export const Compact = ({ params, fields }: RichTextProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div
      className={`component rich-text rich-text--compact ${styles}`}
      id={RenderingIdentifier || undefined}
    >
      <div className="component-content compact-content">
        {fields ? <ContentSdkRichText field={fields.Text} /> : <span className="is-empty-hint">Rich text</span>}
      </div>
    </div>
  );
};

/**
 * Highlighted variant
 */
export const Highlighted = ({ params, fields }: RichTextProps): JSX.Element => {
  const { RenderingIdentifier, styles, Theme = 'light', Alignment = 'left' } = params;

  return (
    <div
      className={`component rich-text rich-text--highlighted rich-text--${Theme} rich-text--${Alignment} ${styles}`}
      id={RenderingIdentifier || undefined}
    >
      <div className="component-content">
        <div className="rich-text-highlight-box">
          {fields ? <ContentSdkRichText field={fields.Text} /> : <span className="is-empty-hint">Rich text</span>}
        </div>
      </div>
    </div>
  );
};
