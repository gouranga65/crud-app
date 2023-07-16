import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddComponent } from './component/emp-add/emp-add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crud-app';
  constructor(private _dialog: MatDialog) {}
  openAddEditEmpForm(){
    this._dialog.open(EmpAddComponent)
  }
}
