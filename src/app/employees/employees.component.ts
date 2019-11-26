import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employee[];
  filteredEmployees: Employee[]
  loadingError: boolean = false;
  private getEmployeesSub;
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmployeesSub = this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = employees;
    },
      e => {
        this.loadingError = true;
      });
  }

  routeEmployee(id: string) {
    this.router.navigate(['/employee/', id]);
  }
 
  onEmployeeSearchKeyUP(event: any){
    let substring: string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((employee) =>
      ((employee.FirstName.toLowerCase().indexOf(substring) != -1) ||
        (employee.LastName.toLowerCase().indexOf(substring) != -1) ||
        (employee.Position["PositionName"].toLowerCase().indexOf(substring) != -1)))
  }

  ngOnDestroy() {
    if (this.getEmployeesSub) {
      this.getEmployeesSub.unsubscribe();
    }
  }
}
