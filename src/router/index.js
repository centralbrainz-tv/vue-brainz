import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/Movies'
import Movie from '@/components/Movie'
import Genre from '@/components/Genre'
import Rating from '@/components/Rating'
import Search from '@/components/Search'
import Year from '@/components/Year'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Movies
    },
    {
      path: '/movie/:name',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/genre/:genre',
      name: 'Genre',
      component: Genre
    },
    {
      path: '/rating/:rating',
      name: 'Rating',
      component: Rating
    },
    {
      path: '/search/:search',
      name: 'Search',
      component: Search
    },
    {
      path: '/year/:year',
      name: 'Year',
      component: Year
    }
  ]
})
