import LanguageToggle from "@/components/language-toggle";
import { getT } from "next-i18next/server";

export default async function Page({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await getT("common", { lng });

  return (
    <>
      <h1>{t("welcome")}</h1>
      <p>{t("hello")}</p>
      <LanguageToggle currentLng={lng} />
    </>
  );
}
