import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, switchMap, map, catchError } from 'rxjs/operators';
import { AppErrorService } from 'src/app/services/app-error.service';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { LOAD_ADDRESSES_ACTION, LOAD_COUNTRIES_ACTION } from 'src/app/util/app.constants';
import { AuthService } from '../../auth/auth.service';
import { addAddressesAction, loadFailureInAccountAction, addCountriesAction } from './account.actions';
import { GeoAddressService } from 'src/app/services/geo-address.service';


@Injectable()
export class AccountEffects {
    constructor(
        private action$: Actions,
        private db: FireStoreDbService,
        private geo: GeoAddressService,
        private auth: AuthService,
        private err: AppErrorService
    ) { }


    loadAddresses$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_ADDRESSES_ACTION),
            mergeMap(() =>
                this.auth.userFromStore$
                    .pipe(
                        switchMap(user => !!user ? this.db.getAddresses(user.UID) : of(null)),
                        map(ad => addAddressesAction({ payload: ad })),
                        catchError(() => of(loadFailureInAccountAction({ error: this.err.dataFetchError() })))
                    ))
        ));

    loadCountries$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_COUNTRIES_ACTION),
            mergeMap(() => this.geo.getCountries()
                .pipe(
                    map(countries => addCountriesAction({ payload: countries })),
                    catchError(() => of(loadFailureInAccountAction({ error: this.err.dataFetchError() })))
                ))
        ));

}