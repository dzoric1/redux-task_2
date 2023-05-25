import { useSelector, useDispatch } from "react-redux"
import { useHttp } from "../../hooks/http.hook"
import { useEffect } from "react"
import classNames from "classnames"
import {
  filtersFetched,
  filtersFetchingError,
  filtersFetching,
  activeFilterChanged
} from "../../actions"

import Spinner from "../spinner/Spinner"

const HeroesFilters = () => {

  const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state)
  const dispatch = useDispatch()
  const { request } = useHttp()

  useEffect(() => {
    dispatch(filtersFetching())
    request("http://localhost:3001/filters")
      .then(data => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()))

    // eslint-disable-next-line
  }, []);


  if (filtersLoadingStatus === 'loading') {
    return <Spinner />
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }


  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>
    }

    return arr.map(({ name, className, label }) => {

      const btnClass = classNames('btn', className, {
        'active': name === activeFilter
      })

      return <button
        key={name}
        id={name}
        className={btnClass}
        onClick={() => dispatch(activeFilterChanged(name))}
      >{label}</button>
    })
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {renderFilters(filters)}
        </div>
      </div>
    </div>
  )
}

export default HeroesFilters;