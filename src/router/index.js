import Vue from "vue";
import Router from "vue-router";
import Movies from "@/components/Movies";
import Movie from "@/components/Movie";
import Genre from "@/components/Genre";
import Rating from "@/components/Rating";
import Search from "@/components/Search";
import Year from "@/components/Year";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index/1/count/0",
      component: Movies
    },
    {
      path: "/index/:page/:sort/:desc",
      name: "Main with Sorting",
      component: Movies
    },
    {
      path: "/movie/:name/:page",
      name: "Movie",
      component: Movie
    },
    {
      path: "/year/:year/:page/:sort/:desc",
      name: "Year with Sorting",
      component: Year
    },
    {
      path: "/genre/:genre/:page/:sort/:desc",
      name: "Genre with Sorting",
      component: Genre
    },
    {
      path: "/rating/:rating/:page/:sort/:desc",
      name: "Rating with Sorting",
      component: Rating
    },
    {
      path: "/search/:search/:page/:sort/:desc",
      name: "Search with Sorting",
      component: Search
    }
  ]
});
