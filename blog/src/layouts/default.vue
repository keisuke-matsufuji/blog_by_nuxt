<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      absolute
      temporary
    > -->
    <v-navigation-drawer
      app
      v-model="drawer"
      :clipped="clipped"
      fixed
      class="mt-0"
    >
      <v-list
        class="mt-0"
        height="120px"
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
          <!-- <v-list-item-title
            v-if="!miniVariant"
            class="text-h6 font-weight-bold"
          > -->
          <v-list-item-title
            class="text-h6 font-weight-bold"
          >
            Keisuke Matsufuji
          </v-list-item-title>
        </v-list-item>

        <v-list-item class="px-5">
          <v-list-item-content>
            <v-list-item-subtitle
              class="font-weight-bold"
            >
              福岡市在住
            </v-list-item-subtitle>
            <v-list-item-subtitle
              class="font-weight-bold"
            >
              コードを書いています
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-app-bar
      class="mt-2"
      :clipped-left="clipped"
      fixed
      app
      height="40px"
      flat
      :color="baseColor"
    > -->
    <v-app-bar
      app
      class="mt-2"
      absolute
      height="40px"
      flat
      :color="baseColor"
    >
      <v-btn
        icon
        @click.stop="toggleMenu()"
      >
        <!-- <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon> -->
        <v-icon color="primary">mdi-dots-horizontal-circle-outline</v-icon>
      </v-btn>
      <v-toolbar-title 
        v-text="title"
        class="text-h5 font-weight-bold"
      />
      <v-spacer />
      <v-switch
        class="mt-5"
        v-model="darkTheme"
        :prepend-icon="themeIcon"
      />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
        <!-- <Nuxt :textColor="textColor"/> -->
        <!-- <Nuxt :darkTheme="darkTheme"/> -->
      </v-container>
    </v-main>
    <v-footer
      :fixed="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <div
      class="text-center"
    >
      <v-overlay
        :value="overlay"
      >
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        />
      </v-overlay>
    </div>
  </v-app>
</template>

<script lang="ts">
import {
  computed, 
  defineComponent, 
  onBeforeMount,
  onMounted,
  reactive, 
  ref,
  provide,
  toRefs,
  useContext,
  watch,
} from "@nuxtjs/composition-api"
import LayoutKey from "@/composables/use-layout-key"
import useLayout from '@/composables/use-layout'
import  MenuItem  from '@/types/menu-item'

interface State {
  clipped: boolean;
  drawer: boolean;
  fixed: boolean;
  // menuSpace: boolean;
  temporary:boolean;
  items: MenuItem[];
  // miniVariant: boolean;
}

export default defineComponent({
  head: {
    title: "Sample"
  },
  setup() {
    /**
     * data
     */
    const state = reactive<State>({
      clipped: true,
      drawer: false,
      fixed: true,
      // menuSpace: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Example',
          to: '/example',
        },
        {
          icon: 'mdi-note-outline',
          title: 'Blog',
          to: '/posts',
        },
        {
          icon: 'mdi-account-box-outline',
          title: 'Career',
          to: '/career',
        },
      ],
      temporary: true,
    })

    // const {
    //   baseColor,
    //   darkTheme,
    //   textColor,
    //   themeIcon, 
    //   title,
    // } = useLayout(state.items)

    const {
      baseColor,
      darkTheme,
      mobileSize,
      textColor,
      themeIcon, 
      title,
    } = useLayout()
    
    const overlay = ref(true)

    provide(LayoutKey, useLayout())
    provide('getDarkTheme', () => darkTheme.value)
    provide('darkTheme', darkTheme)
    provide('isMobileSize', () => mobileSize.value)
    provide('mobileSize', mobileSize)

    /**
     * lifecycle
     */
    onBeforeMount(() => {
      // console.log('pages default.vue onBeforeMount')
      // console.log('textColor default.vue onBeforeMount', textColor)
    })
    onMounted(() => {
      // console.log('layouts default.vue onMounted')
      overlay.value = false
      // console.log('textColor default.vue onMounted', textColor)
    })

    /**
     * computed
     */
    // const temporary = computed(() => {
    //   return state.miniVariant ? false : true
    // })

    /**
     * method
     */
    const toggleMenu = () => {
      state.drawer = state.drawer ? false : true
    }

    return {
      ...toRefs(state), baseColor, darkTheme, overlay, textColor, themeIcon, title, toggleMenu
    }

  }
})
</script>
<style>
/* Dark Theme */
.theme--dark.v-card {
  color: #ececec;
}
.theme--dark.v-sheet {
  color: #ececec;
}

</style>
