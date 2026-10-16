// SVG icons used across the site. Logos and glyphs use currentColor, so one icon
// works on light and dark backgrounds. Rendered by Icon.astro and islands/Icon.tsx.

type IconDef = {
  viewBox: string;
  width: number;
  height: number;
  /** "fill" icons are solid shapes; "stroke" icons are drawn with lines */
  kind: "fill" | "stroke" | "raw";
  strokeWidth?: number;
  /** For raw icons: full inner SVG markup */
  body: string;
};

export const icons = {
  phone: {
    viewBox: "0 0 24 24", width: 16, height: 16, kind: "fill",
    body: '<path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />',
  },
  play: {
    viewBox: "0 0 24 24", width: 24, height: 24, kind: "fill",
    body: '<path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />',
  },
  "chevron-left": { viewBox: "0 0 24 24", width: 24, height: 24, kind: "stroke", strokeWidth: 2.5, body: '<path d="m15 18-6-6 6-6" />' },
  "chevron-right": { viewBox: "0 0 24 24", width: 24, height: 24, kind: "stroke", strokeWidth: 2.5, body: '<path d="m9 18 6-6-6-6" />' },
  "arrow-up-right": { viewBox: "0 0 24 24", width: 20, height: 20, kind: "stroke", strokeWidth: 2, body: '<path d="M7 17 17 7M8 7h9v9" />' },
  quote: {
    viewBox: "0 0 65 42", width: 65, height: 42, kind: "fill",
    body: '<path d="M57.0344 15.8195C59.441 16.6184 61.3662 18.0565 62.8101 20.1339C64.254 22.0514 64.9759 24.2086 64.9759 26.6054C65.1364 29.0023 64.4946 31.3992 63.0507 33.7961C61.7672 36.0332 59.6816 37.9507 56.7938 39.5486C52.1412 41.9455 48.0501 42.5847 44.5205 41.4661C40.991 40.1878 38.5043 38.2703 37.0603 35.7136C36.2582 34.4353 35.6164 32.6776 35.1351 30.4405C34.8143 28.2034 34.6538 25.8864 34.6538 23.4895C34.8143 20.9328 35.1351 18.456 35.6164 16.0591C36.0977 13.6623 36.8197 11.6649 37.7823 10.0669C38.5845 8.94838 39.5471 7.74993 40.6701 6.4716C41.6327 5.35305 42.7558 4.2345 44.0392 3.11595C45.4832 1.99741 47.0875 0.958755 48.8523 0L57.2751 0.479377C56.152 1.75772 55.1092 2.95616 54.1466 4.07471C53.3444 5.03346 52.6225 5.91232 51.9808 6.71128C51.339 7.51025 50.6973 8.22931 50.0555 8.86848C48.9325 9.98703 48.0501 11.1056 47.4084 12.2241C46.7666 13.1829 46.2051 14.2215 45.7238 15.3401C45.4029 16.4586 45.4029 17.5772 45.7238 18.6957C47.8095 16.4586 50.216 15.3401 52.9434 15.3401C54.2268 15.3401 55.5905 15.4999 57.0344 15.8195ZM23.8245 17.0179C26.0706 18.2962 27.6749 20.054 28.6375 22.291C29.7606 24.3684 30.1617 26.6054 29.8408 29.0023C29.5199 31.3992 28.4771 33.6363 26.7123 35.7136C25.108 37.7909 22.7015 39.3888 19.4928 40.5074C14.5193 42.1053 10.4282 42.0254 7.21955 40.2677C4.01086 38.3502 1.845 36.0332 0.721955 33.3167C0.240652 31.8786 0 30.041 0 27.8039C0 25.5668 0.240652 23.2498 0.721955 20.8529C1.20326 18.456 1.845 16.139 2.64717 13.9019C3.44934 11.6649 4.49216 9.82724 5.77564 8.3891C6.73825 7.27056 7.86129 6.23191 9.14476 5.27315C10.2678 4.47419 11.5513 3.59533 12.9952 2.63658C14.5995 1.67782 16.3643 0.798962 18.2895 0L26.7123 2.1572C25.4289 3.27575 24.2256 4.2345 23.1026 5.03346C22.1399 5.83243 21.2576 6.55149 20.4554 7.19066C19.6532 7.82983 18.851 8.469 18.0489 9.10817C16.9258 10.0669 15.9632 11.0257 15.1611 11.9844C14.3589 12.7834 13.6369 13.7422 12.9952 14.8607C12.3534 15.8195 12.1128 16.8581 12.2732 17.9767C13.5567 17.0179 14.8402 16.4586 16.1237 16.2988C17.5676 15.9792 18.851 15.8994 19.9741 16.0591C21.2576 16.2189 22.541 16.5385 23.8245 17.0179Z" />',
  },
  // Four-point star used on the CTA banner (Figma "Star 5")
  sparkle: {
    viewBox: "0 0 139.844 139.844", width: 140, height: 140, kind: "fill",
    body: '<path d="M64.1285 4.44006C65.7224 -1.48002 74.1218 -1.48002 75.7158 4.44006L87.4795 48.131C88.0355 50.1959 89.6484 51.8088 91.7132 52.3647L135.404 64.1285C141.324 65.7224 141.324 74.1218 135.404 75.7158L91.7132 87.4795C89.6484 88.0355 88.0355 89.6484 87.4795 91.7132L75.7158 135.404C74.1218 141.324 65.7224 141.324 64.1285 135.404L52.3647 91.7132C51.8088 89.6484 50.1959 88.0355 48.131 87.4795L4.44006 75.7158C-1.48002 74.1218 -1.48002 65.7224 4.44006 64.1285L48.131 52.3647C50.1959 51.8088 51.8088 50.1959 52.3647 48.131L64.1285 4.44006Z" />',
  },
  check: { viewBox: "0 0 24 24", width: 18, height: 18, kind: "stroke", strokeWidth: 2.5, body: '<path d="M20 6 9 17l-5-5" />' },
  plus: { viewBox: "0 0 24 24", width: 20, height: 20, kind: "stroke", strokeWidth: 2, body: '<path d="M12 5v14M5 12h14" />' },
  menu: { viewBox: "0 0 24 24", width: 24, height: 24, kind: "stroke", strokeWidth: 2, body: '<path d="M4 8h16M4 16h16" />' },
  close: { viewBox: "0 0 24 24", width: 24, height: 24, kind: "stroke", strokeWidth: 2, body: '<path d="M6 6l12 12M18 6 6 18" />' },
  // Play button on the hero card photo (107px)
  "play-circle": {
    viewBox: "0 0 107 107", width: 107, height: 107, kind: "raw",
    body: '<circle cx="53.5" cy="53.5" r="53" fill="white" fill-opacity="0.3" stroke="white" /><path d="M43.85 73.67V33.33l24.56 21.93-24.56 18.41Z" fill="white" />',
  },
} satisfies Record<string, IconDef>;

export type IconName = keyof typeof icons;

type SvgAttrs = {
  viewBox: string;
  width: number;
  height: number;
  "aria-hidden": "true";
  fill: string;
  stroke?: string;
  "stroke-width"?: number;
  "stroke-linecap"?: "round";
  "stroke-linejoin"?: "round";
};

/** Attributes for the <svg> element of an icon */
export function iconAttrs(name: IconName): SvgAttrs {
  const icon: IconDef = icons[name];
  const base = { viewBox: icon.viewBox, width: icon.width, height: icon.height, "aria-hidden": "true" } as const;
  if (icon.kind === "fill") return { ...base, fill: "currentColor" };
  if (icon.kind === "raw") return { ...base, fill: "none" };
  return {
    ...base,
    fill: "none",
    stroke: "currentColor",
    "stroke-width": icon.strokeWidth,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  };
}
