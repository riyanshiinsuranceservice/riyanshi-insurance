"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import confetti from "canvas-confetti"
import { Send } from "lucide-react"
import { useT } from "next-i18next/client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  INQUIRY_EMAIL_NOT_CONFIGURED_CODE,
  INQUIRY_FIELD_LIMITS,
  type InquiryLocale,
} from "@/lib/inquiry-schema"
import { SITE_PHONE_DISPLAY } from "@/lib/site-contact"
import { cn } from "@/lib/utils"

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "nameRequired")
    .min(2, "nameMin")
    .max(INQUIRY_FIELD_LIMITS.nameMax, "nameMax"),
  email: z
    .string()
    .trim()
    .min(1, "emailRequired")
    .email("emailInvalid")
    .max(320, "emailMax"),
  phone: z
    .string()
    .trim()
    .min(1, "phoneRequired")
    .regex(/^[\d+()\s-]{10,24}$/u, "phoneInvalid"),
  message: z
    .string()
    .trim()
    .min(1, "messageRequired")
    .max(INQUIRY_FIELD_LIMITS.messageMax, "messageMax"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const fieldClassName =
  "h-auto min-h-12 w-full rounded-lg border-0 bg-surface-container-low px-4 py-4 text-base text-on-surface shadow-none placeholder:text-on-surface-variant/60 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-primary-fixed-dim focus-visible:ring-offset-0 md:text-sm dark:bg-white/10"

function fireSuccessConfetti() {
  const defaults = { spread: 70, startVelocity: 35, scalar: 0.9, ticks: 90, zIndex: 100 }

  const shoot = (p: confetti.Options) => {
    void confetti({ ...defaults, ...p, particleCount: 55, origin: { y: 0.65 } })
  }

  shoot({ spread: 26, startVelocity: 55 })
  shoot({ spread: 60 })
  shoot({ spread: 100, decay: 0.91 })
  window.setTimeout(() => shoot({ spread: 100, decay: 0.95 }), 120)
}

/**
 * What: validated contact form posting to `/api/inquiry` with Gmail-backed delivery.
 * Why: RHF + Zod for accessible errors; dialog + confetti reinforce success without a new page.
 * What for: `/[lng]/contact` hero card — owner + visitor emails, no database.
 */
function ContactLeadForm({ locale }: { locale: InquiryLocale }) {
  const { t } = useT("contactPage")
  const [apiError, setApiError] = React.useState<string | null>(null)
  const [successOpen, setSuccessOpen] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const err = (key: string | undefined) => (key ? t(`form.errors.${key}`) : undefined)

  const onSubmit = React.useCallback(
    async (data: ContactFormValues) => {
      setApiError(null)
      try {
        const res = await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locale,
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
          }),
        })

        let payload: { error?: string; code?: string } = {}
        try {
          payload = (await res.json()) as { error?: string; code?: string }
        } catch {
          payload = {}
        }

        if (!res.ok) {
          if (payload.code === INQUIRY_EMAIL_NOT_CONFIGURED_CODE) {
            setApiError(t("form.errors.emailNotConfigured"))
            return
          }
          const fallback =
            res.status === 400 ? t("form.errors.validationFailed") : t("form.errors.apiError")
          setApiError(payload.error?.trim() || fallback)
          return
        }

        reset({ name: "", email: "", phone: "", message: "" })
        setSuccessOpen(true)
        fireSuccessConfetti()
      } catch (e) {
        console.error("contact form: submit failed", e)
        setApiError(t("form.errors.networkError"))
      }
    },
    [locale, reset, t]
  )

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={isSubmitting}
      >
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
              disabled={isSubmitting}
            />
            {errors.name?.message ? (
              <p className="text-sm text-destructive" role="alert">
                {err(errors.name.message)}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-email" className="block text-sm font-bold text-on-surface-variant">
              {t("form.email")}
            </label>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder={t("form.emailPlaceholder")}
              className={cn(fieldClassName)}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email?.message ? (
              <p className="text-sm text-destructive" role="alert">
                {err(errors.email.message)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-phone" className="block text-sm font-bold text-on-surface-variant">
            {t("form.phone")}
          </label>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={SITE_PHONE_DISPLAY}
            className={cn(fieldClassName)}
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
            disabled={isSubmitting}
          />
          {errors.phone?.message ? (
            <p className="text-sm text-destructive" role="alert">
              {err(errors.phone.message)}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-message" className="block text-sm font-bold text-on-surface-variant">
            {t("form.message")}
          </label>
          <Textarea
            id="contact-message"
            rows={4}
            placeholder={t("form.messagePlaceholder")}
            className={cn(fieldClassName, "min-h-28 resize-y")}
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
            disabled={isSubmitting}
          />
          {errors.message?.message ? (
            <p className="text-sm text-destructive" role="alert">
              {err(errors.message.message)}
            </p>
          ) : null}
        </div>

        {apiError ? (
          <p className="text-sm text-destructive" role="alert">
            {apiError}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          loadingText={t("form.submitting")}
          className="gradient-trust w-full gap-2 rounded-lg py-6 text-base font-bold shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          {t("form.submit")}
          <Send className="size-4" aria-hidden />
        </Button>
      </form>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent showCloseButton aria-describedby="contact-success-desc">
          <DialogHeader>
            <DialogTitle>{t("form.successTitle")}</DialogTitle>
            <DialogDescription id="contact-success-desc">{t("form.successDescription")}</DialogDescription>
          </DialogHeader>
          <Button type="button" variant="primary" className="w-full" onClick={() => setSuccessOpen(false)}>
            {t("form.successClose")}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { ContactLeadForm }
