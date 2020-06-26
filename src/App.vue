<template xmlns:v="http://www.w3.org/1999/xhtml">
  <div id="app">
    <h1 class="rot">CENTRAL BRAIN Z</h1>
    <h2 class="white">Horror Movie Database</h2>
    <img width="320" height="auto" src="/static/centralbrainz.png" />
    <br />
    <hr class="red hr800" />
    <div class="links">
      &bull;
      <a class="link" href="http://lariushin.org/">lariushin.org</a>
      &bull;
      <a class="link" href="http://lariushin.top/">lariushin.top</a>
      &bull;
      <a class="link" href="http://herbarium.info/">herbarium.info</a>
      &bull;
      <br />&bull;
      <a class="link" href="http://fungarium.info/">fungarium.info</a>
      &bull;
      <a class="link" href="http://lichenarium.info/">lichenarium.info</a>
      &bull;
      <a class="link" href="http://plantarium.info/">plantarium.info</a>
      &bull;
      <br />&bull;
      <a class="link" href="http://algaerium.info/">algaerium.info</a>
      &bull;
      <a class="link" href="http://lariushin.com/">lariushin.com</a>
      &bull;
      <a class="link" href="http://nightshade.blog/">nightshade.blog</a>
      &bull;
      <br />&bull;
      <a class="link" href="http://bettycat.vip/">bettycat.vip</a>
      &bull;
      <a class="link" href="http://www.bibliothecium.info/"
        >bibliothecium.info</a
      >
      &bull;
      <a class="link" href="https://antropology.tv/#/">antropology.tv</a>
      &bull;
      <br />&bull;
      <a class="link" href="http://xn--land-saar-z7a.cc/">öland-saar.cc</a>
      &bull;
      <a class="link" href="http://iceland-trip.cc/">iceland-trip.cc</a>
      &bull;
      <a class="link" href="http://centralbrainz.tv/">centralbrainz.tv</a>
      &bull;
      <br />&bull;
      <a class="link" href="http://travel-pics.vip/">travel-pics.vip</a>
      &bull;
      <a class="link" href="http://necronomicon.vip/">necronomicon.vip</a>
      &bull;
      <a class="link" href="http://asmodeus.vip/">asmodeus.vip</a> &bull;
    </div>
    <hr class="red hr800" />
    <br />
    <h4 class="center">Search</h4>
    <div class="input-group input-group-lg bottom">
      <input v-model="query" type="text" class="form-control" @keyup="search" />
    </div>
    <br />
    <div v-if="data && data.length > 0" class="data">
      <br />
      <hr class="red hr800" />
      <br />
      <div
        v-for="(value, index) in data"
        :key="index"
        :ref="`card_${index}`"
        class="values"
      >
        <div class="div-img">
          <a :href="value.img_url" target="_blank">
            <img :src="value.img_url" class="thumb" />
          </a>
        </div>
        <div class="div-value">
          <h5>
            <a href="#" class="rot" @click="clearData(value.url + '/1')">{{
              value.name
            }}</a>
          </h5>
          <h6 class="blue" v-html="value.description"></h6>
          <template v-for="cathash in catshashes(value.keywords)">
            &nbsp;
            <a
              :key="cathash"
              href="#"
              class="yellow"
              @click="clearData('/genre/' + cathash + '/1/rating/1')"
              >{{ cathash }}</a
            >
          </template>
        </div>
      </div>
    </div>
    <br />
    <hr class="red hr800" />
    <star-rating
      v-model="boundRating"
      :border-width="4"
      :star-size="20"
      :fixed-points="0"
      border-color="red"
      active-color="red"
      inactive-color="black"
      :increment="1"
      :rating="7"
      :max-rating="10"
      @rating-selected="setRating"
    ></star-rating>
    <hr class="red hr800" />
    <div v-if="years && years.length > 0" style="display: block;">
      <router-link
        v-for="year in years"
        :key="year"
        :to="
          '/year/' +
          year.substr(1, year.length - 2) +
          '/1/' +
          sortBy +
          '/' +
          sortDesc +
          ''
        "
        >&#183;&nbsp;{{ year.substr(1, year.length - 2) }}&#32;</router-link
      >
    </div>
    <hr class="red hr800" />
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      boundRating: 7,
      query: "",
      years: [],
      queryFullText: "",
      data: [],
      videos: [],
      count: 0,
      result: [],
    };
  },
  computed: {
    sortDesc() {
      return this.$route.params.desc;
    },
    sortBy() {
      return this.$route.params.sort;
    },
  },
  mounted() {
    // when the Vue app is booted up, this is run automatically.
    const yearURL = this.$baseurl + "php-service/years/index/page/1/200/name/1";
    let self = this;

    this.$axios.get(yearURL).then(function (response) {
      self.years = response.data.result;
    });
  },
  methods: {
    sortByKey(array, key, reversed = 1) {
      return array.sort(function (a, b) {
        var x = a["imdb"][key];
        var y = b["imdb"][key];
        return x < y ? 1 * reversed : x > y ? -1 * reversed : 0;
      });
    },
    setRating: function (rating) {
      this.$router.push("/rating/" + rating + "/1/rating/1");
    },
    clearData(url) {
      this.$router.push(url);
      this.data = [];
      this.query = "";
    },
    catshashes(cats) {
      let array = [];
      cats.split(", ").forEach((cat) => {
        array.push(cat);
      });
      return array.filter((item, index) => array.indexOf(item) === index);
    },
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
    search: function (event) {
      this.data = [];
      if (this.query.length < 3) {
        return;
      }
      if (event.key === "Enter") {
        this.data = [];
        this.$router.push("/search/" + this.query + "/1/count/0");
        this.query = "";
        return;
      }

      let results = [];
      const dataURL =
        this.$baseurl +
        "php-service/search/" +
        this.query +
        "/page/1/20/name/1";

      let self = this;
      this.$axios.get(dataURL).then(function (response) {
        self.result = response.data.result;

        self.result.forEach((element) => {
          let result = {
            keywords: "",
            name: "",
            url: "",
            img_url: "",
            description: "",
          };

          result.keywords = element.imdb.genre;
          result.name = element.name;
          result.description =
            element.imdb.arrayPlotSummary[0].text.indexOf("It looks like") ===
            -1
              ? element.imdb.arrayPlotSummary[0].text
              : "";
          result.url = encodeURI("/movie/" + element.name);
          result.img_url =
            element.imdb.poster === ""
              ? "/static/default.png"
              : element.imdb.poster;
          results.push(result);
        });
        self.data = results;
      });
    },
  },
};
</script>

