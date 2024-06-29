import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    results: [], // Initial state for brewery search results
  };

  export const breweriesSlice = createSlice({
    name: 'breweries',
    initialState,
    reducers: {
      setSearchResults: (state, action) => {
        state.results = action.payload.results;
      },
    },
  });

export const { setSearchResults } = breweriesSlice.actions;

