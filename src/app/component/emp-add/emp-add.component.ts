import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.scss'],
})
export class EmpAddComponent {
  empForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      DOB: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      pacakge: '',
    });
  }
  ngOnInit() {
    this.empForm.patchValue(this.data);
  }
  education: string[] = [
    'matric',
    'intermediate',
    'diploma',
    'graduate',
    'post graduate ',
  ];
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmp(this.data.id, this.empForm.value).subscribe({
          next: (value: any) => {
            // console.log('emp updated');
            this._empService.openSnackBar('employee updated', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (value: any) => {
            // console.log('emp added');
            this._empService.openSnackBar('employee added', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
