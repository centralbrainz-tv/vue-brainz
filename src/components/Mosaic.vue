<template>
  <div class="mainblock">
    <h4 class="red">{{ message }}</h4>
    <h5 class="red">{{ count }} results found</h5>
    <router-link
      class="view-select"
      :to="'/mosaic/' + sortPage + '/' + sortBy + '/' + sortDesc"
    >
      Mosaic
    </router-link>
    <router-link
      class="view-select"
      :to="'/index/' + sortPage + '/' + sortBy + '/' + sortDesc"
    >
      Classic
    </router-link>
    <div v-if="videos && videos.length > 0" class="white left-align data">
      <hr class="red hr800" />
      <div class="pages">
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
      <div v-if="count > 0" class="pages">
        <router-link
          v-for="n in Math.ceil(count / 100.0)"
          :key="n"
          :to="'/mosaic/' + n + '/' + sortBy + '/' + sortDesc"
          >{{ n }}&#32;</router-link
        >
      </div>
      <hr class="red hr800" />
      <div class="grid">
        <div v-for="movie in videos" :key="movie.name" class="item-mosaic">
          <div class="rating">
            <a class="white" :href="movie.imdb.url + 'ratings'">{{
              movie.imdb.rating
            }}</a>
          </div>
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
            <img
              class="article_poster thumb-movie-img"
              width="210"
              height="auto"
              :src="
                movie.imdb !== undefined && movie.imdb.poster !== ''
                  ? movie.imdb.poster
                  : '/static/default.png'
              "
              alt
              sborder
            />
          </router-link>
          <h6>
            <router-link :to="'/movie/' + movie.name + '/1'" class="red">{{
              movie.titleYear
            }}</router-link>
          </h6>
          <h6>
            <router-link
              :to="
                '/year/' +
                movie.title.substring(1, movie.title.length - 1) +
                '/1/count/0'
              "
              class="white"
            >
              {{ movie.title.substring(1, movie.title.length - 1) }}
            </router-link>
          </h6>
        </div>
        <hr class="red hr800" />
      </div>
      <br />
      <hr class="red hr800" />
      <div v-if="count > 0" class="pages">
        <router-link
          v-for="n in Math.ceil(count / 100.0)"
          :key="n"
          :to="'/mosaic/' + n + '/' + sortBy + '/' + sortDesc"
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
      },
    },
  },
  data() {
    return {
      videos: [],
      count: 0,
      msg: "Biggest catalog of Horror Movies in the internet",
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
      return "/mosaic/" + this.$route.params.page;
    },
    sortPage() {
      return this.$route.params.page;
    },
    sortDesc() {
      return this.$route.params.desc;
    },
    sortBy() {
      return this.$route.params.sort;
    },
  },
  watch: {
    "$route.params.page": function () {
      const dataURL =
        this.$baseurl +
        "php-service/index/index/page/" +
        (this.$route.params.page ? this.$route.params.page : "1") +
        "/100/" +
        this.sortBy +
        "/" +
        this.sortDesc;
      this.$axios.get(dataURL).then((response) => {
        this.videos = response.data.result;
        this.count = response.data.count;
      });
    },
    "$route.params.sort": function () {
      const dataURL =
        this.$baseurl +
        "php-service/index/index/page/" +
        (this.$route.params.page ? this.$route.params.page : "1") +
        "/100/" +
        this.sortBy +
        "/" +
        this.sortDesc;
      this.$axios.get(dataURL).then((response) => {
        this.videos = response.data.result;
        this.count = response.data.count;
      });
    },
    "$route.params.desc": function () {
      const dataURL =
        this.$baseurl +
        "php-service/index/index/page/" +
        (this.$route.params.page ? this.$route.params.page : "1") +
        "/100/" +
        this.sortBy +
        "/" +
        this.sortDesc;
      this.$axios.get(dataURL).then((response) => {
        this.videos = response.data.result;
        this.count = response.data.count;
      });
    },
  },
  mounted() {
    // when the Vue app is booted up, this is run automatically.
    const dataURL =
      this.$baseurl +
      "php-service/index/index/page/" +
      (this.$route.params.page ? this.$route.params.page : "1") +
      "/100/" +
      this.sortBy +
      "/" +
      this.sortDesc;
    // eslint-disable-next-line no-console
    console.log(dataURL);
    this.$axios.get(dataURL).then((response) => {
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
      this.videos.forEach((element) => {
        const str = element.name;
        if (str === name) {
          let cats = element.imdb.genre.split(", ");
          cats.forEach((cat) => {
            array.push(cat);
          });
        }
      });
      return array.filter((item, index) => array.indexOf(item) === index);
    },
  },
};
</script>
