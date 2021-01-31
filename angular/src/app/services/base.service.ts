import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface HttpOptions {
  headers: HttpHeaders;
  params: HttpParams;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  interval: any;

  constructor(
    private http: HttpClient,
  ) { }

  private getHttpOptions(params?: HttpParams, body?: any, url?: string, sessionRequired?: boolean): HttpOptions {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Content-Type': 'application/json',
      'x-hrp-client-id': 'kwsp.eip'
    });

    return { headers, params };
  }
  
  private handleSuccess(r: any): any {
    if (r.status && typeof r.status === 'number' && r.status !== 200) {
      this.catchError(r);
    } else {
      return r.responseBody ? r.responseBody : r;
    }
  }

  public get(url: string, params?: HttpParams, sessionRequired?: boolean): Observable<any> {
    return this.http.get(url, this.getHttpOptions(params, null, null, sessionRequired))
      .pipe(
        map((r: Response) => this.handleSuccess(r)),
        catchError((e: any) => this.catchError(e))
      );
  }

  public post(url: string, body: any, params?: HttpParams): Observable<any> {
    return this.http.post(url, body, this.getHttpOptions(params, body, url))
      .pipe(
        map((r: Response) => this.handleSuccess(r)),
        catchError((e: any) => this.catchError(e))
      );
  }

  public put(url: string, body: any, params?: HttpParams): Observable<any> {
    return this.http.put(url, body, this.getHttpOptions(params, body, url))
      .pipe(
        map((r: Response) => this.handleSuccess(r)),
        catchError((e: any) => this.catchError(e))
      );
  }

  public delete(url: string, params?: HttpParams): Observable<any> {
    return this.http.delete(url, this.getHttpOptions(params))
      .pipe(
        map((r: Response) => this.handleSuccess(r)),
        catchError((e: any) => this.catchError(e))
      );
  }

  private catchError(e: any): any {
    this.handleError(e);
    return e;
  }

  private handleError(e: ErrorResponse): void {
    if (e.status === HttpStatusConstant.INTERNAL_SERVER_ERROR_500) {
      e.error.title = "dialog.error"
    }

    if (e.status === HttpStatusConstant.DUPLICATE_LOGIN) {
      e.error = { ...new Error(), status: e.status, title: "dialog.duplicate" };
    } else if (typeof e.error === 'string') {
      e.error = { ...new Error(), status: e.status, title: e.error };
    }

    throw e;
  }
}

export class ErrorResponse {
  headers: HttpHeaders = new HttpHeaders();
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error = new Error();
}

export class Error {
  status: number;
  title: string;
  detail: string;
  message: string;
  path: string;
  type: string;
}

export const HttpStatusConstant = {
  CONNECTION_ERROR_0: 0,
  OK_200: 200,
  PERMANENT_REDIRECT_308: 308,
  UNAUTHORIZED_401: 401,
  NOT_FOUND_404: 404,
  DUPLICATE_LOGIN: 480,
  INTERNAL_SERVER_ERROR_500: 500,
  SERVICE_UNAVAILABLE_503: 503
};