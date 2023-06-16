import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { AnimatePresence } from "framer-motion";

import { heroesDeleteItem, fetchHeroes, selectAll } from './heroesSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
      if (filter === 'all') {
        return heroes
      } else {
        return heroes.filter(item => item.element === filter)
      }
    }
  )

  const filteredHeroes = useSelector(filteredHeroesSelector)

  // const filteredHeroes = useSelector(({ filters, heroes }) => {
  //   if (filters.activeFilter === 'all') {
  //     return heroes.heroes
  //   } else {
  //     return heroes.heroes.filter(item => item.element === filters.activeFilter)
  //   }
  // })

  const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const handleDeleteItemClick = useCallback(id => {
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
      .then(() => dispatch(heroesDeleteItem(id)))
      .catch((err) => console.log(err))

    // eslint-disable-next-line
  }, [request])

  useEffect(() => {
    dispatch(fetchHeroes())
    // eslint-disable-next-line
  }, []);

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} {...props} onDelete={() => handleDeleteItemClick(id)} />
    })
  }

  const elements = renderHeroesList(filteredHeroes);
  return (
    <ul>
      <AnimatePresence>
        {elements}
      </AnimatePresence>
    </ul>
  )
}

export default HeroesList;