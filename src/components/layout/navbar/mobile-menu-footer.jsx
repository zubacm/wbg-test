"use client";

import ButtonBasic from "@/components/buttons/button-basic";
import Image from "next/image";
import {
  LanguageItem,
  LanguagesMobileWrap,
  MobileNavigationFooterWrapper,
  MobileSelectLanguagesWrapper,
} from "./style";
import { useLocale, useTranslations } from "next-intl";
import React, { Fragment, startTransition, useEffect, useRef, useState } from "react";
import { DefaultLanguageKey, Languages } from "@/lib/consts/language";
import { isDefined } from "@/lib/util";
import { Accordion } from "@nextui-org/accordion";
import { AccordionItem } from "@nextui-org/accordion";
import ButtonNeutral from "@/components/buttons/button-neutral";
import { useParams, usePathname, useRouter } from "next/navigation";
import { setUserLocale } from "@/services/locale";

export default function MobileMenuFooter() {
  const t = useTranslations("languages");
  const locale = useLocale()

  const [selectedKeys, setSelectedKeys] = useState(
    new Set([locale || DefaultLanguageKey])
  );

  const [selectedKeysAccordion, setSelectedKeysAccordion] =
    useState();
    // new Set(["select-language"])
  const isOpenAccordionRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <>
      <MobileNavigationFooterWrapper isOpen={isOpen}>
        <ButtonBasic
          onClick={() => {
            console.log("is defined", selectedKeysAccordion);
            if (isOpenAccordionRef.current === true) {
              isOpenAccordionRef.current = false;
              setSelectedKeysAccordion(new Set([""]));
            } else {
              isOpenAccordionRef.current = true;

              setSelectedKeysAccordion(new Set(["select-language"]));
            }
            // setIsOpen(!isOpen);
          }}
        >
          <Image src="/planet.svg" width="16" height="16" alt="" />
          {/* {isDefined(Object.entries(selectedKeys)?.at(1)?.at(1))
            ? t(Object.entries(selectedKeys)?.at(1)?.at(1))
            : t(DefaultLanguageKey)} */}
            {t(locale)}
          <Image
            src="/carousel.svg"
            className="carousel-svg"
            width="7"
            height="4"
            alt=""
          />
        </ButtonBasic>

        <div className="group">
          <ButtonBasic>
            <Image
              src="/facebook.svg"
              className="carousel-svg"
              width="16"
              height="16"
              alt=""
            />
          </ButtonBasic>
          <ButtonBasic>
            <Image
              src="/linkedin.svg"
              className="carousel-svg"
              width="16"
              height="16"
              alt=""
            />
          </ButtonBasic>
        </div>
      </MobileNavigationFooterWrapper>
      <Accordion
        selectedKeys={selectedKeysAccordion}
        // onSelectionChange={setSelectedKeys}
      >
        <AccordionItem key="select-language" aria-label="Accordion 1">
          <LanguagesMobileWrap>
            {Languages?.map((lan) => (
              <Fragment key={`lang1__${lan?.code}`}>
                {locale === lan.code ? (
                  <ButtonNeutral key={lan?.code}>
                    <LanguageItem>
                      <Image src={lan?.img} width="20" height="20" alt="" />
                      <div>{t(lan.code)}</div>
                      &nbsp;
                      {/* <Image src={"/check.svg"} width="15" height="10" alt="" /> */}
                      <i className="fi fi-rs-check i-16" />
                    </LanguageItem>
                  </ButtonNeutral>
                ) : (
                  <ButtonBasic
                    onClick={() => setSelectedKeys(new Set([lan.code]))}
                  >
                    <LanguageItem
                      onClick={() => {
                        startTransition(() => {
                          startTransition(() => {
                            setUserLocale(lan?.code);
                          });
                        });
                      }}
                    >
                      <Image src={lan?.img} width="20" height="20" alt="" />
                      <div>{t(lan.code)}</div>
                    </LanguageItem>
                  </ButtonBasic>
                )}
              </Fragment>
            ))}
          </LanguagesMobileWrap>
        </AccordionItem>
      </Accordion>
      {/* <MobileSelectLanguagesWrapper isOpen={isOpen}>
        okkjeeesdfsdfsd
      </MobileSelectLanguagesWrapper> */}
    </>
  );
}
