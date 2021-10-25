<template>
  <!-- <a 
    :href="article_link"
  >
    {{ article_text }}
  </a> -->
  <a 
    :href="article_link"
    target="_blank"
    rel="noopener"
  >
    {{ article_text }}
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const prop = toRefs(props)

    const article_text = computed(() => {
      return prop.text.value
    })
    const article_link = computed(() => {
      return prop.link.value
    })

    return {
      article_text,
      article_link
    }
  },
})
</script>

<style scoped>
.sample {
  color: #00f;
}
</style>   