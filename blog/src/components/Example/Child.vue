<template>
  <div>
    <h2>Props/Context Child</h2>
    <p>{{ text }}</p>
    <button @click="reset">Reset</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  emits: ['reset'],
  setup(props, { emit }) {
  // setup(props, context) {
    const { name } = toRefs(props)

    const text = computed(() => {
      return name.value.toUpperCase()
    })

    const reset = () => {
      emit('reset')
      // context.emit('reset')
    }
    // console.log('context',context)
    // console.log('context root',context.$vuetify)

    return {
      text,
      reset,
    }
  },
})
</script>