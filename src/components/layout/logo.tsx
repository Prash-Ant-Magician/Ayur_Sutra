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
            d="M128,24A104,104,0,1,0,232,128,104.1,104.1,0,0,0,128,24Z" 
            fill="none" 
            stroke="currentColor" 
            strokeMiterlimit="10" 
            strokeWidth="16"
        />
        <path 
            d="M168,172a68,68,0,0,1-80,0,45.3,45.3,0,0,1-2,0,40,40,0,0,0,84,0,45.3,45.3,0,0,1-2,0Z" 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="16"
        />
    </svg>
  );
}
