import { computed, inject, InjectionKey, ref, watch  } from '@nuxtjs/composition-api'

export default function useTheme(getDarkTheme: () => boolean) {
  const baseColor = ref('#ffffff')
  const textColor = ref('black')
  const textSubClass = ref('text--darken-1')

  // const baseColor = computed(() => {
  //   return getDarkTheme ? '#121212' : '#FFFFFF'
  // })
  // const test = computed(() => {
  //   return getDarkTheme
  // })
  // console.log('test', test)

  watch(
    getDarkTheme,
    (newValue) => {
      baseColor.value = newValue ? '#1e1e1e' : '#ffffff'
      textColor.value = newValue ? 'white' : 'black'
      textSubClass.value = newValue ? 'text--lighten-1' : 'text--darken-1'
    },
  )

  return {
    baseColor,
    textColor,
    textSubClass
  }
}
export type themeType = ReturnType<typeof useTheme>
export const themeKey: InjectionKey<themeType> = Symbol('themeKey')