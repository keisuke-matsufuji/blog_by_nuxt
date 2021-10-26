
<template>
  <article>
    <BlogHeader />
    <v-container>
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="(post, i) in postItem" :key="i">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 20 : 0"
              class="ma-7 rounded-0 blog-cover"
              :class="{ 'on-hover': hover }"
              height="25em"
              :to="post.path"
              router
              exact
            >
              <v-img
                height="25em"
                :src="require(`@/static/covers/${post.cover_image}.jpg`)"
                class="cover-img"
              ></v-img>
              <v-card-text
                class="cover-text-area"
              >
                <v-img
                  class="my-2"
                  :src="require(`@/assets/images/icons/${post.top_image}`)"
                  height="50px"
                  width="50px"
                  contain
                />
                <div>
                  <p class="font-weight-bold cover-text-area-title" :color="textColor">{{ post.title }}</p>
                </div>
                <div>
                  <p class="my-7">{{ post.description }}</p>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import { 
  computed,
  defineComponent,
  inject,
  useAsync,
  useContext,
  useStatic,
  watch,
} from '@nuxtjs/composition-api'
import useTheme from '@/composables/use-theme'
import TagItem from '@/components/TagItem.vue'
import Post from '@/types/post'

export default defineComponent({
  props: {
    darkTheme: {
      type: Boolean,
    },
  },
  setup() {
    /**
     * data
     */
    // const hover

    const { app, params } = useContext()

    // 関数でinjectした場合injectした側は常にgetterとして扱うことができ、
    // それをcomputedだろうとwatchだろうと好きな場所で利用することができる。
    const getDarkTheme = inject<() => boolean>('getDarkTheme')
    const isMobileSize = inject<() => boolean>('isMobileSize')

    const { textColor } = useTheme(getDarkTheme)

    const postItem = useAsync<Post[]>(async () => {
      console.log('params.value', params.value)

      return await app.$content('posts')
      // .where({ tags: { $contains: params.value.slug }})
      .where({ tags: { $eq: params.value.slug }})
      .sortBy('created_at', 'desc')
      .fetch()
    })

    /**
     * computed
     */
    // const tagList = computed(() => {
    //   return post.value.tags.split(',')
    // })

    const toggleMenu = () => {
      console.log('postItem', postItem)
    }

    return {
      isMobileSize,
      // mobileSize,
      postItem,
      toggleMenu,
      textColor,
    }
  },
})
</script>
<style scopded>
.cover-img {
  z-index:1;
}

.blog-cover {
  transition: opacity .10s ease-in-out;
}
div.theme--light .blog-cover:not(.on-hover) {
  opacity: 0.7;
}
div.theme--dark .blog-cover:not(.on-hover) {
  opacity: 0.5;
}

.cover-text-area {
  height: 15em;
  width: 18em;
  position: relative; 
  bottom: 15em; 
  z-index:2;
}

div.theme--light .cover-text-area {
  background-color: #fff;
}
div.theme--dark .cover-text-area {
  background-color: #222;
}

.cover-text-area-title {
  font-size: 18px;
  display: inline;
  background-repeat: no-repeat;
}
div.theme--light .cover-text-area-title {
  background: linear-gradient(transparent 80%, #26A69A 0%);
}
div.theme--dark .cover-text-area-title {
  background: linear-gradient(transparent 80%, #009688 0%);
}


</style>