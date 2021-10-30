import { computed, inject, InjectionKey, ref, watch  } from '@nuxtjs/composition-api'

export default function useTheme(getDarkTheme: () => boolean) {
  const baseColor = computed(() => {
    return getDarkTheme() ? '#121212' : '#FFFFFF'
  })

  const textColor = computed(() => {
    return getDarkTheme() ? 'white' : 'black'
  })

  const textSubClass = computed(() => {
    return getDarkTheme() ? 'text--lighten-1' : 'text--darken-1'
  })
  
  return {
    baseColor,
    textColor,
    textSubClass
  }
}
export type themeType = ReturnType<typeof useTheme>
export const themeKey: InjectionKey<themeType> = Symbol('themeKey')