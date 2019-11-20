<template>
  <div class="iblock mainblock">
    <h1>#{{ this.$route.params.hash }}</h1>
    <div class="iblock">
      <div class="iblock yellow" >
      <template v-for="cathash in catshashes">
        &nbsp;<router-link class="yellow" :to="'/hash/' + cathash.substr(1) + ''" v-bind:key="cathash">{{ cathash }}</router-link>
      </template>
      </div>
      <div class="iblock" v-for="data in videos" v-bind:key="data.url">
        <h2 class="iblock pink">
        😈  <a :name="encodeURI(data.url)">{{ data.name !== 'todo add name' ? data.name : data.url.split('.')[0] }}</a>  😈
        </h2>
        <div class="iblock">
          <router-link :to="encodeURI('/vid/' + data.url)">
          <img :src="encodeURI('../thumbs/' + extension(data.url) + '.jpg')" class="videoblock" height="auto" /></router-link>
        </div>
        <h3 class="iblock blue">
          {{ data.description !== 'todo add description' ? data.description : data.url.split('.')[0] }}
        </h3>
        <h4 class="iblock green">
          <input type="hidden" :v-model="encodeURI('../videos/' + data.url)"/>
          <router-link  v-clipboard:copy="encodeURI('../videos/' + data.url)" :to="'/vid/' + encodeURI(data.url)">
            {{ encodeURI('../videos/' + data.url) }}
          </router-link >
        </h4>
        <h4 class="iblock yellow">
          <template v-for="cat in data.cats.split(' ')" to="/">
            &nbsp;<router-link class="yellow" :to="'/hash/' + cat.substr(1) + ''" v-bind:key="cat">{{ cat }}</router-link>
          </template>
        </h4>
        <hr class="pink"/>
      </div>
    </div>
    <img class="flip" width="320" height="auto" src="../assets/star.gif">
  </div>
</template>

<script>
import json from '../json/vids.json'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
export default {
  name: 'video-collection',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      msg: 'Abhorrent unknown, Psyche and Abominations, Curious Anthropology',
      vids: this.jsonWithHash(json),
      hash: this.$route.params.hash
    }
  },
  computed: {
    videos () {
      return this.jsonWithHash(json)
    },
    catshashes () {
      let array = []
      this.jsonWithHash(json).forEach(element => {
        let cats = element.cats.split(' ')
        cats.forEach(cat => {
          array.push(cat)
        })
      })
      return array.filter((item, index) => array.indexOf(item) === index)
    }
  },
  methods: {
    jsonWithHash (json) {
      let jsonOut = []
      json.forEach(item => {
        let str = item.cats
        if (str.includes(this.$route.params.hash)) {
          jsonOut.push(item)
        }
      })
      return jsonOut
    },
    extension (url) {
      console.log(url)
      // Remove everything to the last slash in URL
      url = url.substr(1 + url.lastIndexOf('/'))
      // Break URL at ? and take first part (file name, extension)
      url = url.split('?')[0]
      // Sometimes URL doesn't have ? but #, so we should aslo do the same for #
      url = url.split('#')[0]
      // Now we have only extension
      url = url.substr(0, url.lastIndexOf('.'))

      return url
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: lawngreen;
  word-wrap: break-word
}
.pink {
  color: deeppink;
  word-wrap: break-word
}
.yellow {
  color: yellow;
  word-wrap: break-word
}
.green {
  color: lawngreen;
  word-wrap: break-word
}
.blue {
 color: dodgerblue;
 word-wrap: break-word
}
.mainblock {
  max-width: 800px;
  margin: 0 auto;
}
.videoblock {
  max-width: 640px;
  width: 100%;
  min-width: 320px;
}
.flip {
  -webkit-transform: scaleY(-1);
  transform: scaleY(-1);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
