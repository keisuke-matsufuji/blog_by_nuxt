import { 
  computed, 
  watch,
  Ref,
  ref,
  useContext,
  InjectionKey 
} from '@nuxtjs/composition-api'
import  MenuItem  from '@/types/menu-item'

/** 反対色を返す関数 */
// const getOpposite = (color: string) => {
//   return (
//     '#' +
//     color
//       .match(/^#(.{2})(.{2})(.{2})$/)!
//       .slice(1, 4)
//       .map((v) => 255 - parseInt(v, 16))
//       .map((v) => ('0' + v.toString(16)).slice(-2))
//       .join('')
//   )
// }

// export default function useLayout(items: Ref<MenuItem[]>, miniVariant: Ref<boolean>) {
// export default function useLayout(items: Ref<MenuItem[]>) {
export default function useLayout() {
  const { app, route } = useContext()
  const darkTheme = ref(false)

  /**
   * computed
   */
  const baseColor = computed(() => {
    let size = app.vuetify.framework.breakpoint.name
    // return darkTheme.value ? 'black' : 'white'
    return darkTheme.value ? '#121212' : '#FFFFFF'
  })

  const mobileSize = computed(() => {
    let name = app.vuetify.framework.breakpoint.name
    return name == 'md' || name == 'lg' || name == 'xl' ? false : true
  })

  const themeIcon = computed(() => {
    return darkTheme.value ? 'mdi-weather-night' : 'mdi-weather-sunny'
  })

  const textColor = computed(() => {
    // return darkTheme.value ? 'black' : 'white'
    return darkTheme.value ? 'white' : 'black'
  })

  const title = computed(() => {
    const currentPath = route.value.fullPath
    // 現在のpathから表示するタイトルを決定する
    // const array: Ref<MenuItem[]> = ref(items) // パラメータ(items)を宣言しないとエラーが表示される
    // let result = ''
    // array.value.some(item => {
    //   if (item.to == currentPath) {
    //     result = item.title
    //   }
    // })
    // return result

    // console.log('log!!!', app.$content.database.options)
    // console.log('vuetify', app.vuetify.framework.theme)
    // console.log('vuetify', app.vuetify.framework.theme.dark)

    return 'Keisuke Matufuji'
    // return ''
  })

  /**
   * watch
   */
  watch(
    darkTheme,
    (newValue) => {
      darkTheme.value = newValue
      // app.vuetify.framework.theme.isDark = darkTheme.value ? true : false
      app.vuetify.framework.theme.dark = darkTheme.value ? true : false
    },
  )

  return {
    baseColor,
    darkTheme,
    mobileSize,
    themeIcon,
    textColor,
    title,
  }
}
export type LayoutStore = ReturnType<typeof useLayout>
export const LayoutKey: InjectionKey<LayoutStore> = Symbol('LayoutKey')