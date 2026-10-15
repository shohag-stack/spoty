// Base paths for listing pages whose items get their own pages.
export const COACHES_PATH = "/coaches";

export function coachHref(slug: string) {
  return `${COACHES_PATH}/${slug}`;
}
