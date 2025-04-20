// import { getRequestConfig } from "next-intl/server";

// export default getRequestConfig(async () => {
//   // Provide a static locale, fetch a user setting,
//   // read from `cookies()`, `headers()`, etc.
//   const locale = "en";

//   return {
//     locale,
//     messages: (await import(`@/app/locales/${locale}.json`)).default,
//   };
// });

import { getUserLocale } from "@/services/locale";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`@/app/locales/${locale}.json`)).default,
  };
});
