import { getSiteSettings } from "@/(core)/fetch/siteSettings";
import type { MenuColor } from "@/types";
import { HeaderBar } from "./HeaderBar";

// Server wrapper: reads the menu from Site settings.
export async function SiteHeader({ menuColor = "light" }: { menuColor?: MenuColor }) {
  const settings = await getSiteSettings();
  return (
    <HeaderBar
      siteName={settings?.siteName ?? "Spoty"}
      links={settings?.navLinks ?? []}
      button={settings?.navButton}
      menuColor={menuColor}
    />
  );
}
