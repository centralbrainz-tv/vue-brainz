<template>
    <div class="mainblock">
        <h1 class="red">{{ message }}</h1>
        <div class="white left-align data" v-if="videos && videos.length > 0">
            <div v-for="(movie) in videos" v-bind:key="movie.name" class="row countdown-item"
                style="padding-left: 10px; width: 100%;">
                <div class="col-sm-3 col-full-xs img-thumb">
                    <router-link :to="movie.rottenTomato.imgUrl" class="article_movie_poster">
                        <div><img class="article_poster" :src="movie.rottenTomato.imgUrl" alt="" sborder=""
                                style="border-color: #EEEEEE; border-style: solid; border-width: 1px;">
                        </div>
                    </router-link>
                </div>
                <div class="col-78 col-full-xs countdown-item-content">
                    <div class="row row-sub countdown-item-title-bar">
                        <div class="col-full-xs" style="height: 100%;">
                            <div class="article_movie_title" style="float: left;">
                                <div>
                                    <h2>
                                        <router-link :to="'/movie/' + movie.name" class="red">{{ movie.name }}
                                        </router-link>
                                    </h2> <br />
                                    <span class="red">Tomato Meter: </span>
                                    <h5 class="white">{{ movie.rottenTomato.tomatoMeter.score }}% /
                                        {{ movie.rottenTomato.tomatoMeter.count }} total</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-sub countdown-item-title-bar">
                        <div class="col-full-xs" style="height: 100%;">
                            <div class="article_movie_title" style="float: left;">
                                <div>
                                    <span class="red">Audience Score: </span>
                                    <h5 class="white">{{ movie.rottenTomato.audienceScore.score }}% /
                                        {{ movie.rottenTomato.audienceScore.count }} ratings</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-sub countdown-item-title-bar">
                        <div class="col-full-xs" style="height: 100%;">
                            <div class="article_movie_title" style="float: left;">
                                <div>
                                    <span class="red">IMDB Rating: </span>
                                    <h5 class="white"><a class="white"
                                            :href="movie.imdb.url + movie.imdb.ratingUrl">{{ movie.imdb.rating }}</a> /
                                        {{ movie.imdb.count }} total</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-sub countdown-item-title-bar">
                        <div class="col-full-xs" style="height: 100%;">
                            <div class="article_movie_title" style="float: left;">
                                <div>
                                    <span class="red">Aggregate median rating: </span>
                                    <star-rating inactive-color="white" active-color="red" :increment="0.01"
                                        :rating="(movie.rottenTomato.tomatoMeter.score + movie.rottenTomato.audienceScore.score + movie.imdb.rating * 10.0) / 30.0"
                                        :fixed-points="2" :max-rating="10" :star-size="20" :border-width="1"
                                        border-color="red" :read-only="true"></star-rating>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-sub countdown-item-details">
                        <div>
                            <span class="red">Critic Consensus: </span>
                            {{ movie.rottenTomato.criticConsensus }}
                        </div>
                    </div>
                    <div class="row row-sub countdown-item-details">
                        <div>
                            <span class="red">Short info: </span>
                            {{ movie.imdb.info }}
                        </div>
                    </div>
                    <div class="row row-sub countdown-item-details">
                        <div class="small-font">
                            <span class="red">Genre: </span>
                            <template v-for="cathash in catshashes(movie.name)">
                                &nbsp;<router-link class="yellow" :to="'/genre/' + cathash + ''" v-bind:key="cathash">
                                    #{{ cathash }}</router-link>
                            </template>
                        </div>
                    </div>
                </div>
                <hr class="red hr800" />
                <div class="brain-container" v-if="demon = calcDemon()">
                    <img :src="demon.url" class="demon" :alt="demon.alt" :title="demon.alt" width="160" height="auto" />
                </div>
            </div><br>
            <hr class="red hr800" />
            <div class="brain-container">
                <img class="flip" width="320" height="auto" src="/static/centralbrainz.png" />
            </div>
        </div>
    </div>
</template>

<script>
import json from '../json/movies.json'
import demonsJson from '../json/demons.json'
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
      demons: demonsJson
    }
  },
  methods: {
    jsonWithUrl (json) {
      let jsonOut = []
      json.forEach(item => {
        const array1 = item.rottenTomato.genre.split(', ')
        const array2 = this.$route.params.genre.split(', ')
        const arrayn = array1.filter(function (n) {
          return array2.indexOf(n) !== -1
        })
        if (arrayn.length > 0) {
          jsonOut.push(item)
        }
      })
      return jsonOut
    },
    catshashes (name) {
      let array = []
      this.jsonWithUrl(json).forEach(element => {
        const str = element.name
        if (str === name) {
          let cats = element.rottenTomato.genre.split(', ')
          cats.forEach(cat => {
            array.push(cat)
          })
        }
      })
      return array.filter((item, index) => array.indexOf(item) === index)
    },
    extension (url) {
      // Remove everything to the last slash in URL
      url = url.substr(1 + url.lastIndexOf('/'))
      // Break URL at ? and take first part (file name, extension)
      url = url.split('?')[0]
      // Sometimes URL doesn't have ? but #, so we should aslo do the same for #
      url = url.split('#')[0]
      // Now we have only extension
      url = url.substr(0, url.lastIndexOf('.'))

      return url
    },
    calcDemon () {
      const rnd = Math.floor(Math.random() * this.demons.length)
      return this.demons[rnd]
    }
  },
  computed: {
    videos () {
      return this.jsonWithUrl(json)
    },
    message () {
      return 'Filtered by Genre: ' + this.$route.params.genre
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
