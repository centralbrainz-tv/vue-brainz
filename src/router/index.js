import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/Movies'
import Movie from '@/components/Movie'
import Genre from '@/components/Genre'
import Rating from '@/components/Rating'

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
      name: 'Movie',
      component: Genre
    },
    {
      path: '/rating/:rating',
      name: 'Movie',
      component: Rating
    }
  ]
})
