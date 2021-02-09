import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { RecipModel } from '../models/recip.model';
import { UpdateCacheModel } from '../models/updateCache.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  restUrl = 'https://localhost:5001/api/';

  constructor(
    private http: HttpClient
  ) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public doUpdateCache(model: UpdateCacheModel): Observable<UpdateCacheModel> {
    return this.http.put<UpdateCacheModel>(`${this.restUrl}foodrepo/updatecache`, JSON.stringify(model), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      );
  }

  public doGetAllRecips(): Observable<RecipModel[]> {
    return this.http.get<RecipModel[]>(`${this.restUrl}food/recipes`)
      .pipe(
        retry(1),
        catchError(this.processError)
      );
  }

  public doGetRecipBy(id: number): Observable<RecipModel> {
    return this.http.get<RecipModel>(`${this.restUrl}food/recipe/${id}`)
    .pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  public doAddRecip(model: RecipModel): Observable<RecipModel> {
    return this.http.post<RecipModel>(`${this.restUrl}food/recipe`, JSON.stringify(model), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  public doUpdateRecip(id: number, model: RecipModel): Observable<RecipModel> {
    return this.http.put<RecipModel>(`${this.restUrl}food/recipe/${id}`, JSON.stringify(model), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      );
  }

  public doDeleteRecipById(id: number): Observable<RecipModel> {
    return this.http.delete<RecipModel>(`${this.restUrl}food/recipe/${id}`, this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      );
  }

  processError(err: { error: { message: string; }; status: any; message: any; }): Observable<never> {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}
