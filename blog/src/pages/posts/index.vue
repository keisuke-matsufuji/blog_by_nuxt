<template>
  <article>
    <BlogHeader />
    <v-container>
      <!-- <v-card elevation="0"> -->
        <v-row>
          <v-col cols="12" md="6" lg="4" v-for="(post, i) in postItem" :key="i">
            <v-card
              elevation="0"
              class="ma-7"
              color="primary"
              height="25em"
            >
              <!-- <v-card-title
                style="height: 4em;"
              >
                <v-avatar
                  height="100"
                  width="100"
                  color="secondary"
                  style="position: relative; top: .5em; left: 10em;"
                >
                  <v-img
                    :src="require(`@/assets/images/icons/${post.top_image}`)"
                    contain
                    style="align-items: end;"
                  ></v-img>
                </v-avatar>
              </v-card-title>
              <v-card-text
                style="background-color: #fff; height: 23em; width: 20em;"
              >
                てすと１
              </v-card-text> -->
              <v-img
                height="25em"
                :src="require(`@/static/covers/${post.cover_image}.jpg`)"
                class="cover-img"
              ></v-img>
              <v-card-text
                class="cover-text-area"
              >
                てすと１
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      <!-- </v-card> -->
    </v-container>
  </article>
</template>

<script lang="ts">
import { 
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  reactive,
  ref,
  Ref,
  toRefs,
  useAsync,
  useContext,
  useStatic,
  watch,
} from '@nuxtjs/composition-api'
import useLayout from '@/composables/use-layout'
import useTheme from '@/composables/use-theme'
import TagItem from '@/components/TagItem.vue'
import Post from '@/types/post'

export default defineComponent({
  props: {
    darkTheme: {
      type: Boolean,
    },
  },
  setup(props) {
    /**
     * data
     */
    const { app, route, params } = useContext()

    // 関数でinjectした場合injectした側は常にgetterとして扱うことができ、
    // それをcomputedだろうとwatchだろうと好きな場所で利用することができる。
    const getDarkTheme = inject<() => boolean>('getDarkTheme')
    // const darkTheme = inject<Ref<boolean>>('darkTheme')
    const isMobileSize = inject<() => boolean>('isMobileSize')

    const postItem = useAsync<Post[]>(async () => {
      return await app.$content('posts', params.value.slug)
      .sortBy('created_at', 'desc')
      .fetch()
    })

    /**
     * computed
     */
    // const tagList = computed(() => {
    //   return post.value.tags.split(',')
    // })

    

    return {
      isMobileSize,
      // mobileSize,
      postItem,
    }
  },
})
</script>
<style scopded>
.cover-img {
  z-index:1;
}
.cover-text-area {
  background-color: #fff;
  height: 15em;
  width: 17.5em;
  position: relative; 
  bottom: 15em; 
  z-index:2;
}
</style>