// Shared GROQ projections used by section fragments and document queries.

export const imageFields = `asset, hotspot, crop, alt, "lqip": asset->metadata.lqip`;

export const linkFields = `label, href`;
