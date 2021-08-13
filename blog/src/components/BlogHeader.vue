<template>
  <div>
    <v-app-bar height="30" class="mb-2" :color="baseColor">
      <v-toolbar-title>
        徒然なるままに（仮）
      </v-toolbar-title>
      <div
        v-if="!isMobileSize()"
      >
        <span
          v-for="(item, i) in headerItems"
          :key="i"
        >
          <router-link
            :to="item.path"
            :class="`router_link grey--text ${textSubClass}`"
          >
            {{ item.content }}
          </router-link>
          <span
            v-if="i < headerItems.length-1"
            :class="`grey--text ${textSubClass}`"
          >
            |
          </span>
        </span>
      </div>
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from '@nuxtjs/composition-api'
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
        path: '/',
        content: 'HOME',
      },
      {
        path: '/post',
        content: '記事一覧',
      },
      {
        path: '/tags/JavaScript',
        content: 'JavaScript',
      }
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