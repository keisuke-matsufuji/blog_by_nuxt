<template>
  <div>
    <div class="ma-5">
      <h2>LifeCycle</h2>
      <div v-for="(log, i) in state.logs" :key="i">
        <label>{{ log }}</label>
      </div>
    </div>
    <div class="ma-5">
      <h2>Computed/Watch</h2>
      <div v-for="(name, i) in names" :key="i">
        <input v-model="checkedNames" :value="name" type="checkbox" />
        <label>{{ name }}</label>
      </div>
      <p>{{ text_computed }}</p>
      <p>{{ text_watch }}</p>
    </div>
    <div class="ma-5">
      <h2>Props/Context Parent</h2>
      <div v-for="(name, i) in names" :key="i">
        <input v-model="selectedName" :value="name" type="radio" />
        <label>{{ name }}</label>
      </div>
      <ExampleChild 
        :name="selectedName" 
        @reset="onReset"
      />
    </div>
    <div class="ma-5">
      <h2>Composable</h2>
      <input type="color" v-model="mainColor" />
      <!-- <p :style="{ color: mainColor }">main: {{ mainColor }}</p>
      <p :style="{ color: accentColor }">accent: {{ accentColor }}</p> -->
    </div>
    <div class="ma-5">
      <h2>Provider/Inject</h2>
      <ExampleCounterDisplay />
      <ExampleCounterIncrementButton />
      <ExampleCounterDecrementButton />
    </div>
  </div>
</template>

<script lang="ts">
import { 
  computed, 
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref, 
  watch,
  provide,

} from '@nuxtjs/composition-api'
// import ExampleChild from '@/components/ExampleChild.vue'
// import NuxtLogo from '@/components/NuxtLogo.vue'
// import useTheme from '@/composables/use-theme'
import CounterKey from "@/composables/use-counter-key"
import useCounter from "@/composables/use-counter"

interface State {
  logs: string[]
}

export default defineComponent({
  // components: { ExampleChild, NuxtLogo },
  setup() {
    /**
     * data
     */
    const state = reactive<State>({
      logs: [],
    })
    const names = ['Jack', 'John', 'Mike']
    const checkedNames = ref<string[]>([])
    const text_watch = ref('')
    const selectedName = ref('')
    // const { mainColor, accentColor } = useTheme()
    provide(CounterKey, useCounter())

    /*
     * lifecycle
     */
    onBeforeMount(() => {
      state.logs.push('onBeforeMount')
    })
    onMounted(() => {
      state.logs.push('onMounted1')
    })
    onMounted(() => {
      state.logs.push('onMounted2')
    })

    /*
     * computed
     */
    const text_computed = computed(() => {
      return 'checkedNames: ' + checkedNames.value.join(', ')
    })

    /*
     * watch
     */
    watch(
      checkedNames,
      (newValue, oldValue) => {
        text_watch.value = 'checkedNames: ' + newValue.join(', ')
      },
      { immediate: true, deep: false }
    )

    /*
     * method
     */
    const onReset = () => {
      selectedName.value = ''
    }

    return {
      state,
      names,
      checkedNames,
      text_computed,
      text_watch,
      selectedName,
      onReset,
      // mainColor,
      // accentColor,
    }
  },
})
</script>