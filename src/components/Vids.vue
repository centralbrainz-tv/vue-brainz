<template>
  <div >
    <div class="row countdown-item" style="padding-left: 10px;">
      <div class="countdown-index-resposive">#200</div>
      <div class="col-sm-4 col-full-xs">
          <a class="article_movie_poster" href="https://www.rottentomatoes.com/m/howling/">
              <div><img class="article_poster"
                      src="https://resizing.flixster.com/V1vjYurmpZT39MqmB-QHEwjSIh0=/180x240/v1.bTsxMTIwODg5MTtqOzE4MzMwOzIwNDg7MTU2MDsyMDgw"
                      alt="" sborder="" style="border-color: #EEEEEE; border-style: solid; border-width: 1px;">
              </div>
          </a>
      </div>
      <div class="col-sm-18 col-full-xs countdown-item-content">
          <div class="row countdown-item-title-bar">
              <div class="col-sm-20 col-full-xs" style="height: 100%;">
                  <div class="article_movie_title" style="float: left;">
                      <div>
                          <h2><a href="https://www.rottentomatoes.com/m/howling/">The Howling</a> <span
                                  class="subtle start-year">(1981)</span> <br><span title="Fresh"
                                  class="icon tiny fresh"></span> <span class="tMeterScore">70%</span>
                          </h2>
                      </div>
                  </div>
              </div>
              <div class="col-sm-4 col-full-xs" style="height: 100%;">
                  <div class="countdown-index">#200</div>
              </div>
          </div>
          <div class="row countdown-item-details">
              <div class="col-sm-24">
                  <div class="info countdown-adjusted-score"><span class="descriptor">Adjusted Score:
                      </span>72.084% <span class="glyphicon glyphicon-question-sign" rel="tooltip"
                          data-toggle="tooltip" data-placement="top" data-html="true" title=""
                          data-original-title="The Adjusted Score comes from a weighted formula (Bayesian) that we use that accounts for variation in the number of reviews per movie."></span>
                  </div>
                  <div class="info critics-consensus"><span class="descriptor">Critics Consensus:</span>
                      The Howling packs enough laughs into its lycanthropic carnage to distinguish it from
                      other werewolf entries, with impressive visual effects adding some bite.</div>
                  <div class="info synopsis"><span class="descriptor">Synopsis:</span> This
                      groundbreaking, darkly comic horror film from director Joe Dante changed the look
                      and feel of werewolf movies in ways...<a class="" target="_top" data-pageheader=""
                          href="https://www.rottentomatoes.com/m/howling/"> [More]</a></div>
                  <div class="info cast">
                      <span class="descriptor">Starring:</span> <a class=""
                          href="https://www.rottentomatoes.com/celebrity/dee_wallace/">Dee Wallace</a>, <a
                          class="" href="https://www.rottentomatoes.com/celebrity/patrick_macnee/">Patrick
                          Macnee</a>, <a class=""
                          href="https://www.rottentomatoes.com/celebrity/dennis_dugan/">Dennis Dugan</a>,
                      <a class="" href="https://www.rottentomatoes.com/celebrity/chris_stone/">Christopher
                          Stone</a></div>
                  <div class="info director">
                      <span class="descriptor">Directed By:</span> <a class=""
                          href="https://www.rottentomatoes.com/celebrity/joe_dante/">Joe Dante</a></div>
              </div>
          </div>
      </div>
    </div><br>
    <img class="flip" width="320" height="auto" src="/static/centralbrainz.png" />
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
      vids: json
    }
  },
  computed: {
    catshashes () {
      let array = []
      json.forEach(element => {
        let cats = element.cats.split(' ')
        cats.forEach(cat => {
          array.push(cat)
        })
      })
      return array.filter((item, index) => array.indexOf(item) === index)
    }
  },
  methods: {
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
}
</style>
