<template>
  <div class="mainblock">
    <h1 class="red">{{ message }}</h1>
    <h3 class="red">{{ count }} results found</h3>
    <div v-if="videos && videos.length > 0" class="white left-align data">
      <hr class="red hr800" />
      <div style="display: block; text-align: center;">
        <span class="red">Current Page:</span>
        {{ $route.params.page }}
        <br />
        <span class="red">Sorted By:</span>
        {{ sortBy + (sortDesc === "1" ? " descending" : " ascending") }}
        <br />
        <span class="red">Sort By:</span>
        <router-link
          :to="
            sortUrl +
              '/year/' +
              (sortBy === 'year' && sortDesc === '1' ? '0' : '1')
          "
        >
          {{
            "Year " + (sortBy === "year" && sortDesc === "1" ? "desc" : "asc")
          }} </router-link
        >&nbsp;|&nbsp;
        <router-link
          :to="
            sortUrl +
              '/name/' +
              (sortBy === 'name' && sortDesc === '1' ? '0' : '1')
          "
        >
          {{
            "Name " + (sortBy === "name" && sortDesc === "1" ? "desc" : "asc")
          }} </router-link
        >&nbsp;|&nbsp;
        <router-link
          :to="
            sortUrl +
              '/count/' +
              (sortBy === 'count' && sortDesc === '1' ? '0' : '1')
          "
        >
          {{
            "Count " + (sortBy === "count" && sortDesc === "1" ? "desc" : "asc")
          }} </router-link
        >&nbsp;|&nbsp;
        <router-link
          :to="
            sortUrl +
              '/rating/' +
              (sortBy === 'rating' && sortDesc === '1' ? '0' : '1')
          "
        >
          {{
            "Rating " +
              (sortBy === "rating" && sortDesc === "1" ? "desc" : "asc")
          }}
        </router-link>
      </div>
      <hr class="red hr800" />
      <div v-if="count > 0" style="display: block; text-align: center;">
        <router-link
          v-for="n in Math.ceil(count / 20.0)"
          :key="n"
          :to="'/index/' + n + '/' + sortBy + '/' + sortDesc"
          >{{ n }}&#32;</router-link
        >
      </div>
      <hr class="red hr800" />
      <div
        v-for="movie in videos"
        :key="movie.name"
        class="row countdown-item"
        style="padding-left: 10px; width: 100%;"
      >
        <div class="col-sm-3 col-full-xs img-thumb">
          <router-link
            :to="
              movie.imdb !== null &&
              movie.imdb !== undefined &&
              movie.imdb.poster !== ''
                ? movie.imdb.poster
                : '/static/default.png'
            "
            class="article_movie_poster"
          >
            <div>
              <img
                class="article_poster"
                width="210"
                height="auto"
                :src="
                  movie.imdb !== undefined && movie.imdb.poster !== ''
                    ? movie.imdb.poster
                    : '/static/default.png'
                "
                alt
                sborder
                style="border-color: #EEEEEE; border-style: solid; border-width: 1px; width: 210px; height: auto;"
              />
            </div>
          </router-link>
        </div>
        <div
          v-if="
            movie.title !== null &&
              movie.title !== undefined &&
              movie.title !== ''
          "
          lass="col-78 col-full-xs countdown-item-content"
        >
          <div class="row row-sub countdown-item-title-bar">
            <div class="col-full-xs" style="height: 100%;">
              <div class="article_movie_title" style="float: left;">
                <div>
                  <h2>
                    <router-link
                      :to="'/movie/' + movie.name + '/1'"
                      class="red"
                      >{{ movie.titleYear }}</router-link
                    >&nbsp;(
                    <router-link
                      :to="
                        '/year/' +
                          movie.title.substring(1, movie.title.length - 1) +
                          '/1/count/0'
                      "
                      class="white"
                    >
                      {{
                        movie.title.substring(1, movie.title.length - 1)
                      }} </router-link
                    >)
                  </h2>
                  <span v-if="movie.rottenTomato" class="red"
                    >Tomato Meter:</span
                  >
                  <h5 v-if="movie.rottenTomato" class="white">
                    {{ movie.rottenTomato.tomatoMeter.score }}% /
                    {{ movie.rottenTomato.tomatoMeter.count }} total
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="movie.rottenTomato"
            class="row row-sub countdown-item-title-bar"
          >
            <div class="col-full-xs" style="height: 100%;">
              <div class="article_movie_title" style="float: left;">
                <div>
                  <span class="red">Audience Score:</span>
                  <h5 class="white">
                    {{ movie.rottenTomato.audienceScore.score }}% /
                    {{ movie.rottenTomato.audienceScore.count }} ratings
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div class="row row-sub countdown-item-title-bar">
            <div class="col-full-xs" style="height: 100%;">
              <div class="article_movie_title" style="float: left;">
                <div>
                  <span class="red">IMDB Rating:</span>
                  <h5 class="white">
                    <a class="white" :href="movie.imdb.url + 'ratings'">{{
                      movie.imdb.rating
                    }}</a>
                    /
                    {{ movie.imdb.count }} total
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div class="row row-sub countdown-item-title-bar">
            <div class="col-full-xs" style="height: 100%;">
              <div class="article_movie_title" style="float: left;">
                <div>
                  <span class="red">Aggregate median rating:</span>
                  <star-rating
                    inactive-color="black"
                    active-color="red"
                    :rating="(movie.imdb.rating * 10.0) / 10.0"
                    :max-rating="10"
                    :border-width="4"
                    :increment="0.01"
                    :fixed-points="2"
                    :star-size="20"
                    border-color="red"
                    :read-only="true"
                  ></star-rating>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="
              movie.imdb.arrayPlotSummary.length > 0 &&
                movie.imdb.arrayPlotSummary[0].text !== ''
            "
            class="row row-sub countdown-item-details"
          >
            <div>
              <span class="red">Summaries:</span>
              <p
                v-for="(summary, index) in movie.imdb.arrayPlotSummary"
                :key="index"
              >
                <span
                  v-html="
                    summary.text.indexOf('It looks like') === -1
                      ? summary.text
                      : ''
                  "
                ></span>
                <span class="pink" v-html="summary.author"></span>
              </p>
            </div>
          </div>
          <div class="row row-sub countdown-item-details">
            <div class="small-font">
              <span class="red">Genre:</span>
              <template v-for="cathash in catshashes(movie.name)">
                &nbsp;
                <router-link
                  :key="cathash"
                  class="yellow"
                  :to="'/genre/' + cathash + '/1/count/1'"
                  >#{{ cathash }}</router-link
                >
              </template>
            </div>
          </div>
        </div>
        <hr class="red hr800" />
      </div>
      <br />
      <hr class="red hr800" />
      <div v-if="count > 0" style="display: block; text-align: center;">
        <router-link
          v-for="n in Math.ceil(count / 20.0)"
          :key="n"
          :to="'/index/' + n + '/' + sortBy + '/' + sortDesc"
          >{{ n }}&#32;</router-link
        >
      </div>
      <hr class="red hr800" />
      <div class="brain-container">
        <img
          class="flip"
          width="320"
          height="auto"
          src="/static/centralbrainz.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

