<template>
    <div class="mainblock">
        <h1 class="red">{{ message }}</h1>
        <h3 class="red">{{ count }} results found</h3>
        <div class="white left-align data" v-if="videos && videos.length > 0">
            <div v-for="(movie) in videos" v-bind:key="movie.name" class="row countdown-item"
                style="padding-left: 10px; width: 100%;">
                <div class="col-sm-3 col-full-xs img-thumb">
                    <router-link :to="movie.imdb !== null && movie.imdb !== undefined && movie.imdb.poster !== '' ? movie.imdb.poster : '/static/default.png'" class="article_movie_poster">
                        <div>
                            <img class="article_poster" width="210" height="auto" :src="movie.imdb !== undefined && movie.imdb.poster !== '' ? movie.imdb.poster : '/static/default.png'" alt="" sborder=""
                                style="border-color: #EEEEEE; border-style: solid; border-width: 1px; width: 210px; height: auto;">
                        </div>
                    </router-link>
                </div>
                <div v-if="movie.title !== null && movie.title !== undefined && movie.title !== ''" lass="col-78 col-full-xs countdown-item-content">
                    <div class="row row-sub countdown-item-title-bar">
                        <div class="col-full-xs" style="height: 100%;">
                            <div class="article_movie_title" style="float: left;">
                                <div>
                                    <h2>
                                        <router-link :to="'/movie/' + movie.name + '/1'" class="red">{{ movie.titleYear }}</router-link>&nbsp;(<router-link :to="'/year/' + movie.title.substring(1, movie.title.length-1) + '/1/count/0'" class="white">{{ movie.title.substring(1, movie.title.length-1) }}</router-link>)
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
                                    <h5 class="white"><a class="white"
                                            :href="movie.imdb.url + 'ratings'">{{ movie.imdb.rating }}</a> /
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
                                        :fixed-points="2" :max-rating="10" :star-size="20" :border-widht="0"
                                        :read-only="true"></star-rating>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row countdown-item-details">
                        <div>
                            <span class="red">Genre: </span>
                            <template v-for="cathash in catshashes(movie.name)">
                                &nbsp;<router-link class="yellow" :to="'/genre/' + cathash + '/1/count/1'" v-bind:key="cathash">
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
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? replace(obj.text) : ''"></div>
                        </div>
                    </div>
                    <ul class="row row-sub countdown-item-details" v-if="(movie.imdb.locations.text.length > 0 && movie.imdb.locations.text !== '')"  style="flex-wrap: wrap !important;list-style-type: disc;list-style-position: outside;">
                        <span class="red" v-html="movie.imdb.locations.name + ': '"></span>
                        <li style="display: list-item;" v-for="(obj, index) in ((movie.imdb.locations.text.length > 0 && movie.imdb.locations.text !== '') ? movie.imdb.locations.text : [])" v-bind:key="index"
                          v-html="obj.indexOf('It looks like') === -1 ? obj : ''">
                        </li>
                    </ul>
                    <ul class="row row-sub countdown-item-details" v-if="(movie.imdb.dates.text.length > 0 && movie.imdb.dates.text !== '')"  style="flex-wrap: wrap !important;list-style-type: disc;list-style-position: outside;">
                      <span class="red" v-html="movie.imdb.dates.name + ': '"></span>
                        <li style="display: list-item;" v-for="(obj, index) in ((movie.imdb.dates.text.length > 0 && movie.imdb.dates.text !== '') ? movie.imdb.dates.text : [])" v-bind:key="index"
                          v-html="obj.indexOf('It looks like') === -1 ? obj : ''">
                        </li>
                    </ul>
                    <div v-for="(obj, index) in (movie.imdb.keywords.length > 0 ? movie.imdb.keywords : (movie.imdb.keywords.text && movie.imdb.keywords.text !=='') ? [movie.imdb.keywords] : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
                    <ul v-if="(movie.imdb.arrayTaglines.length > 0 && movie.imdb.arrayTaglines[0].text !== '')" class="row row-sub countdown-item-details" style="flex-wrap: wrap !important;list-style-type: disc;list-style-position: outside;">
                        <span class="red" v-html="movie.imdb.arrayTaglines[0].name + ': '"></span>
                        <li style="display: list-item;" v-for="(obj, index) in ((movie.imdb.arrayTaglines.length > 0 && movie.imdb.arrayTaglines[0].text !== '') ? movie.imdb.arrayTaglines : [])" v-bind:key="index"  v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''">
                        </li>
                    </ul>
                    <div v-for="(obj, index) in movie.imdb.arrayAwards" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in ((movie.imdb.arrayFAQ.length > 0 && movie.imdb.arrayFAQ[0].text.lenght > 0) ? movie.imdb.arrayFAQ : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div v-for="(text, index) in obj.text" v-bind:key="index">
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="text.indexOf('It looks like') === -1 ? text : ''"></div>
                        </div>
                    </div>
                    <div v-for="(obj, index) in ((movie.imdb.arrayParentalGuide.length > 0 && movie.imdb.arrayParentalGuide[0].text.length > 0 && movie.imdb.arrayParentalGuide[0].text[0] !== '') ? movie.imdb.arrayParentalGuide : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="obj.name + ': '"></span>
                            <div v-html="obj.text.indexOf('It looks like') === -1 ? obj.text : ''"></div>
                        </div>
                    </div>
                    <ul v-if="(movie.imdb.trivias.text.length > 0)" class="row row-sub countdown-item-details" style="flex-wrap: wrap !important;list-style-type: disc;list-style-position: outside;">
                        <span class="red" v-html="movie.imdb.trivias.name + ': '"></span>
                        <li style="display: list-item;" v-for="(obj, index) in (movie.imdb.trivias.text.length > 0 ? movie.imdb.trivias.text : [])" v-bind:key="index"  v-html="obj.indexOf('It looks like') === -1 ? obj : ''">
                        </li>
                    </ul>
                    <div v-for="(obj, index) in (movie.imdb.AV.text.length > 0 ? movie.imdb.AV.text : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="movie.imdb.AV.name + ': '"></span>
                            <div v-html="obj.indexOf('It looks like') === -1 ? obj : ''"></div>
                        </div>
                    </div>
                    <ul v-if="movie.imdb.CC.text.length > 0" class="row row-sub countdown-item-details"  style="flex-wrap: wrap !important;list-style-type: disc;list-style-position: outside;">
                          <span class="red" v-html="movie.imdb.CC.name + ': '"></span>
                          <li style="display: list-item;" v-for="(obj, index) in (movie.imdb.CC.text.length > 0 ? movie.imdb.CC.text : [])" v-bind:key="index" v-html="obj.indexOf('It looks like') === -1 ? obj : ''">
                          </li>
                    </ul>
                    <div v-for="(obj, index) in (movie.imdb.MC.text.length > 0 ? movie.imdb.MC.text : [])" v-bind:key="index" class="row row-sub countdown-item-details">
                        <div>
                            <span class="red" v-html="movie.imdb.MC.name + ': '"></span>
                            <div v-html="obj.indexOf('It looks like') === -1 ? obj : ''"></div>
                        </div>
                    </div>
                    <ul v-if="(movie.imdb.quotes.text.length > 0)" class="row row-sub countdown-item-details" style="flex-wrap: wrap !important;list-style-type: disc;list-style-position: outside;">
                        <span class="red" v-html="movie.imdb.quotes.name + ': '"></span>
                        <li style="display: list-item;" v-for="(obj, index) in (movie.imdb.quotes.text.length > 0 ? movie.imdb.quotes.text : [])" v-bind:key="index" v-html="obj.indexOf('It looks like') === -1 ? obj : ''">
                        </li>
                    </ul>
                    <ul v-if="(movie.imdb.goofs.text.length > 0)" class="row row-sub countdown-item-details" style="flex-wrap: wrap !important;list-style-type: disc;list-style-position: outside;">
                        <span class="red" v-html="movie.imdb.goofs.name + ': '"></span>
                        <li style="display: list-item;" v-for="(obj, index) in (movie.imdb.goofs.text.length > 0 ? movie.imdb.goofs.text : [])" v-bind:key="index"  v-html="obj.indexOf('It looks like') === -1 ? obj : ''">
                        </li>
                    </ul>
                </div>
            </div><br>
            <div class="row row-sub countdown-item disqus-row">
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
      str: '<td class="release-date-item__attributes--empty" style="display: none;"></td>',
      videos: [],
      count: 0
    }
  },
  watch: {
    '$route.params.name': function (id) {
      const dataURL = this.$baseurl + 'php-service/movie/' +
        this.$route.params.name +
        '/page/' +
        this.$route.params.page +
        '/100/name/1'
      this.$axios
        .get(dataURL)
        .then(response => {
          this.videos = response.data.result
          this.count = response.data.count
        })
    },
    '$route.params.page': function (id) {
      const dataURL = this.$baseurl + 'php-service/movie/' +
        this.$route.params.name +
        '/page/' +
        this.$route.params.page +
        '/100/name/1'

      this.$axios
        .get(dataURL)
        .then(response => {
          this.videos = response.data.result
          this.count = response.data.count
        })
    }
  },
  methods: {
    replace (str) {
      const strout = str.replace(/<[^/>][^>]*><\/[^>]+>/gim, '')
      return strout
    },
    catshashes (name) {
      let array = []
      this.videos.forEach(element => {
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
    }
  },
  computed: {
    message () {
      return this.$route.params.name
    },
    urlCalc () {
      return window.location.href
    },
    mainParam () {
      return this.$route.params.name
    }
  },
  mounted () { // when the Vue app is booted up, this is run automatically.
    const dataURL = this.$baseurl + 'php-service/movie/' +
      this.$route.params.name +
      '/page/' +
      this.$route.params.page +
      '/100/name/1'
    this.count = 1

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
<style scoped>#disqus_thread{width:100%;}</style>
