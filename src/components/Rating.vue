<template>
    <div class="mainblock">
        <h1 class="red">{{ message }}</h1>
        <h3 class="red">{{ count }} results found</h3>
        <div class="white left-align data" v-if="videos && videos.length > 0">
            <hr class="red hr800" />
            <div v-if="count > 0" style="display: block; text-align: center;">
                <router-link v-for="n in Math.round(count / 100)" v-bind:key="n" :to="'/year/' + mainParam + '/' + n * 100 + '/'">{{  n  }} </router-link>
            </div>
            <hr class="red hr800" />
            <div v-for="(movie) in videos" v-bind:key="movie.name" class="row countdown-item"
                style="padding-left: 10px; width: 100%;">
                <div class="col-sm-3 col-full-xs img-thumb">
                    <router-link :to="movie.imdb !== undefined && movie.imdb.poster !== '' ? movie.imdb.poster : '/static/default.png'" class="article_movie_poster">
                        <div>
                            <img class="article_poster" width="210" height="auto" :src="movie.imdb !== undefined && movie.imdb.poster !== '' ? movie.imdb.poster : '/static/default.png'" alt="" sborder=""
                                style="border-color: #EEEEEE; border-style: solid; border-width: 1px; width: 210px; height: auto;">
                        </div>
                    </router-link>
                </div>
                <div v-if="movie.title !== undefined && movie.title !== ''" lass="col-78 col-full-xs countdown-item-content">
                    <div class="row row-sub countdown-item-title-bar">
                        <div class="col-full-xs" style="height: 100%;">
                            <div class="article_movie_title" style="float: left;">
                                <div>
                                    <h2>
                                        <router-link :to="'/movie/' + movie.name + '/100'" class="red">{{ movie.titleYear }}</router-link>&nbsp;(<router-link :to="'/year/' + movie.title.substring(1, movie.title.length-1) + '/100'" class="white">{{ movie.title.substring(1, movie.title.length-1) }}</router-link>)
                                    </h2>
                                    <span v-if="movie.rottenTomato" class="red">Tomato Meter: </span>
                                    <h5 v-if="movie.rottenTomato" class="white">{{ movie.rottenTomato.tomatoMeter.score }}% /
                                        {{ movie.rottenTomato.tomatoMeter.count }} total</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="movie.rottenTomato" class="row row-sub countdown-item-title-bar">
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
                                    <h5 class="white"><router-link class="white"
                                            :to="movie.imdb.url + '/ratings'">{{ movie.imdb.rating }}</router-link> /
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
                                        :rating="(movie.imdb.rating * 10.0) / 10.0"
                                        :fixed-points="2" :max-rating="10" :star-size="20" :border-width="1"
                                        border-color="red" :read-only="true"></star-rating>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="movie.imdb.arrayPlotSummary.length > 0 && movie.imdb.arrayPlotSummary[0].text !== ''" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red">Summaries: </span>
                            <p v-for="(summary, index) in movie.imdb.arrayPlotSummary" v-bind:key="index">
                                <span v-html="summary.text.indexOf('It looks like') === -1 ? summary.text : ''"></span>
                                <span class='pink' v-html="summary.author"></span>
                            </p>
                        </div>
                    </div>
                    <div class="row row-sub countdown-item-details">
                        <div class="small-font">
                            <span class="red">Genre: </span>
                            <template v-for="cathash in catshashes(movie.name)">
                                &nbsp;<router-link class="yellow" :to="'/genre/' + cathash + '/100'" v-bind:key="cathash">
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
            <div v-if="count > 0" style="display: block; text-align: center;">
                <router-link v-for="n in Math.round(count / 100)" v-bind:key="n" :to="'/rating/' + mainParam + '/' + n * 100 + '/'">{{  n  }} </router-link>
            </div>
            <hr class="red hr800" />
            <div class="brain-container">
                <img class="flip" width="320" height="auto" src="/static/centralbrainz.png" />
            </div>
        </div>
    </div>
</template>

<script>
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
  watch: {
    '$route.params.rating': function (id) {
      const dataURL = 'https://centralbrainz.tv/php-service/rating/' + this.$route.params.rating + '/page/' + this.$route.params.page + '/100'
      this.$axios
        .get(dataURL)
        .then(response => {
          this.videos = response.data.result
          this.count = response.data.count
        })
    },
    '$route.params.page': function (id) {
      const dataURL = 'https://centralbrainz.tv/php-service/rating/' + this.$route.params.rating + '/page/' + this.$route.params.page + '/100'
      this.$axios
        .get(dataURL)
        .then(response => {
          this.videos = response.data.result
          this.count = response.data.count
        })
    }
  },
  data () {
    return {
      demons: demonsJson,
      rating: this.$route.params.rating,
      videos: []
    }
  },
  methods: {
    jsonWithUrl (videos) {
      let jsonOut = []
      videos.forEach(item => {
        const r3 = Math.round(item.imdb.rating)
        const r = Math.round(this.$route.params.rating)
        if (r === r3) {
          jsonOut.push(item)
        }
      })
      return jsonOut
    },
    catshashes (name) {
      let array = []
      this.jsonWithUrl(this.videos).forEach(element => {
        const str = element.name
        if (str === name) {
          let cats = element.imdb.genre.split(', ')
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
    },
    sortByKey (array, key, reversed = 1) {
      return array.sort(function (a, b) {
        var x = a[key]; var y = b[key]
        return ((x < y) ? (1 * reversed) : ((x > y) ? (-1 * reversed) : 0))
      })
    }
  },
  computed: {
    message () {
      return this.$route.params.rating + ' stars movies hits: '
    },
    urlCalc () {
      return window.location.href
    },
    mainParam () {
      return this.$route.params.rating
    }
  },
  mounted () { // when the Vue app is booted up, this is run automatically.
    const dataURL = 'https://centralbrainz.tv/php-service/rating/' + this.$route.params.rating + '/page/' + this.$route.params.page + '/100'
    this.$axios
      .get(dataURL)
      .then(response => {
        this.videos = response.data.result
        this.count = response.data.count
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
