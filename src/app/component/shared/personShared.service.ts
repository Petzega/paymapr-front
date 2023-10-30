import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonShared {
  private apiUrl = 'http://localhost:8080/owner/person';
  // private apiUrl = 'https://ms-person.fly.dev/owner/person';
  private personEditedSource = new Subject<void>();
  personEdited$ = this.personEditedSource.asObservable();

  public isWaiting: boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  person: any[] = [];
  perId: string = '';

  getAllItems(): Observable<any[]> {
    this.isWaiting = true;
    return this.http.get<any[]>(`${this.apiUrl}/all/perId`, this.httpOptions)
    .pipe(
      finalize(() => {
        this.isWaiting = false;
      })
    );
  }

  getItemById(perId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/find/perId/${perId}`, this.httpOptions);
  }
  
  updatePersona(perId: string, personaData: any): Observable<any> {
    const url = `${this.apiUrl}/save/${perId}`;
    return this.http.post(url, personaData, this.httpOptions);
  }

  notifyTableEdited() {
    this.personEditedSource.next();
  }

  savePerson(personData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save/null`, JSON.stringify(personData), this.httpOptions);
  }

  dropPersonById(perId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/delete/perId/${perId}`, this.httpOptions);
  }
}
