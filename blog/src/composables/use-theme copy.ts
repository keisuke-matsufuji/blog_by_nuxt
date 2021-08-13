import { computed, ref, InjectionKey  } from '@nuxtjs/composition-api'

/** 反対色を返す関数 */
const getOpposite = (color: string) => {
  return (
    '#' +
    color
      .match(/^#(.{2})(.{2})(.{2})$/)!
      .slice(1, 4)
      .map((v) => 255 - parseInt(v, 16))
      .map((v) => ('0' + v.toString(16)).slice(-2))
      .join('')
  )
}

export default function useTheme() {
  const mainColor = ref('#0080ff')
  const accentColor = computed(() => {
    return getOpposite(mainColor.value)
  })

  return {
    mainColor,
    accentColor,
  }
}
export type themeType = ReturnType<typeof useTheme>
export const themeKey: InjectionKey<themeType> = Symbol('themeKey')