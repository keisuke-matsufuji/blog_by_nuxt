<template>
  <v-row>
    <v-col cols="2">
      <v-chip
        :color="list.color"
        label
      >
        {{ list.title}}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from '@nuxtjs/composition-api'

type Stack = {
  title: string;
  color: string;
  items: StackItem[]; 
}

type StackItem = {
  path: string;
  content: string;
}

export default defineComponent({
  props: {
    list: {
      type: Object as PropType<Stack>,
      // default: '',
    },
  },
  emits: ['reset'],
  setup(props) {
  // setup(props, context) {
    // const { list } = toRefs(props)
    // const list  = props.list


    const text = computed(() => {
      // return name.value.toUpperCase()
    })

    return {
    }
  },
})
</script>