export default {
  name: "VideoCollection",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      videos: [],
      count: 0,
      msg: "Biggest catalog of Horror Movies in the internet"
    };
  },
  computed: {
    message() {
      return this.msg;
    },
    urlCalc() {
      return window.location.href;
    },
    sortUrl() {
      return "/index/" + this.$route.params.page;
    },
    sortDesc() {
      return this.$route.params.desc;
    },
    sortBy() {
      return this.$route.params.sort;
    }
  },
  watch: {
    "$route.params.page": function() {
      const dataURL =
        this.$baseurl +
        "php-service/index/index/page/" +
        (this.$route.params.page ? this.$route.params.page : "1") +
        "/20/" +
        this.sortBy +
        "/" +
        this.sortDesc;
      this.$axios.get(dataURL).then(response => {
        this.videos = response.data.result;
        this.count = response.data.count;
      });
    },
    "$route.params.sort": function() {
      const dataURL =
        this.$baseurl +
        "php-service/index/index/page/" +
        (this.$route.params.page ? this.$route.params.page : "1") +
        "/20/" +
        this.sortBy +
        "/" +
        this.sortDesc;
      this.$axios.get(dataURL).then(response => {
        this.videos = response.data.result;
        this.count = response.data.count;
      });
    },
    "$route.params.desc": function() {
      const dataURL =
        this.$baseurl +
        "php-service/index/index/page/" +
        (this.$route.params.page ? this.$route.params.page : "1") +
        "/20/" +
        this.sortBy +
        "/" +
        this.sortDesc;
      this.$axios.get(dataURL).then(response => {
        this.videos = response.data.result;
        this.count = response.data.count;
      });
    }
  },
  mounted() {
    // when the Vue app is booted up, this is run automatically.
    const dataURL =
      this.$baseurl +
      "php-service/index/index/page/" +
      (this.$route.params.page ? this.$route.params.page : "1") +
      "/20/" +
      this.sortBy +
      "/" +
      this.sortDesc;
    this.$axios.get(dataURL).then(response => {
      this.videos = response.data.result;
      this.count = response.data.count;
    });
  },
  methods: {
    extension(url) {
      // Remove everything to the last slash in URL
      url = url.substr(1 + url.lastIndexOf("/"));
      // Break URL at ? and take first part (file name, extension)
      url = url.split("?")[0];
      // Sometimes URL doesn't have ? but #, so we should aslo do the same for #
      url = url.split("#")[0];
      // Now we have only extension
      url = url.substr(0, url.lastIndexOf("."));

      return url;
    },
    catshashes(name) {
      let array = [];
      this.videos.forEach(element => {
        const str = element.name;
        if (str === name) {
          let cats = element.imdb.genre.split(", ");
          cats.forEach(cat => {
            array.push(cat);
          });
        }
      });
      return array.filter((item, index) => array.indexOf(item) === index);
    }
  }
};
</script>
