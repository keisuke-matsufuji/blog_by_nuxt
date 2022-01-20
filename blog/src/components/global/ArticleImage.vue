<template>
  <!-- <v-img
   class=""
   :src="require(`@/assets/images/blog/202107272.png`)"
  /> -->
  <v-img
   class=""
   :src="require(`@/assets/images/blog/${img_path}.png`)"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    path: {
      type: Number,
      default: '',
    },
  },
  setup(props) {
    const prop = toRefs(props)

    const img_path = computed(() => {
      return String(prop.path.value)
    })

    return {
      img_path
    }
  },
})
</script>

      