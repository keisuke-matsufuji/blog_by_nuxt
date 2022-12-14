<template>
  <v-row>
    <v-col>
    <v-app-bar height="100" class="ma-1" :color="baseColor" elevation="0">
      <v-row class="ma-5">
        <v-col cols="2" />
        <v-col cols="8">
          <div class="d-block blog-header" width="50px">
            <v-toolbar-title 
              class="font-weight-bold blog-header-title"
            >
              <router-link
                to="/posts"
                :class="`router_link grey--text ${textSubClass}`"
              >
                Matsusuke tech
              </router-link>
            </v-toolbar-title>
            <div 
              class="blog-header-subtitle"
            >
              Software Engineer Matsusuke のブログサイト
            </div>
            <div
              v-if="!isMobileSize()"
              class="mx-10 pt-5"
              style="text-align:center;"
            >
              <span
                v-for="(item, i) in headerItems"
                :key="i"
                class="mx-0"
              >
                <router-link
                  :to="item.path"
                  :class="`router_link grey--text ${textSubClass}`"
                >
                  {{ item.content }}
                </router-link>
                <span
                  v-if="i < headerItems.length-1"
                  :class="`mx-1 grey--text ${textSubClass}`"
                >
                  |
                </span>
              </span>
            </div>
          </div>
        </v-col>
        <v-col cols="2" />
      </v-row>
      <v-spacer v-if="isMobileSize()"/>
      <div
        v-if="isMobileSize()"
      >
        <v-icon
          @click.stop="toggleMenu()"
        >
          mdi-menu
        </v-icon>
      </div>
    </v-app-bar>
    <v-card
      v-if="menuDrawer"
      class="my-2"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in headerItems"
          :key="i"
          :to="item.path"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.content" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'
import useTheme from '@/composables/use-theme'

interface HeaderItem {
  path: string;
  content: string;
}

export default defineComponent({
  setup() {
  
    // 関数でinjectした場合injectした側は常にgetterとして扱うことができ、
    // それをcomputedだろうとwatchだろうと好きな場所で利用することができる。
    const getDarkTheme = inject<() => boolean>('getDarkTheme')
    const isMobileSize = inject<() => boolean>('isMobileSize')
    const { baseColor, textSubClass } = useTheme(getDarkTheme)

    const headerItems = <HeaderItem[]>[
      {
        path: '/tags/JavaScript',
        content: 'JavaScript',
      },
      {
        path: '/tags/Vue.js',
        content: 'Vue.js',
      },
      {
        path: '/tags/PHP',
        content: 'PHP',
      },
      {
        path: '/tags/Laravel',
        content: 'Laravel',
      },
    ]

    const menuDrawer = ref(false)

    /**
     * method
     */
    const toggleMenu = () => {
      menuDrawer.value = menuDrawer.value ? false : true
    }

    return {
      baseColor,
      textSubClass,
      isMobileSize,
      headerItems,
      menuDrawer,
      toggleMenu
    }
  },
})
</script>
<style scopded>
/* @import url('https://fonts.googleapis.com/css?family=Alegreya+Sans+SC:300'); */
.blog-header {
  text-align: center;
}
.blog-header-title {
  width: min-content;
  margin: auto;
  font-size: 28px; 
  font-family: 'Alegreya Sans SC', sans-serif;
}
.blog-header-subtitle {
  font-size: 12px; 
}
div.theme--light .blog-header-title {
  background: linear-gradient(transparent 80%, #26A69A 0%);
}
div.theme--dark .blog-header-title {
  background: linear-gradient(transparent 85%, #009688 0%);
}
</style>