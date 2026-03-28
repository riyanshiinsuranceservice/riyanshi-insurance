"use client"

/**
 * What: lead-capture form that validates input and opens WhatsApp with a prefilled message.
 * Why: Stitch lead page centers conversion on quick contact; WA is the primary handoff without a backend.
 * What for: `/[lng]/lead` — keeps validation and errors on the client with typed RHF + Zod.
 */

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { SITE_WHATSAPP_HREF } from "@/lib/site-contact"

export type LeadNeed = "medical" | "life" | "investment"

export type LeadLandingFormCopy = {
  title: string
  nameLabel: string
  namePlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  needLabel: string
  submit: string
  whatsappCta: string
  success: string
  submitError: string
  errors: { name: string; phoneMin: string; phoneFormat: string }
  options: { value: LeadNeed; label: string }[]
  whatsappPrefillTemplate: string
}

function buildLeadSchema(errors: LeadLandingFormCopy["errors"]) {
  return z.object({
    name: z.string().trim().min(1, errors.name),
    phone: z
      .string()
      .trim()
      .min(1, errors.phoneMin)
      .refine((v) => v.replace(/\D/g, "").length >= 10, errors.phoneFormat),
    need: z.enum(["medical", "life", "investment"]),
  })
}

type LeadLandingLeadFormProps = {
  copy: LeadLandingFormCopy
}

function LeadLandingLeadForm({ copy }: LeadLandingLeadFormProps) {
  const schema = React.useMemo(() => buildLeadSchema(copy.errors), [copy.errors])
  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", need: "medical" },
  })

  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")

  const needLabelMap = React.useMemo(
    () =>
      Object.fromEntries(copy.options.map((o) => [o.value, o.label])) as Record<
        LeadNeed,
        string
      >,
    [copy.options]
  )

  async function onSubmit(data: FormValues) {
    setStatus("idle")
    try {
      const needLabel = needLabelMap[data.need]
      const prefill = copy.whatsappPrefillTemplate
        .replace("{{name}}", data.name)
        .replace("{{phone}}", data.phone)
        .replace("{{need}}", needLabel)
      const url = `${SITE_WHATSAPP_HREF}?text=${encodeURIComponent(prefill)}`
      const win =
        typeof window !== "undefined"
          ? window.open(url, "_blank", "noopener,noreferrer")
          : null
      if (!win) {
        setStatus("error")
        return
      }
      setStatus("success")
      reset({ name: "", phone: "", need: data.need })
    } catch (err) {
      console.error("[LeadLandingLeadForm] submit failed", err)
      setStatus("error")
    }
  }

  const fieldClass =
    "h-auto min-h-12 rounded-lg border-0 bg-surface-container-low px-4 py-3 text-base text-on-surface shadow-none placeholder:text-on-surface-variant/70 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-primary-fixed-dim"

  return (
    <div className="relative z-10 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-[0_20px_40px_rgba(25,28,30,0.06)]">
      <h2 className="mb-6 font-display text-2xl font-bold text-primary">{copy.title}</h2>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label
            className="label-md mb-2 block px-1 font-bold text-outline"
            htmlFor="lead-name"
          >
            {copy.nameLabel}
          </label>
          <Input
            id="lead-name"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            className={cn(fieldClass, errors.name && "ring-2 ring-destructive/40")}
            {...register("name")}
          />
          {errors.name ? (
            <p className="mt-1.5 text-sm text-destructive" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="label-md mb-2 block px-1 font-bold text-outline"
            htmlFor="lead-phone"
          >
            {copy.phoneLabel}
          </label>
          <Input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={copy.phonePlaceholder}
            aria-invalid={Boolean(errors.phone)}
            className={cn(fieldClass, errors.phone && "ring-2 ring-destructive/40")}
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="mt-1.5 text-sm text-destructive" role="alert">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="label-md mb-2 block px-1 font-bold text-outline"
            htmlFor="lead-need"
          >
            {copy.needLabel}
          </label>
          <select
            id="lead-need"
            className={cn(
              "w-full appearance-none rounded-lg border-0 bg-surface-container-low px-4 py-3 text-base text-on-surface outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim",
              errors.need && "ring-2 ring-destructive/40"
            )}
            {...register("need")}
          >
            {copy.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.need ? (
            <p className="mt-1.5 text-sm text-destructive" role="alert">
              {errors.need.message}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          className="gradient-trust h-auto w-full rounded-lg py-4 text-lg font-bold shadow-lg"
        >
          {copy.submit}
        </Button>
      </form>

      <div
        className="mt-6 flex flex-col items-center justify-center gap-2 border-t border-outline-variant/20 pt-6"
        aria-live="polite"
      >
        {status === "success" ? (
          <p className="text-center text-sm font-medium text-secondary">{copy.success}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-center text-sm font-medium text-destructive">{copy.submitError}</p>
        ) : null}
        <a
          className="inline-flex items-center gap-2 font-bold text-[#25D366] underline-offset-4 hover:underline"
          href={SITE_WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="size-6 shrink-0" aria-hidden />
          {copy.whatsappCta}
        </a>
      </div>
    </div>
  )
}

export { LeadLandingLeadForm }
