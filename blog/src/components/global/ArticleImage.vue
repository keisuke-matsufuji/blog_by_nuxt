<template>
  <div
     class="my-10"
  >
    <v-img
      class="mt-5"
      :src="require(`@/assets/images/blog/${img_path}.png`)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    path: {
      type: Number,
      default: 0,
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

      