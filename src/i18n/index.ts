import { initReactI18next } from 'react-i18next'
import i18next, { Resource } from 'i18next'
import { i18nLocRu } from '~/i18n/languages/ru'

const resources: Resource = {
  ru: i18nLocRu,
}

export const languages: { id: string, title: string, icon: string, dateFnsLocale: Locale }[] = Object
  .keys(resources)
  .map((language, index) => ({
    id: language,
    title: Object.values(resources)[index].__title as string,
    icon: Object.values(resources)[index].__icon as string,
    dateFnsLocale: Object.values(resources)[index].__dateFnsLocale as Locale,
  }))

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
