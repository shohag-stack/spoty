import { BasketIcon, CogIcon, CommentIcon, DocumentsIcon, HelpCircleIcon, HomeIcon, UserIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

const singletons = ["home", "siteSettings"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home page")
        .icon(HomeIcon)
        .child(S.document().schemaType("page").documentId("home").title("Home page")),
      S.listItem()
        .title("Other pages")
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList("page")
            .title("Other pages")
            .filter('_type == "page" && !(_id in $singletons) && !(_id in path("drafts.**") && string::split(_id, "drafts.")[1] in $singletons)')
            .params({ singletons })
        ),
      S.divider(),
      S.documentTypeListItem("coach").title("Coaches").icon(UserIcon),
      S.documentTypeListItem("testimonial").title("Testimonials").icon(CommentIcon),
      S.documentTypeListItem("faq").title("FAQs").icon(HelpCircleIcon),
      S.documentTypeListItem("product").title("Products").icon(BasketIcon),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings")),
    ]);
