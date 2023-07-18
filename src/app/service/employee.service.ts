import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient, private _snackBar: MatSnackBar) {}
  addEmployee(data: any): Observable<any> {
    return this._http.post(' http://localhost:3000/employee', data);
  }
  updateEmp(id: number, data: any): Observable<any> {
    return this._http.put(` http://localhost:3000/employee/${id}`, data);
  }
  getEmpList(): Observable<any> {
    return this._http.get('http://localhost:3000/employee');
  }
  deleteEmp(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employee/${id}`);
  }
  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
