import './App.css';
import React, { useEffect, useState } from 'react'
import Tmdb from './Tmbd.js'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie'


export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState()

  useEffect(() => {
    const loadAll = async () => {
      //pegando lista completa
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      //pegando featured movie
      let originals = list.filter(i => i.slug === 'originals')
      let randomItem = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomItem]
    }
    loadAll()
  }, [])

  return (
    <div className='page'>

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className='lists'>
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
      </section>

    </div>
  )
}
