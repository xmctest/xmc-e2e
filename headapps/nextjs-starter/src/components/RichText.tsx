// For testing: inline styles for .custom-title
const customTitleStyle = `
.custom-title {
  font-size: 45px;
  background-color: chocolate;
}
`;

import { JSX } from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: RichTextProps): JSX.Element => {
  // Inject style tag for testing
  const styleTag = <style>{customTitleStyle}</style>;
  const text = props.fields ? (
    <JssRichText tag="p" field={props.fields.Text} className="custom-title" />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  const id = props.params.RenderingIdentifier;

  return (
    <>
      {styleTag}
      <div
        className={`component rich-text ${props?.params?.styles.trimEnd()}`}
        id={id ? id : undefined}
      >
        <div className="component-content">{text}</div>
      </div>
    </>
  );
};
