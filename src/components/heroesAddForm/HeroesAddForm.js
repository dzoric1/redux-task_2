import { useState, } from "react";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import { heroesAddItem } from "../heroesList/heroesSlice";
import { selectAll } from "../heroesFilters/filtersSlice";
import store from '../../store'

const HeroesAddForm = () => {

  const [inputName, setInputName] = useState('')
  const [inputText, setInputText] = useState('')
  const [inputElement, setInputElement] = useState('')

  const { filtersLoadingStatus } = useSelector(state => state.filters)
  const filters = selectAll(store.getState())
  console.log(filters);
  const { request } = useHttp()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    const newHero = {
      id: uuidv4(),
      name: inputName,
      description: inputText,
      element: inputElement
    }

    request('http://localhost:3001/heroes/', 'POST', JSON.stringify(newHero))
      .then(data => dispatch(heroesAddItem(data)))
      .catch((err) => console.log(err))
      .finally(() => {
        setInputName('')
        setInputText('')
        setInputElement('')
      })
  }

  const renderFilters = (filters, status) => {
    if (status === 'loading') {
      return <option>Загрузка элементов</option>
    } else if (status === "error") {
      return <option>Ошибка загрузки</option>
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === 'all') return '';

        return <option key={name} value={name}>{label}</option>
      })
    }
  }

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={inputName}
          onChange={e => setInputName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">Описание</label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ "height": '130px' }}
          value={inputText}
          onChange={e => setInputText(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={inputElement}
          onChange={e => setInputElement(e.target.value)}>
          <option >Я владею элементом...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Создать</button>
    </form>
  )
}

export default HeroesAddForm;