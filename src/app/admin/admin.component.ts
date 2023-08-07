import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'color', 'action'];
  dataSource!: MatTableDataSource<any>;

  title = "Employee Engagement Software";
  constructor(private empservice: EmployeeService, private route: Router) {}

  ngOnInit(): void {
    this.employeeList();
  }

  employeeList(){
    this.empservice.getEmployee().subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value);
      },
      error: console.log     
    })
  }

  delete(id: any){
    this.empservice.openConfirm('Are you sure to delete?').afterClosed().subscribe(res => {
      if (res) {
        this.empservice.delete(id).subscribe({
          next: () => {
            this.empservice.openSnackBar('Employee deleted successfully');
            this.employeeList();
          }
        })
      }
    })
  }

  editEmp(id: any){
    this.route.navigate(['registration-form', id]);
  }


}
