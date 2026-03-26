'use client'
import LanguageToggle from "@/components/language-toggle";
import { Translation } from "next-i18next/pages";

async function MyComponent({
    t, i18n, params
}: {
    t: any;
    i18n: any;
    params: { lng: string }
}) {

    return (
        <Translation i18n={i18n}>
            {(t) => (<>
                <h1>{t("welcome")}</h1>
                <p>{t("hello")}</p>
                < LanguageToggle currentLng={params.lng} />
            </>)}

        </Translation>
    );
}

export default MyComponent