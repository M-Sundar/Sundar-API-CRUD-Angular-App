import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from '../userprofile.model';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  title = "Registration Form";
  hide = true;
  //panelColor = new FormControl('red');
  public userIdtoUpdate!: number;
  public updateActive: boolean = false;

  public regForm!: FormGroup;

  constructor(private rf: FormBuilder, private empservice: EmployeeService, private activeRoute: ActivatedRoute, private route: Router){
    this.regForm = this.rf.group({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern('[0-9]*')]),
      color: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(val => {
      this.userIdtoUpdate = val['id'];
      if (this.userIdtoUpdate){
        this.updateActive = true;
      this.empservice.getUserId(this.userIdtoUpdate).subscribe(res => {
        this.updateActive = true;
        this.patchform(res);
      })
    }
    })
  }

  patchform(user: UserProfile){
    this.regForm.setValue({
      name: user.name,
      age: user.age,
      color: user.color,
    })
  }

  update(){
    this.empservice.update(this.regForm.value, this.userIdtoUpdate)
      .subscribe(res => {
        this.route.navigate(['admin']);
        this.empservice.openSnackBar('Employee updated successfully');
        //this.regForm.reset();
      });
  }

  onSubmit() {
    if(this.regForm.valid){
      console.log(this.regForm.value);
      this.empservice.addEmployee(this.regForm.value).subscribe({
              next: () => {
                this.empservice.openSnackBar('Employee added successfully');
                this.regForm.reset(true);                
              },
              error: (err: any) => {
                console.log(err);
              },
             });
      }
    }



}
