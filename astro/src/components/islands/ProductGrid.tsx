import { useMemo, useState } from "react";
import { ArrowUpRightIcon } from "./icons";
import { SanityImage } from "./SanityImage";
import { cn, isExternal } from "@/lib/utils";
import type { ProductData } from "@/types";

const ALL = "All";

export function ProductGrid({ products }: { products: ProductData[] }) {
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.category).filter((c): c is string => Boolean(c))))],
    [products]
  );
  const [category, setCategory] = useState(ALL);
  const visible = category === ALL ? products : products.filter((p) => p.category === category);

  return (
    <>
      {categories.length > 2 && (
        <div className="mt-10 flex flex-wrap gap-2 md:mt-14" role="group" aria-label="Filter products">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm transition-[color,background-color,scale] duration-300 active:scale-95",
                category === c ? "bg-ink text-white" : "bg-white text-ink hover:bg-white/60"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
        {visible.map((product) => {
          const href = product.url || "/book";
          return (
            <a
              key={product._id}
              href={href}
              {...(isExternal(href) && { target: "_blank", rel: "noopener noreferrer" })}
              className="group block animate-fade-in"
            >
              <div className="relative aspect-square overflow-hidden rounded-card bg-white">
                <SanityImage image={product.image} sizes="(min-width: 1024px) 25vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" />
                {product.badge && (
                  <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-medium">{product.badge}</span>
                )}
                <span className="absolute right-3 bottom-3 grid size-11 translate-y-2 place-items-center rounded-full bg-ink text-white opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRightIcon className="size-4.5" />
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  {product.category && <p className="text-sm text-muted">{product.category}</p>}
                  <h3 className="mt-0.5 text-lg">{product.name}</h3>
                </div>
                {product.price && <p className="text-lg">{product.price}</p>}
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
