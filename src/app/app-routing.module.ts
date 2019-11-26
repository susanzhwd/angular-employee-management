import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { PositionsComponent } from './positions/positions.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { EmployeeComponent } from './employee/employee.component';
import { PositionComponent } from './position/position.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/:_id', component: EmployeeComponent },
  { path: 'positions', component: PositionsComponent },
  { path: 'position/:_id', component: PositionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
