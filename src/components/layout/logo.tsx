import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={cn("h-6 w-6", props.className)}
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        d="M160 216a80 80 0 0 1-64-128.8C114.3 55.3 128 32 128 32s13.7 23.3 32 55.2A80 80 0 0 1 160 216Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path
        d="M128 32s-40 40-40 88a40 40 0 0 0 80 0c0-48-40-88-40-88Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}