<style>
a {
  color: #00ff00 !important;
  text-decoration: unset !important;
}
a:hover {
  color: deeppink !important;
  text-decoration: unset !important;
}
body {
  background-color: black !important;
  color: white !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: deeppink;
  margin-top: 60px;
}
.links {
  max-width: 800px;
  margin: 0 auto;
  color: white;
}
.link {
  color: red;
}
.rot {
  color: red;
  word-wrap: break-word;
}
.white {
  color: white;
  word-wrap: break-word;
}
.pink {
  color: deeppink;
  word-wrap: break-word;
}
.yellow {
  color: yellow !important;
  word-wrap: break-word;
}
.green {
  color: lawngreen;
  word-wrap: break-word;
}
.blue {
  color: dodgerblue;
  word-wrap: break-word;
}
.red {
  border-color: red;
  border-bottom-style: unset;
}

.hr800 {
  max-width: 800px;
}

.bottom {
  margin-top: 50px;
  margin-left: 200px;
}
.card-row {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 780px;
  width: 100%;
  height: 500px;
}
.card {
  position: relative;
  background-color: #ffffff;
  height: 370px;
  width: 240px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}
.card-image {
  position: absolute;
  left: -9999px;
  right: -9999px;
  margin: auto;
  height: 220px;
  min-width: 100%;
}
.card-footer {
  position: absolute;
  bottom: 0;
  height: 130px;
  padding: 10px 15px;
  font-family: Helvetica;
}
.card-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
}
.card-title {
  font-family: Serif;
}
.card-author {
  font-size: 14px;
  color: #bab096;
}
.input-group {
  max-width: 640px;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px !important;
  margin: 0 auto;
}
.thumb {
  width: 160px;
  height: auto;
  padding-right: 20px;
}
.data {
  margin: 0 auto;
  text-align: center;
  max-width: 800px;
}
.values {
  display: flex;
  margin-left: 10px;
  padding-bottom: 10px;
  padding-top: 5px;
  text-align: center;
}
.div-img {
  text-align: left;
}
.div-value {
  text-align: left;
}
.vue-star-rating {
  margin: 0 auto;
}
.img-thumb {
  max-width: 240px !important;
  width: 100% !important;
  margin: 20px !important;
}
.demon {
  float: right;
  position: relative;
  display: none;
}
.col-78 {
  max-width: unset !important;
  flex: unset !important;
  width: 100%;
}
.flip {
  -webkit-transform: scale(-1, -1);
  transform: scale(-1, -1);
}
.small-font {
  font-size: 10pt;
  flex: 0 0 100%;
  max-width: 100%;
}
.brain-container {
  text-align: center;
  max-width: 0 auto;
}
.row {
  padding-top: 10px;
  padding-bottom: 20px;
  flex-wrap: unset !important;
  margin: auto !important;
  padding-right: 20px;
}
.row-sub {
  padding-top: 2px;
  padding-bottom: 5px;
}
.data {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}
.countdown-item-content {
  flex: 0 0 100%;
  max-width: 1024px;
}
.col-sm-3 {
  flex: unset !important;
  max-width: 210px !important;
  padding-right: unset !important;
  padding-left: unset !important;
}
.vue-star-rating-pointer {
  transform: rotate(180deg);
}
h1,
h2 {
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
  word-wrap: break-word;
}
.pink {
  color: deeppink;
  word-wrap: break-word;
}
.white {
  color: white;
  word-wrap: break-word;
}
.left-align {
  text-align: left;
}
.red {
  color: red;
  word-wrap: break-word;
}
.yellow {
  color: yellow;
  word-wrap: break-word;
}
.green {
  color: lawngreen;
  word-wrap: break-word;
}
.blue {
  color: dodgerblue;
  word-wrap: break-word;
}
.mainblock {
  max-width: 1280px;
  margin: 0 auto;
}
.vue-star-rating-rating-text {
  font-size: 35pt;
  color: red;
  bottom: 8px;
  right: -10px;
  position: relative;
  display: none;
}
.input-group > .custom-select:not(:first-child),
.input-group > .form-control:not(:first-child) {
  border-top-left-radius: 4px !important;
  border-bottom-left-radius: 4px !important;
}
.center {
  text-align: center;
}
.row.row-sub.countdown-item-details > div > div > table {
  width: 100% !important;
}
.row.row-sub.countdown-item-details > div {
  width: 100% !important;
}
@media only screen and (max-width: 600px) {
  div.row.countdown-item {
    flex-wrap: wrap !important;
  }
}
@media only screen and (min-width: 601px) {
  div.row.countdown-item {
    flex-wrap: unset !important;
  }
}
.disqus-row {
  padding: 10px !important;
}
.row-sub {
  flex-wrap: wrap;
}
</style>
