import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employee[];
  loadingError: boolean = false;
  private getEmployeesSub;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployeesSub = this.employeeService.getEmployees().subscribe(employees =>{
      this.employees = employees;
    }, 
    e => {
      this.loadingError = true;
    });
  }

  ngOnDestroy(){
    if(this.getEmployeesSub){
      this.getEmployeesSub.unsubscribe();
    }
  }
}
