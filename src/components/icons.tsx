import type { SVGProps } from "react";

/** Thin (1.5px) 20px outline icons, drawn in currentColor. Decorative by default — label the control, not the icon. */
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </Icon>
);

export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </Icon>
);

export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5L21 21" />
  </Icon>
);

export const UserIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </Icon>
);

export const BagIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4.5 8h15l-1 13h-13z" />
    <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
  </Icon>
);

export const ArrowLeftIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </Icon>
);

export const ArrowRightIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Icon>
);

export const ChevronRightIcon = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M9 5l7 7-7 7" />
  </Icon>
);
