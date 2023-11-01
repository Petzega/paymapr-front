import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MethodShared {
  // private apiUrl = 'http://localhost:8080/owner/payment-method';
  private apiUrl = 'https://ms-person.fly.dev/owner/payment-method';
  private personEditedSource = new Subject<void>();
  personEdited$ = this.personEditedSource.asObservable();

  public isWaiting: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  mpId: string = '';

  getAllSubcategories(): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/all/mpId`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }

  getAllMethodsByTypes(tpId: string): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/by-type/${tpId}`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }

  getSubcatById(mpId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/mpId/${mpId}`, this.httpOptions);
  }

  getIdByDetail(mpDetalle: string): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/id-by-detail/${mpDetalle}`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }
}
