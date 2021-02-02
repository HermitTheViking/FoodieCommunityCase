import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  restUrl = 'https://carwash-api.hermittheviking.dk/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/xml',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(
    private http: HttpClient
    ) { }

// TODO: do CRUD up aginst own API

}
