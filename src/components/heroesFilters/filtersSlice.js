import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook"

const initialState = {
  filtersLoadingStatus: 'idle',
  filters: [],
  activeFilter: 'all',
}

export const fetchFilters = createAsyncThunk(
  'heroes/fetchFilters',
  async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/filters")
  }
)

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => { state.activeFilter = action.payload }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading' })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = 'idle'
        state.filters = action.payload
      })
      .addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error' })
  }
})

const { actions, reducer } = filtersSlice

export default reducer
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = actions