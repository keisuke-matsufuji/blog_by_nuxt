<template>
  <div>
    <span>
      <v-icon color="primary">mdi-tag-outline</v-icon>
    </span>
    <span 
      v-for="tag in tagList"
      :key="tag"
    >
      <v-chip
        class="ma-1"
        label
        small
        color="secondary"
        :text-color="textColor"
      >
        <div
          class="ma-1"
        >
          <router-link
            :to="`/tags/${tag}`"
            :class="`router_link grey--text ${textSubClass}`"
          >
            {{ tag }}
          </router-link>
        </div>
      </v-chip>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import useTheme from '@/composables/use-theme'

export default defineComponent({
  props: {
    tagList: {
      type: [],
    },
  },
  setup() {
    const getDarkTheme = inject<() => boolean>('getDarkTheme')

    const { textColor, textSubClass } = useTheme(getDarkTheme)

    return {
      textColor,
      textSubClass,
    }
  },
})
</script>