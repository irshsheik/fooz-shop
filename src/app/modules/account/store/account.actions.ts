import { Address } from 'src/app/models/address';
import { createAction, props } from '@ngrx/store';
import { AppError } from 'src/app/models/app-error';
import {
    LOAD_ADDRESSES_ACTION, ADD_ADDRESSES_ACTION,
    ADD_ADDRESS_ACTION, UPDATE_ADDRESS_ACTION,
    DELETE_ADDRESS_ACTION,
    LOAD_FAILURE_IN_ACCOUNT_ACTION,
    LOAD_COUNTRIES_ACTION,
    ADD_COUNTRIES_ACTION
} from 'src/app/util/app.constants';
import { Country } from 'src/app/services/geo-address.service';

export const loadAddressesAction = createAction(
    LOAD_ADDRESSES_ACTION
);

export const addAddressesAction = createAction(
    ADD_ADDRESSES_ACTION,
    props<{ payload: Address[] }>()
);

export const addAddressAction = createAction(
    ADD_ADDRESS_ACTION,
    props<{ payload: Address }>()
);

export const updateAddressAction = createAction(
    UPDATE_ADDRESS_ACTION,
    props<{ payload: Address }>()
);

export const deleteAddressAction = createAction(
    DELETE_ADDRESS_ACTION,
    props<{ payload: string }>()
);

export const loadCountriesAction = createAction(
    LOAD_COUNTRIES_ACTION
);
export const addCountriesAction= createAction(
    ADD_COUNTRIES_ACTION,
    props<{payload: Country[]}>()
)

export const loadFailureInAccountAction = createAction(
    LOAD_FAILURE_IN_ACCOUNT_ACTION,
    props<{ error: AppError }>()
)
