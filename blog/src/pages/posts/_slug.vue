<template>
  <article>
    <BlogHeader />
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
              <v-col cols="4" md="1">
                <v-img
                  class=""
                  :src="require(`@/assets/images/icons/${post.top_image}`)"
                  height="50px"
                  width="50px"
                  contain
                />
              </v-col>
              <v-col 
                v-if="!isMobileSize()"
                col="8" 
                class="my-2"
              >
                <TagItem
                  :tagList="tagList"
                />
              </v-col>
              <v-col cols="5" md="2">
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
        <!-- <v-row>
          <v-col>
            <v-chip
              class="ma-1"
              label
              small
              color="primary"
            >
              <div
                class="ma-1"
                text-color="accent"
              >
                primary
              </div>
            </v-chip>
            <v-chip
              class="ma-1"
              label
              small
              color="accent"
            >
              <div
                class="ma-1"
                text-color="accent"
              >
                accent
              </div>
            </v-chip>
            <v-chip
              class="ma-1"
              label
              small
              color="secondary"
            >
              <div
                class="ma-1"
                text-color="secondary"
              >
                secondary
              </div>
            </v-chip>
            <v-chip
              class="ma-1"
              label
              small
              color="info"
            >
              <div
                class="ma-1"
                text-color="info"
              >
                info
              </div>
            </v-chip>
            <v-chip
              class="ma-1"
              label
              small
              color="warning"
            >
              <div
                class="ma-1"
                text-color="warning"
              >
                warning
              </div>
            </v-chip>
            <v-chip
              class="ma-1"
              label
              small
              color="error"
            >
              <div
                class="ma-1"
                text-color="error"
              >
                error
              </div>
            </v-chip>
            <v-chip
              class="ma-1"
              label
              small
              color="success"
            >
              <div
                class="ma-1"
                text-color="success"
              >
                success
              </div>
            </v-chip>
          </v-col>
        </v-row> -->
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
              class="my-5"
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
    // const getDarkTheme = inject<() => boolean>('getDarkTheme')
    // const darkTheme = inject<Ref<boolean>>('darkTheme')
    const isMobileSize = inject<() => boolean>('isMobileSize')

    // const { baseColor, textSubClass } = useTheme(getDarkTheme)

    const post = useAsync<Post>(async () => {
      return await app.$content('posts', params.value.slug).fetch();
    })

    /**
     * computed
     */
    const tagList = computed(() => {
      console.log('post', post)
      return post.value.tags.split(',')
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