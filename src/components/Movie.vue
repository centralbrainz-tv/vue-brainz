<template>
    <div class="mainblock">
        <h1 class="red">{{ message }}</h1>
        <div class="white left-align data" v-if="videos && videos.length > 0">
            <div v-for="(movie) in videos" v-bind:key="movie.name" class="row countdown-item"
                style="padding-left: 10px; width: 100%;">
                <div class="col-sm-3 col-full-xs img-thumb">
                    <a :href="movie.imdb.poster !== '' ? movie.imdb.poster : '/static/default.png'" class="article_movie_poster">
                        <div>
                            <img class="article_poster" :src="movie.imdb.poster !== '' ? movie.imdb.poster : '/static/default.png'" alt="" sborder=""
                                style="border-color: #EEEEEE; border-style: solid; border-width: 1px; width: 210px; height: auto;">
                        </div>
                    </a>
                </div>
                <div class="col-78 col-full-xs countdown-item-content">
                    <div class="row row-sub countdown-item-title-bar">
                        <div class="col-full-xs" style="height: 100%;">
                            <div class="article_movie_title" style="float: left;">
                                <div>
                                    <h2>
                                       <h2>
                                        <router-link :to="'/movie/' + movie.name" class="red">{{ movie.titleYear }}</router-link>&nbsp;(<router-link :to="'/year/' + movie.title.substring(1, movie.title.length-1)" class="white">{{ movie.title.substring(1, movie.title.length-1) }}</router-link>)
                                      </h2>
                                    </h2> <br />
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
                                    <h5 class="white"><a class="white"
                                            :href="movie.imdb.url + '/ratings'">{{ movie.imdb.rating }}</a> /
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
                    <div class="row countdown-item-details">
                        <div>
                            <span class="red">Genre: </span>
                            <template v-for="cathash in catshashes(movie.name)">
                                &nbsp;<router-link class="yellow" :to="'/genre/' + cathash + ''" v-bind:key="cathash">
                                    #{{ cathash }}</router-link>
                            </template>
                        </div>
                    </div>
                    <div v-if="movie.imdb.arrayPlotSummary[0].text !== ''" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red">Summaries: </span>
                            <div v-for="(summary, index) in movie.imdb.arrayPlotSummary" v-bind:key="index">
                              <p v-html="summary.text.indexOf('It looks like') === -1 ? summary.text : ''"></p>
                              <span class='pink' v-html="summary.author"></span>
                            </div>
                        </div>
                    </div>
                    <div v-if="movie.imdb.arraySynopsis[0].text !== '' && movie.imdb.arraySynopsis[0].text.indexOf('It looks like') === -1" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red">Synopsis: </span>
                            <div v-for="(summary, index) in movie.imdb.arraySynopsis" v-bind:key="index">
                                <p v-html="summary.text.indexOf('It looks like') === -1 ? summary.text : ''"></p>
                                <span class='pink' v-html="summary.author"></span>
                            </div>
                        </div>
                    </div>
                    <div v-for="(credit, index) in  movie.imdb.arrayFullCredit" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div style="width: 100%;">
                            <span class="red" v-html="credit.name + ': '"></span>
                            <div v-html="credit.text.indexOf('It looks like') === -1 ? credit.text : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in [movie.imdb.technical]" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in movie.imdb.arrayReleaseInfo" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in [movie.imdb.locations]" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in [movie.imdb.keywords]" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in movie.imdb.arrayTaglines" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in movie.imdb.arrayAwards" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in movie.imdb.arrayFAQ" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in (movie.imdb.arrayParentalGuide[0].text.length > 0 ? movie.imdb.arrayParentalGuide : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
<!-- -->
                    <div v-for="(obj, index) in movie.imdb.trivias.text" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="movie.imdb.trivias.name + ': '"></span>
                            <div v-html="obj.indexOf('It looks like') === -1 ? obj : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in (movie.imdb.AV.text.length > 0 ? movie.imdb.AV.text : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="movie.AV.trivias.name + ': '"></span>
                            <div v-html="obj.indexOf('It looks like') === -1 ? obj : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in (movie.imdb.CC.text.length > 0 ? movie.imdb.CC.text : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="movie.imdb.CC.name + ': '"></span>
                            <div v-html="obj.indexOf('It looks like') === -1 ? obj : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in (movie.imdb.MC.text.length > 0 ? movie.imdb.MC.text : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="movie.imdb.MC.name + ': '"></span>
                            <div v-html="obj.indexOf('It looks like') === -1 ? obj : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in (movie.imdb.goofs.text.length > 0 ? movie.imdb.goofs.text : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="movie.imdb.goofs.name + ': '"></span>
                            <div v-html="obj.indexOf('It looks like') === -1 ? obj : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in (movie.imdb.quotes.text.length > 0 ? movie.imdb.quotes.text : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="movie.imdb.quotes.name + ': '"></span>
                            <div v-html="obj.indexOf('It looks like') === -1 ? obj : ''"></div>
                        </div>
                    </div>
                </div>
                <hr class="red hr800" />
                <div class="brain-container" v-if="demon = calcDemon()">
                    <img :src="demon.url" class="demon" :alt="demon.alt" :title="demon.alt" width="160" height="auto" />
                </div>
            </div><br>
            <div class="row row-sub countdown-item">
                <vue-disqus shortname="centralbrainz" :identifier="message" :url="urlCalc"></vue-disqus>
            </div>
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
        let str = item.name
        if (str === this.$route.params.name) {
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
    }
  },
  computed: {
    videos () {
      return this.jsonWithUrl(json)
    },
    message () {
      return this.$route.params.name
    },
    urlCalc () {
      return window.location.href
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #disqus_thread {
    width: 100%;
  }
</style>
