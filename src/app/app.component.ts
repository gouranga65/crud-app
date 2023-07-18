import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddComponent } from './component/emp-add/emp-add.component';
import { EmployeeService } from './service/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crud-app';
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'DOB',
    'gender',
    'education',
    'company',
    'experience',
    'pacakge',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService
  ) {}
  ngOnInit() {
    this.getEmployeeList();
  }
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
  getEmployeeList() {
    this._empService.getEmpList().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id: number) {
    this._empService.deleteEmp(id).subscribe({
      next: (res) => {
        // console.log('emp deleted');
        this._empService.openSnackBar('emp deleted', 'done');
        this.getEmployeeList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
