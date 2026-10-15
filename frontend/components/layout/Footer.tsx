import Link from "next/link";
import { getSiteSettings } from "@/(core)/fetch/siteSettings";
import { isExternal } from "@/(core)/lib/utils";
import { NewsletterForm } from "./NewsletterForm";

export async function Footer() {
  const settings = await getSiteSettings();
  if (!settings) return null;

  return (
    <footer className="mt-20 bg-canvas pb-10 md:mt-21">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-13">
        <div className="grid gap-14 lg:grid-cols-[424fr_766fr] lg:gap-36">
          <div className="max-w-101">
            {settings.newsletterHeading && (
              <h2 className="mb-6 text-3xl md:text-title">{settings.newsletterHeading}</h2>
            )}
            <NewsletterForm
              placeholder={settings.newsletterPlaceholder ?? "Your email address"}
              buttonLabel={settings.newsletterButton ?? "Subscribe"}
            />
          </div>

          <div className="lg:pt-2.5">
            <div className="grid grid-cols-2 gap-8 sm:flex sm:gap-0">
              {settings.footerColumns?.map((column) => (
                <ul key={column._key} className="space-y-1 sm:w-57">
                  {column.links?.map((link) =>
                    link.href ? (
                      <li key={link._key}>
                        {isExternal(link.href) ? (
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className="hover:underline">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ) : null
                  )}
                </ul>
              ))}
            </div>
            {settings.contactEmail && (
              <p className="mt-10">
                Contact:{" "}
                <a href={`mailto:${settings.contactEmail}`} className="hover:underline">
                  {settings.contactEmail}
                </a>
              </p>
            )}
          </div>
        </div>

        {settings.copyright && <p className="mt-21 text-center">{settings.copyright}</p>}
      </div>
    </footer>
  );
}
