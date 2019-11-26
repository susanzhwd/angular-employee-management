import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { EmployeeService } from '../data/employee.service';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  paramSubscription: any;
  employeeSubscription: any;
  getPositionsSubcription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private employeeService: EmployeeService, private positionService: PositionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe(params => {
      this.employeeSubscription = this.employeeService.getEmployee(params['_id']).subscribe(employee => {
        this.employee = employee[0];
        console.log(this.employee)
      });
      this.getPositionsSubcription = this.positionService.getPositions().subscribe(position => {
        this.positions = position;
      });
    });
  }

  onSubmit(f: NgForm) : void {
    this.saveEmployeeSubscription = this.employeeService.saveEmployee(this.employee).subscribe(() => {
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      }, 2500);
    }, () => {
      this.failMessage = true;
      setTimeout(() => {
        this.failMessage = false;
      }, 2500);
    });
  }

  ngOnDestroy(){
    if(this.paramSubscription){
      this.paramSubscription.unsubscribe();
    }
    if(this.employeeSubscription){
      this.employeeSubscription.unsubscribe();
    }
    if(this.getPositionsSubcription){
      this.getPositionsSubcription.unsubscribe();
    }
    if(this.saveEmployeeSubscription){
      this.saveEmployeeSubscription.unsubscribe();
    }
  }
}
