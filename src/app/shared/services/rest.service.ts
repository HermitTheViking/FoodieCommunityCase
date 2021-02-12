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

  public doUpdateCache(model: UpdateCacheModel): void {
    this.http.put<UpdateCacheModel>(`${this.restUrl}foodrepo/updatecache`, JSON.stringify(model), this.httpHeader)
      .subscribe(
        () => { },
        (error) => {
          console.log(error);
          this.processError(error);
        }
      );
  }

  public doGetAllRecips(): Observable<RecipModel[]> {
    return this.http.get<RecipModel[]>(`${this.restUrl}food/recipes`)
      .pipe(
        retry(1),
        catchError(this.processError)
      );
  }

  public doGetRecipById(id: number): Observable<RecipModel> {
    return this.http.get<RecipModel>(`${this.restUrl}food/recip/${id}`)
    .pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  public doAddRecip(model: RecipModel): void {
    this.http.post<RecipModel>(`${this.restUrl}food/recip`, JSON.stringify(model), this.httpHeader)
    .subscribe(
      () => { },
      (error) => {
        console.log(error);
        this.processError(error);
      }
    );
  }

  public doUpdateRecip(id: number, model: RecipModel): void {
    this.http.put<RecipModel>(`${this.restUrl}food/recip/${id}`, JSON.stringify(model), this.httpHeader)
      .subscribe(
        () => { },
        (error) => {
          console.log(error);
          this.processError(error);
        }
      );
  }

  public doDeleteRecipById(id: number): void {
    this.http.delete<RecipModel>(`${this.restUrl}food/recip/${id}`, this.httpHeader)
      .subscribe(
        () => { },
        (error) => {
          console.log(error);
          this.processError(error);
        }
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
