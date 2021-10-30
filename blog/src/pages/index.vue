<template>
  <div class="container">
    <v-card style="width: 100%; height: 100%">
      <v-layout justify-center>
        <div>
          <v-avatar size="200" class="ma-3">
            <v-img
              :src="require(`@/assets/images/icons/matsu.jpg`)"
              alt="Matsu"
            ></v-img>
          </v-avatar>
        </div>
      </v-layout>
      <v-layout justify-center>
        <div
          class="font-weight-bold blog-header-title ma-3"
        >
          Matsu
        </div>
      </v-layout>
      <v-layout justify-center>
        <div class="ma-1">
          Webエンジニア三年生
        </div>
      </v-layout>
      <v-layout justify-center>
        <div class="ma-1">
          Backend / Frontendどちらも好きです
        </div>
      </v-layout>
      <v-layout justify-center>
        <div class="ma-3">
          PHP / TypeScript / Vue.js / Python
        </div>
      </v-layout>
      <v-layout justify-center>
        <div class="ma-3">
          <a 
            href="https://github.com/keisuke-matsufuji"
            target="_blank"
            rel="noopener"
          >
            <v-img
              :src="require(`@/assets/images/icons/github-icon.svg`)"
              height="40px"
              width="40px"
              contain
            ></v-img>
          </a>
        </div>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@nuxtjs/composition-api"

export default defineComponent({
  head: {
    title: "Sample"
  },
  setup() {
    /*
      data() {
        return {
          text: ""
        }
      }
    */
    const info = reactive({
      text: ""
    })
    const message = ref('Hello, World!')

    /*
      created() {
        this.text = "まだ押されていません"
      }
    */
   
    info.text = "まだ押されていません"

    /*
      methods: {
        onClicked() {
          this.text = "押されたよ！"
        }
      }
    */
    const onClicked = () => {
      info.text = "押されたよ！"
      message.value = 'Hello, Nuxt!'
    }

    return { info, message, onClicked }
  }
})
</script>
<style scopded>
@import url('https://fonts.googleapis.com/css?family=Alegreya+Sans+SC:300');
.blog-header-title {
  width: min-content;
  margin: auto;
  font-size: 32px; 
  font-family: 'Alegreya Sans SC', sans-serif;
}
</style>
