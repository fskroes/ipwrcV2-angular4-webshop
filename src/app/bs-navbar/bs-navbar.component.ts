import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/services/employee.service';
import {EmployeeModel} from '../shared/models/employee.model';
import {LoginComponent} from '../login/login.component';
import {AuthorizationService} from '../shared/services/authorization.service';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  employee$: EmployeeModel;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthorizationService,
    private router: Router) {
    this
        .authService
        .authorized$
        .subscribe(emp => this.employee$ = emp);
    console.log('employeemodel in bs-navbar' + this.employee$);
  }

  logout() {
    this.employeeService.signout();
    this.router.navigate(['']);
  }
}
