"use client";

import { changelanguage } from "@/actions/change-language";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { languagesData } from "@/data/languages";
import i18nConfig from "@/i18nConfig";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageWrapper from "./LanguageWrapper";

export function LanguageForm() {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState(locale);

  const handleChange = async (e: any) => {
    setLanguage(e);

    await changelanguage(e, locale);
    if (locale === i18nConfig.defaultLocale) {
      router.push("/" + e + pathname);
    } else {
      router.push(pathname.replace(`/${locale}`, `/${e}`));
    }
    router.refresh();
  };

  return (
    <LanguageWrapper>
      {/* <div className="grid grid-col-1 md:grid-col-2"></div> */}
      <RadioGroup
        defaultValue={language}
        onValueChange={(e) => handleChange(e)}
        className="grid grid-cols-2 md:grid-cols-2 gap-6 "
      >
        {languagesData.map((lang) => (
          <div
            className="flex items-center space-x-1 md:space-x-2"
            key={lang.key}
          >
            <RadioGroupItem value={lang.lang!} id={`ri-${lang.key}`} />
            <Label
              htmlFor={`ri-${lang.key}`}
              className="flex items-center gap-3 md:gap-4"
            >
              {lang.title}{" "}
              <span>
                <div className="relative w-4 h-4 md:w-5 md:h-5 rounded-full shadow-2xl">
                  <Image
                    src={lang?.flag}
                    fill
                    sizes="true"
                    alt="lang"
                    className="rounded-full object-fill "
                  />
                </div>
              </span>
            </Label>
          </div>
        ))}
        {/* <div className="flex items-center space-x-2">
          <RadioGroupItem value="en" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="de" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="fr" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div> */}
      </RadioGroup>
    </LanguageWrapper>
  );
}
