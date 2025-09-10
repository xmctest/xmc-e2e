// src/components/Image.tsx
import type { JSX } from 'react';
import {
  NextImage as CsdkImage,
  Link as CsdkLink,
  ImageField,
  LinkField,
  Field,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type ImageProps = ComponentProps & {
  fields?: {
    Image?: ImageField;
    ImageCaption?: Field<string>;
    TargetUrl?: LinkField;
  };
};

/**
 * One image component for Content SDK + XM Cloud.
 * - RSC-safe (no hooks)
 * - Optional link wrapper (TargetUrl)
 * - Optional caption (ImageCaption)
 * - SXA-ish container classes (component / component-content)
 * - Graceful empty state in Pages/EE
 */
export const Default = ({ params, fields }: ImageProps): JSX.Element => {
  const id = params?.RenderingIdentifier;
  const styles = params?.styles ?? '';

  const hasImage = Boolean(fields?.Image?.value?.src);

  if (!hasImage) {
    // Empty state so editors can see the placeholder in Pages
    return (
      <div className={`component image ${styles}`.trim()} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Image</span>
        </div>
      </div>
    );
  }

  // Ensure sensible alt text fallback (caption -> existing alt -> empty)
  const imageField: ImageField = {
    ...fields!.Image!,
    value: {
      ...fields!.Image!.value,
      alt:
        fields?.Image?.value?.alt ??
        (fields?.ImageCaption?.value as string | undefined) ??
        '',
    },
  };

  const imgEl = <CsdkImage field={imageField} />;

  const contentEl =
    fields?.TargetUrl?.value?.href ? (
      <CsdkLink field={fields.TargetUrl} editable>
        {imgEl}
      </CsdkLink>
    ) : (
      imgEl
    );

  return (
    <div className={`component image ${styles}`.trim()} id={id}>
      <div className="component-content">
        {contentEl}
        {fields?.ImageCaption && (
          <Text
            tag="span"
            className="image-caption field-imagecaption"
            field={fields.ImageCaption}
          />
        )}
      </div>
    </div>
  );
};

export default Default;
