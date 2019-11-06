import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  employees: Employee[];
  private url = 'https://vast-atoll-38417.herokuapp.com';

   constructor(private http: HttpClient) { }
 
   getEmployees(): Observable<Employee[]>{
     return this.http.get<Employee[]>(`${this.url}/employees`)
   }

}
