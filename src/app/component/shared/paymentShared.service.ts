import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentShared {
  private apiUrl = 'http://localhost:8080/owner/payment';
  private paymentEditedSource = new Subject<void>();
  paymentEdited$ = this.paymentEditedSource.asObservable();

  public isWaiting: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  payment: any[] = [];
  pagoId: string = '';

  getAllPayments(): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/all/pagoId`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }

  notifyTableEdited() {
    this.paymentEditedSource.next();
  }

  savePayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save/null`, JSON.stringify(paymentData), this.httpOptions);
  }
}
