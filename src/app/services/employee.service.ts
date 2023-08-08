import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../userprofile.model';
import { Observable, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public user!: Observable<UserProfile | null>;

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  addEmployee(data: any): Observable<any> {
    return this.http.post('https://crudcrud.com/api/1f131474efcc4cfeb586367b86db7cc8/resource/', data);
   }

   getEmployee(): Observable<any>{
    return this.http.get('https://crudcrud.com/api/1f131474efcc4cfeb586367b86db7cc8/resource/');
   }

   delete(id: any): Observable<any>{
    return this.http.delete(`https://crudcrud.com/api/1f131474efcc4cfeb586367b86db7cc8/resource/${id}`);
   }

   update(data: UserProfile, id: number): Observable<any>{
    return this.http.put<UserProfile>(`https://crudcrud.com/api/1f131474efcc4cfeb586367b86db7cc8/resource/${id}`, data);
   }

   getUserId(id: any){
    return this.http.get<UserProfile>(`https://crudcrud.com/api/1f131474efcc4cfeb586367b86db7cc8/resource/${id}`);
   }

   openSnackBar(msg: string, action: string = 'Ok'){
    this.snackbar.open(msg, action, {
      duration: 5000,
      verticalPosition: 'top',
    })
   }
   
   openConfirm(msg: any){
    return this.dialog.open(DialogBoxComponent, {
      width: '300px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: '10px'},
      data: {
        message: msg
      }
    })
   }

}
