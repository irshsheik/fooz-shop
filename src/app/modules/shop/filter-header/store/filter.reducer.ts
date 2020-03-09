import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { fetchAllCategories, selectCategory, selectSize, fetchAllSizes, fetchAllSortOrders, selectSortOrder } from './filter.action';
import { createReducer, on, Action } from '@ngrx/store';

import { cloneDeep } from 'lodash';
import { Sort } from 'src/app/models/Sort';



export interface State {
    categories: Category[];
    selectedCategory: Category;
    sizes: Size[];
    selectedSize: Size;
    sortOrders: Sort[];
    selectedSortOrder: Sort;
}

export const initialState: State = {
    categories: [],
    selectedCategory: null,
    sizes: [],
    selectedSize: null,
    sortOrders: [],
    selectedSortOrder: null
};

const filterReducer = createReducer(
    initialState,
    on(fetchAllCategories, (currentState, { payload }) => ({
        ...currentState,
        categories: [...payload]
    })),
    on(selectCategory, (currentState, { payload }) => ({
        ...currentState,
        selectedCategory: cloneDeep(payload)
    })),
    on(fetchAllSizes, (currentState, { payload }) => ({
        ...currentState,
        sizes: [...payload]
    })),
    on(selectSize, (currentState, { payload }) => ({
        ...currentState,
        selectedSize: cloneDeep(payload)
    })),
    on(fetchAllSortOrders, (currentState, { payload }) => ({
        ...currentState,
        sortOrders: [...payload]
    })),
    on(selectSortOrder, (currentState, { payload }) => ({
        ...currentState,
        selectedSortOrder: cloneDeep(payload)
    }))

);

export function FilterReducer(state: State = initialState, action: Action) {
    return filterReducer(state, action);
}
