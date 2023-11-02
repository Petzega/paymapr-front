import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, finalize } from 'rxjs';
import { environment } from 'src/env/env.cert';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryShared {
  
  private apiUrl = environment.apiUrl + environment.path.subcategory;
  private personEditedSource = new Subject<void>();
  personEdited$ = this.personEditedSource.asObservable();

  public isWaiting: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  cpId: string = '';

  getAllSubcategories(): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/all/spId`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }

  getAllSubcategoriesByCategory(cpId: string): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/by-category/${cpId}`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }

  getSubcatById(spId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/spId/${spId}`, this.httpOptions);
  }

  getIdByDetail(spDetalle: string): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/id-by-detail/${spDetalle}`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }
}
