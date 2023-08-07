import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  title = "Enter your username & password"
  hide = true;
  loginForm: FormGroup;
  email = 'sundar'
  password = 'sundar'
  
  constructor(private lf: FormBuilder, private route: Router, private empservice: EmployeeService){
    this.loginForm = this.lf.group({
      email: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })
  }



  login(){
    if(this.loginForm.value.email === this.email && this.loginForm.value.password === this.password){
      this.route.navigate(['admin']);
    }else{
      this.empservice.openSnackBar('User not found');
    }
  }
  
}
