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

    // console.log('props', props)
    const prop = toRefs(props)
    // console.log('prop', prop)

    const img_path = computed(() => {
      return String(prop.path.value)
    })
    // console.log('img_path', img_path)

    // const img_path = props.path
    // console.log('img_path', img_path)

    return {
      img_path
    }
  },
})
</script>

<style scoped>
.sample {
  color: #00f;
}
</style>        