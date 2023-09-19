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
        return this.http.post(`${this.url}Colaborador/Create`, request, {
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
        return this.http.put(`${this.url}Colaborador/Update/${id}`, request, {
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
        var response = this.http.get<any[]>("../../assets/estudiantes/estudiantes.json");
        return response;
    }

    getById(id: any) {
        const opciones = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.get(`${this.url}Colaborador/GetColaboradores/${id}`, opciones).pipe(
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

        return this.http.delete(`${this.url}Colaborador/GetColaboradores/${id}`, opciones).pipe(
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