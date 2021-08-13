<template>
  <div>
    <v-container>
      <v-row
        class="my-0 mx-n5"
      >
        <v-col
          cols="12"
        >
          <v-expansion-panels>
            <!-- <v-expansion-panel
              v-for="(item,i) in 1"
              :key="i"
            > -->
            <v-expansion-panel>
              <v-expansion-panel-header>
                <!-- <template v-slot:default="{ open }"> -->
                <template>
                  <v-row no-gutters>
                    <v-col cols>
                      <div class="d-block font-weight-bold subtitle-1">
                        スキルセット
                      </div>
                      <div class="d-block ">
                        Skill Set
                      </div>
                    </v-col>
                    <!-- <v-col
                      cols="8"
                      class="text--secondary"
                    >
                      <v-fade-transition leave-absolute>
                        <span
                          v-if="open"
                          key="0"
                        >
                          Technical Composition
                        </span>
                        <span
                          v-else
                          key="1"
                        >
                          Technical Composition
                        </span>
                      </v-fade-transition>
                    </v-col> -->
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(list, i) in allList"
                      :key="i"
                    >
                    <v-expansion-panel-header>
                      <StackItemTitle
                        :list="list"
                      />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <StackItem 
                        :list="list"
                      />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
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
  toRefs,
  watch,
  provide,

} from '@nuxtjs/composition-api'
import useTheme from '@/composables/use-theme'
import CounterKey from "@/composables/use-counter-key"
import useCounter from "@/composables/use-counter"

interface Stack {
  title: string;
  color: string;
  items: StackItem[]; 
}

interface StackItem {
  path: string;
  content: string;
}

export default defineComponent({
  // components: { ExampleChild, NuxtLogo },
  setup() {
    /**
     * data
     */
    const backendList = reactive<Stack>({
      title: 'Backend',
      color: 'warning',
      items: [
        {
          path: 'php.svg',
          content: 'PHP'
        },
        {
          path: 'laravel.svg',
          content: 'Laravel'
        },
        {
          path: 'python.svg',
          content: 'Python'
        },
        {
          path: 'swift.svg',
          content: 'Swift'
        },
      ]
    })

    const frontendList = reactive<Stack>({
      title: 'Frontend',
      color: 'info',
      items: [
        {
          path: 'vue.svg',
          content: 'Vue.js'
        },
        {
          path: 'nuxt-icon.svg',
          content: 'Nuxt.js'
        },
        {
          path: 'javascript.svg',
          content: 'JavaScript'
        },
        {
          path: 'typescript-icon.svg',
          content: 'TypeScript'
        },
        {
          path: '',
          content: 'jQuery'
        },
      ]
    })

    const allList = ref<Stack[]>([
      backendList,
      frontendList,
    ])

    const names = ['Jack', 'John', 'Mike']
    const checkedNames = ref<string[]>([])
    const text_watch = ref('')
    const selectedName = ref('')
    const { mainColor, accentColor } = useTheme()
    provide(CounterKey, useCounter())

    /*
     * lifecycle
     */
    onBeforeMount(() => {
      // console.log('pages carrer.vue onBeforeMount')
    })
    onMounted(() => {
      // console.log('pages carrer.vue onMounted')
    })

    /**
     * computed
     */
    const text_computed = computed(() => {
      return 'checkedNames: ' + checkedNames.value.join(', ')
    })

    /**
     * watch
     */
    // watch(
    //   checkedNames,
    //   (newValue, oldValue) => {
    //     text_watch.value = 'checkedNames: ' + newValue.join(', ')
    //   },
    //   { immediate: true, deep: false }
    // )

    /**
     * method
     */
    const onReset = () => {
      selectedName.value = ''
    }

    return {
      allList,
      // state,
      // names,
      // checkedNames,
      // text_computed,
      // text_watch,
      // selectedName,
      // onReset,
      // mainColor,
      // accentColor,
    }
  },
})
</script>