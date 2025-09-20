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
        d="M168.3 192.3a48.2 48.2 0 0 1-80.6 0 48 48 0 0 1-28.2-56.9 48.2 48.2 0 0 1 68.1-15.6 48.2 48.2 0 0 1 68.1 15.6 48 48 0 0 1-27.4 56.9Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path
        d="M128 119.7v-84a48 48 0 0 1 48 48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}
