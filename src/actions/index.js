export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()))
}


export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING'
  }
}

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes
  }
}

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR'
  }
}

export const heroesDeleteItem = (id) => {
  return {
    type: 'HEROES_DELETE_ITEM',
    payload: id
  }
}

export const heroesAddItem = (newItem) => {
  return {
    type: 'HEROES_ADD_ITEM',
    payload: newItem
  }
}

export const filtersFetching = () => {
  return {
    type: 'FILTERS_FETCHING'
  }
}

export const filtersFetched = (filters) => {
  return {
    type: 'FILTERS_FETCHED',
    payload: filters
  }
}

export const filtersFetchingError = () => {
  return {
    type: 'FILTERS_FETCHING_ERROR'
  }
}

export const activeFilterChanged = (filter) => {
  return {
    type: 'ACTIVE_FILTER_CHANGED',
    payload: filter
  }
}