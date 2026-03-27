import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sectionEyebrowVariants = cva(
  "label-md mb-3 block font-semibold tracking-[0.05em] text-brand-secondary dark:text-secondary-fixed",
  {
    variants: {
      align: {
        start: "text-left",
        center: "mx-auto text-center",
      },
    },
    defaultVariants: {
      align: "start",
    },
  }
)

type SectionEyebrowProps = React.ComponentProps<"span"> &
  VariantProps<typeof sectionEyebrowVariants>

function SectionEyebrow({ className, align, ...props }: SectionEyebrowProps) {
  return (
    <span
      data-slot="section-eyebrow"
      className={cn(sectionEyebrowVariants({ align }), className)}
      {...props}
    />
  )
}

export { SectionEyebrow, sectionEyebrowVariants }
