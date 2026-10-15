import { Reveal } from "@/components/animation/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProductData, ProductsSectionData } from "@/types";
import { ProductGrid } from "./ProductGrid";

export function ProductsSection({ heading, text, products }: ProductsSectionData) {
  const items = products.filter((p): p is ProductData => Boolean(p));

  return (
    <section className="my-20 md:my-35">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-13">
        <Reveal>
          <SectionHeader heading={heading} text={text} />
        </Reveal>
        <ProductGrid products={items} />
      </div>
    </section>
  );
}
