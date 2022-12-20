<template>
  <div
     class="ma-5"
  >
    <nuxt-link :to="`/posts/${post.slug}`">
      <v-hover v-slot="{ hover }">
        <v-card
          :elevation="hover ? 10 : 2"
        >
          <v-card-title>
            <v-row>
              <v-col cols="2">
                <v-img
                  v-if="post.top_image != ''"
                  class="d-flex"
                  :src="require(`@/assets/images/icons/${post.top_image}`)"
                  height="75px"
                  width="75px"
                  contain
                />
              </v-col>
              <v-col cols="10">
                <div class="d-block ma-1" style="font-weight: bold;">
                  {{ post.title }}
                </div>
                <div class="d-block ma-1 body-1">
                  {{ post.description }}
                </div>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
      </v-hover>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { 
  defineComponent, 
  reactive,
  useAsync,
  useContext, 
} from '@nuxtjs/composition-api'
import Post from '@/types/post'

export default defineComponent({
  props: {
    slug: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { app } = useContext()

    // TODO:ロジックを切り出す
    const post = reactive<Post>({
      title: '',
      description: '',
      created_at: '',
      updated_at: '',
      tags: '',
      top_image: '',
      toc: [],
      body: {},
      dir: '',
      extension: '',
      path: '',
      slug: '',
    })
    useAsync(async () => {
      // fetch
      const fetch = await app.$content('posts', String(props.slug)).fetch()
      // fetchで取得した値をObjectに適用
      post.title = fetch.title
      post.description = fetch.description
      post.created_at = fetch.created_at
      post.updated_at = fetch.updated_at
      post.tags = fetch.tags
      post.top_image = fetch.top_image
      post.toc = fetch.toc
      post.body = fetch.body
      post.dir = fetch.dir
      post.extension = fetch.extension
      post.path = fetch.path
      post.slug = fetch.slug
    })

    return {
      post
    }
  },
})
</script>

      