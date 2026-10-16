import type { SVGProps } from "react";
import { icons, iconAttrs, type IconName } from "@/components/icons/icons";

type IconProps = Omit<SVGProps<SVGSVGElement>, "name">;

// React versions of the shared icon set (components/icons/icons.ts), for islands.
function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const { "stroke-width": strokeWidth, "stroke-linecap": strokeLinecap, "stroke-linejoin": strokeLinejoin, ...attrs } =
    iconAttrs(name);
  return (
    <svg
      {...attrs}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      {...props}
      dangerouslySetInnerHTML={{ __html: icons[name].body }}
    />
  );
}

export const ChevronLeftIcon = (props: IconProps) => <Icon name="chevron-left" {...props} />;
export const ChevronRightIcon = (props: IconProps) => <Icon name="chevron-right" {...props} />;
export const ArrowUpRightIcon = (props: IconProps) => <Icon name="arrow-up-right" {...props} />;
export const QuoteIcon = (props: IconProps) => <Icon name="quote" {...props} />;
export const PlusIcon = (props: IconProps) => <Icon name="plus" {...props} />;
export const PlayCircleIcon = (props: IconProps) => <Icon name="play-circle" {...props} />;
