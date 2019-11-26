import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { EmployeeRaw } from './employeeRaw';

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

   saveEmployee(employee: EmployeeRaw) : Observable<any>{
     return this.http.put<any>(this.url + '/employee/' + employee._id, employee);
   }

   getEmployee(id): Observable<EmployeeRaw[]>{
     return this.http.get<EmployeeRaw[]>(this.url + '/employee-raw/' + id);
   }
}
