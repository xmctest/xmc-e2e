"use client";
import React from "react";
import {
  ComponentPropsCollection,
  ComponentPropsContext,
  Page,
  SitecoreProvider,
} from "@sitecore-content-sdk/nextjs";
import scConfig from "sitecore.config";
import components from ".sitecore/component-map.client";

export default function Providers({
  children,
  page,
  componentProps = {},
}: {
  children: React.ReactNode;
  page: Page;
  componentProps?: ComponentPropsCollection;
}) {
  // TEMP DEBUG: ensure Providers is included in build/typecheck
  // eslint-disable-next-line no-console
  console.log("[APP_BOOTSTRAP] Providers loaded");
  return (
    <SitecoreProvider api={scConfig.api} componentMap={components} page={page}>
      <ComponentPropsContext value={componentProps}>
        {children}
      </ComponentPropsContext>
    </SitecoreProvider>
  );
}
