import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - blog',
    title: 'blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/amplify.js', ssr: false },
    // { src: '~/plugins/amplify.js', ssr: true },
    '~plugins/vue-scrollto',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Nuxt Content configuration: https://content.nuxtjs.org
  content: {
    markdown: {
      prism: {
        // theme: 'prism-themes/themes/prism-material-oceanic.css'
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css'
        // theme: 'prism-themes/themes/prism-vs.css'
        // theme: 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css'
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // dark: true,
      dark: false,
      themes: {
        dark: {
          // primary: colors.teal.darken2,
          // primary: colors.teal,
          primary: colors.teal.lighten1,
          accent: colors.orange.darken3,
          secondary: colors.grey.darken2,
          // primary: colors.blue.darken2,
          // accent: colors.grey.darken3,
          // secondary: colors.amber.darken3,
          info: colors.blue,
          warning: colors.orange.darken1,
          error: colors.red.accent2,
          success: colors.green,
          // tertiary: colors.white,
        },
        light: {
          // primary: colors.teal.lighten2,
          primary: colors.teal.darken1,
          accent: colors.orange.lighten2,
          secondary: colors.grey.lighten2,
          // primary: colors.blue.lighten2,
          // accent: colors.grey.lighten2,
          // secondary: colors.amber.lighten2,
          info: colors.blue,
          warning: colors.orange.darken1,
          error: colors.red.accent2,
          success: colors.green,
          // tertiary: colors.black,
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  css: [
    // プロジェクト内の CSS ファイル
    '@/assets/css/main.css',
  ],

  srcDir: 'src/', 
}
