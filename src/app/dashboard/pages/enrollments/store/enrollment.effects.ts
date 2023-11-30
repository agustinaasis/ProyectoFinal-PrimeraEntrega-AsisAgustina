import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { Enrollment } from '../models';


@Injectable()
export class EnrollmentEffects {

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>

        this.getEnrollments().pipe(

          map(data => EnrollmentActions.loadEnrollmentsSuccess({ data })),

          catchError(error => of(EnrollmentActions.loadEnrollmentsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private httClient: HttpClient) {}

  
  getEnrollments(): Observable<Enrollment[]> {
    return this.httClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments?_expand=course&_expand=user`)
  }



}