import { createSelector, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredientsThunk } from './actions';

type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectItems: (state) => state.items,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки ингредиентов';
      });
  }
});

export default ingredientsSlice.reducer;

export const { selectItems, selectIsLoading, selectError } =
  ingredientsSlice.selectors;
export const selectBuns = createSelector([selectItems], (items) =>
  items.filter((item) => item.type === 'bun')
);

export const selectSauces = createSelector([selectItems], (items) =>
  items.filter((item) => item.type === 'sauce')
);

export const selectMains = createSelector([selectItems], (items) =>
  items.filter((item) => item.type === 'main')
);
