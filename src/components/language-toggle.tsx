import { AppLink } from "@/components/ui/app-link"

export default function LanguageToggle({ currentLng }: { currentLng: string }) {
  return (
    <div className="mt-5 flex gap-3">
      <AppLink
        href="/en"
        variant="navigation"
        className={currentLng === "en" ? "font-semibold text-[var(--color-primary)]" : ""}
      >
        English
      </AppLink>
      <AppLink
        href="/gu"
        variant="navigation"
        className={currentLng === "gu" ? "font-semibold text-[var(--color-primary)]" : ""}
      >
        ગુજરાતી
      </AppLink>
    </div>
  )
}
