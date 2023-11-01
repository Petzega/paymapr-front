import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryShared {
  // private apiUrl = 'http://localhost:8080/owner/payment-category';
  private apiUrl = 'https://ms-person.fly.dev/owner/payment-category';
  private personEditedSource = new Subject<void>();
  personEdited$ = this.personEditedSource.asObservable();

  public isWaiting: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/all/cpId`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }

  getIdByDetail(cpDetalle: string): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/id-by-detail/${cpDetalle}`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }
}
