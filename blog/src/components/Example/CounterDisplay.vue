<template>
  <div>{{ stateCounter.count }}</div>
</template>

<script lang="ts">
import { defineComponent, inject } from "@nuxtjs/composition-api"
import { CounterStore } from "@/composables/use-counter"
import CounterKey from "@/composables/use-counter-key"

export default defineComponent({
  setup() {
    const { stateCounter } = inject(CounterKey) as CounterStore
    return {
      stateCounter,
    }
  }
})
</script>