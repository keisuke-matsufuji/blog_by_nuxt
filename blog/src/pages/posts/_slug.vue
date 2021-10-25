<template>
  <article>
    <BlogHeader />
    <v-container>
      <v-row>
        <v-col cols="1" v-if="!isMobileSize()"/>
        <v-col cols="12" md="10">
          <v-card>
            <v-container>
              <v-row
                class="my-2"
              >
                <v-col
                  cols="12"
                >
                  <v-row class="">
                    <v-col col="12">
                      <h1 class="post_title">{{ post.title }}</h1>
                    </v-col>
                  </v-row>
                  <!-- <v-row class="ma-n5"> -->
                  <!-- <v-row class="ma-n5"> -->
                    <v-row class="">
                    <v-col cols="2" md="1"/>
                    <v-col cols="3" md="1">
                      <v-img
                        v-if="post.top_image != ''"
                        class=""
                        :src="require(`@/assets/images/icons/${post.top_image}`)"
                        height="50px"
                        width="50px"
                        contain
                      />
                    </v-col>
                    <v-col 
                      v-if="!isMobileSize()"
                      col="6" 
                      class="my-2"
                    >
                      <TagItem
                        :tagList="tagList"
                      />
                    </v-col>
                    <v-col cols="5" md="3" v-if="post.created_at != '' && post.updated_at">
                      <span class="d-block">
                        <v-icon>mdi-calendar-edit</v-icon>
                        {{ post.created_at.split('T')[0] }}
                      </span>
                      <span class="d-block">
                        <v-icon>mdi-update</v-icon>
                        {{ post.updated_at.split('T')[0] }}
                      </span>
                    </v-col>
                    <v-col cols="1" md="1"/>
                  </v-row>
                  <v-row v-if="isMobileSize()"><!-- Mobileのみ改行して表示 -->
                    <v-col>
                      <TagItem
                        :tagList="tagList"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <!-- <v-container class="mx-10"> -->
            <v-container>
              <v-row class="mx-1">
                <!-- <v-col cols="1" md="3" />
                <v-col cols="10" md="6">
                  <div>
                    <ul>
                      <li v-for="item in post.toc" :key="item.id">
                        <NuxtLink 
                          v-scroll-to="`#${item.id}`" 
                          to
                        >
                          {{ item.text }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </v-col>
                <v-col cols="1" md="3" /> -->
                <v-col>
                  <v-card
                    elevation="2"
                    class="my-0"
                  >
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <template>
                          <v-row no-gutters>
                            <v-col cols>
                              <div class="d-block font-weight-bold ma-1" style="text-align:center; font-size:20px;">
                                Table Of Content
                              </div>
                            </v-col>
                          </v-row>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <ul style="list-style: none;">
                          <li 
                            v-for="item in post.toc" 
                            :key="item.id"
                            :class="`post-depth-${item.depth}`"
                          >
                            <NuxtLink 
                              v-scroll-to="`#${item.id}`" 
                              to
                            >
                              {{ item.text }}
                            </NuxtLink>
                          </li>
                        </ul>
                        <!-- </v-row> -->
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row class="mx-1">
                <v-col cols="12">
                  <NuxtContent
                    :document="post"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <!-- <v-col cols="2" /> -->
        <v-col cols="1" v-if="!isMobileSize()"/>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import { 
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  provide,
  reactive,
  ref,
  Ref,
  toRefs,
  useAsync,
  useContext,
  useFetch,
  useStatic,
  watch,
} from '@nuxtjs/composition-api'
import useLayout from '@/composables/use-layout'
import useTheme from '@/composables/use-theme'
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
    const { app, route, params } = useContext()

    // 関数でinjectした場合injectした側は常にgetterとして扱うことができ、
    // それをcomputedだろうとwatchだろうと好きな場所で利用することができる。
    const isMobileSize = inject<() => boolean>('isMobileSize')

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
      const fetch = await app.$content('posts', params.value.slug).fetch()
      // fetchで取得した値をObjectに適用
      post.title       = fetch.title
      post.description = fetch.description
      post.created_at  = fetch.created_at
      post.updated_at  = fetch.updated_at
      post.tags        = fetch.tags
      post.top_image   = fetch.top_image
      post.toc         = fetch.toc
      post.body        = fetch.body
      post.dir         = fetch.dir
      post.extension   = fetch.extension
      post.path        = fetch.path
      post.slug        = fetch.slug

      console.log('post', post)
    })

    /**
     * computed
     */
    const tagList = computed(() => {
      return post.tags == '' ? [] : post.tags.split(',')
    })

    return {
      // baseColor,
      isMobileSize,
      post,
      tagList,
      // textColor,
      // textSubClass,
    }
  },
})
</script>