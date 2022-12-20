<template>
  <div
     class="my-10"
  >
    <v-img
      class="mt-5"
      :src="require(`@/assets/images/blog/${imgPath}.png`)"
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

    const imgPath = computed(() => {
      return String(prop.path.value)
    })

    return {
      imgPath
    }
  },
})
</script>

      