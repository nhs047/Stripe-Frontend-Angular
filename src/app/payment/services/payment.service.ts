import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { catchError, map, retry } from "rxjs/operators";
import { IPayment } from "../models/payment.model";

@Injectable()

export class PaymentService {
    header = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
    constructor( private http: HttpClient) { }

    public createPaymentIntent = (payment: IPayment): Observable<any> =>
    this.http
    .post<any>('/Payment/CreateIntent', payment)
    .pipe(
        map(response => response),
        catchError(error => of(null))
    );

    public setupIntent = (): Observable<any> =>
    this.http
    .post<any>('/Payment/createPaymentMethods', {Email:"testaccount@yopmail.com", PaymentMethodTypes: ["card"]})
    .pipe(
        map(response => response),
        catchError(error => of(null))
    );


    public validatePaymentIntent = (clientSecret: string): Observable<any> =>
    this.http
    .post<any>('/Payment/ValidatePayment', {clientSecret})
    .pipe(
        map(response => response),
        catchError(error => of(null))
    );
}
