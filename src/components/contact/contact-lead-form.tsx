"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { useT } from "next-i18next/client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SITE_INQUIRY_EMAIL } from "@/lib/site-contact"
import { cn } from "@/lib/utils"

const SERVICE_VALUES = ["life", "health", "mutualFunds", "fd", "other"] as const

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "nameRequired").min(2, "nameMin"),
  phone: z
    .string()
    .trim()
    .min(1, "phoneRequired")
    .regex(/^[\d+()\s-]{10,24}$/u, "phoneInvalid"),
  serviceInterest: z.enum(SERVICE_VALUES),
  message: z.string().max(2000, "messageMax").optional(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const fieldClassName =
  "h-auto min-h-12 w-full rounded-lg border-0 bg-surface-container-low px-4 py-4 text-base text-on-surface shadow-none placeholder:text-on-surface-variant/60 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-primary-fixed-dim focus-visible:ring-offset-0 md:text-sm dark:bg-white/10"

/**
 * What: validated lead form with mailto hand-off (no backend).
 * Why: matches Stitch lead capture; RHF + Zod give accessible errors and typing.
 * What for: `/[lng]/contact` — opens the visitor’s mail client with a prefilled inquiry.
 */
function ContactLeadForm() {
  const { t } = useT("contactPage")
  const [submitted, setSubmitted] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceInterest: "life",
      message: "",
    },
  })

  const err = (key: string | undefined) => (key ? t(`form.errors.${key}`) : undefined)

  const onSubmit = React.useCallback(
    (data: ContactFormValues) => {
      try {
        const serviceLabel = t(`form.services.${data.serviceInterest}`)
        const lines = [
          `${t("form.name")}: ${data.name}`,
          `${t("form.phone")}: ${data.phone}`,
          `${t("form.service")}: ${serviceLabel}`,
          "",
          data.message?.trim() ? `${t("form.message")}: ${data.message.trim()}` : "",
        ].filter(Boolean)
        const body = encodeURIComponent(lines.join("\n"))
        const subject = encodeURIComponent(t("form.mailSubject"))
        window.location.href = `mailto:${SITE_INQUIRY_EMAIL}?subject=${subject}&body=${body}`
        setSubmitted(true)
        reset({ ...data, message: "" })
      } catch (e) {
        console.error("contact form: mailto hand-off failed", e)
      }
    },
    [reset, t]
  )

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="block text-sm font-bold text-on-surface-variant">
            {t("form.name")}
          </label>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            className={cn(fieldClassName)}
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name?.message ? (
            <p className="text-sm text-destructive" role="alert">
              {err(errors.name.message)}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-phone" className="block text-sm font-bold text-on-surface-variant">
            {t("form.phone")}
          </label>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("form.phonePlaceholder")}
            className={cn(fieldClassName)}
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          {errors.phone?.message ? (
            <p className="text-sm text-destructive" role="alert">
              {err(errors.phone.message)}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-service" className="block text-sm font-bold text-on-surface-variant">
          {t("form.service")}
        </label>
        <select
          id="contact-service"
          className={cn(fieldClassName, "appearance-none")}
          aria-invalid={Boolean(errors.serviceInterest)}
          {...register("serviceInterest")}
        >
          {SERVICE_VALUES.map((value) => (
            <option key={value} value={value}>
              {t(`form.services.${value}`)}
            </option>
          ))}
        </select>
        {errors.serviceInterest?.message ? (
          <p className="text-sm text-destructive" role="alert">
            {err(errors.serviceInterest.message)}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="block text-sm font-bold text-on-surface-variant">
          {t("form.message")}
        </label>
        <Textarea
          id="contact-message"
          rows={3}
          placeholder={t("form.messagePlaceholder")}
          className={cn(fieldClassName, "min-h-24 resize-y")}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message?.message ? (
          <p className="text-sm text-destructive" role="alert">
            {err(errors.message.message)}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        loadingText={t("form.submit")}
        className="gradient-trust w-full gap-2 rounded-lg py-6 text-base font-bold shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        {t("form.submit")}
        <Send className="size-4" aria-hidden />
      </Button>

      {submitted ? (
        <p className="text-sm text-on-surface-variant" role="status">
          {t("form.successHint")}
        </p>
      ) : null}
    </form>
  )
}

export { ContactLeadForm }
