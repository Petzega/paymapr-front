import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, finalize } from 'rxjs';
import { environment } from 'src/env/env.cert';

@Injectable({
  providedIn: 'root',
})
export class TypeShared {
  
  private apiUrl = environment.apiUrl + environment.path.type;
  private personEditedSource = new Subject<void>();
  personEdited$ = this.personEditedSource.asObservable();

  public isWaiting: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getAllTypes(): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/all/tpId`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }

  getIdByDetail(tpDetalle: string): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/id-by-detail/${tpDetalle}`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }
}
