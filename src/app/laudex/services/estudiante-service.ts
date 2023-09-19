import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EstudianteService {
    constructor(
        private http: HttpClient
    ) { }

    private url: string = `${environment.api}`;

    create(request: any) {
        return this.http.post(`${this.url}create`, request, {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                })
        }).pipe(
            catchError(async (err) => {

                const error = err.error?.msg || err.statusText;
                console.error("ERROR ::: ", err);
                return throwError(() => error);
            })
        );
    }

    update(id: string, request: any) {
        return this.http.put(`${this.url}updateById?id=${id}`, request, {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                })
        }).pipe(
            catchError(async (err) => {

                const error = err.error?.msg || err.statusText;
                console.error("ERROR ::: ", err);
                return throwError(() => error);
            })
        );
    }

    getAll() {
        var response = this.http.get<any[]>(`${this.url}getAll`).pipe(
            map(res => {
                console.log(res);
                return res
            }),
            catchError(async (err) => {

                const error = err.error?.msg || err.statusText;
                console.error("ERROR ::: ", err);
                return throwError(() => error);
            })
        );
        return response;
    }

    getById(id: any) {
        const opciones = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.get(`${this.url}getById?id=${id}`, opciones).pipe(
            map(res => {
                console.log(res);
                return res
            }),
            catchError(async (err) => {

                const error = err.error?.msg || err.statusText;
                console.error("ERROR ::: ", err);
                return throwError(() => error);
            })
        );
    }

    delete(id: any) {
        const opciones = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.delete(`${this.url}deleteById/${id}`, opciones).pipe(
            map(res => {
                console.log(res);
                return res
            }),
            catchError(async (err) => {

                const error = err.error?.msg || err.statusText;
                console.error("ERROR ::: ", err);
                return throwError(() => error);
            })
        );
    }
}