<template>
  <v-list
    class="d-block"
  >
    <!-- <v-list-item-title
      class="font-weight-bold ma-1"
    >
      <v-chip
        :color="list.color"
        label
      >
        {{ list.title}}
      </v-chip>
    </v-list-item-title> -->
    <div
      v-for="(item, i) in list.items"
      :key="i"
      class="d-inline mt-1"
    >
      <v-chip
        class="ma-1"
        :color="list.color"
        outlined
      >
        <v-img
          v-if="item.path"
          :src="require(`@/assets/images/icons/${item.path}`)"
          class="ma-1"
          height="25px"
          width="25px"
          contain
        />
        <div
          class="ma-1"
          text-color="accent"
        >
          {{ item.content}}
        </div>
      </v-chip>
    </div>
  </v-list>

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
  setup(props, { emit }) {
  // setup(props, context) {
    // const { list } = toRefs(props)
    // const list  = props.list

    console.log('props', props)

    const text = computed(() => {
      // return name.value.toUpperCase()
    })

    const reset = () => {
      emit('reset')
      // context.emit('reset')
    }
    // console.log('context',context)
    // console.log('context root',context.$vuetify)

    return {
      // props,
      reset,
    }
  },
})
</script>