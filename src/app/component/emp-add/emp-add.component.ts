import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Food } from 'type';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.scss'],
})
export class EmpAddComponent {
  empForm: FormGroup;
  constructor(private _fb: FormBuilder) {
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
  education: string[] = [
    'matric',
    'intermediate',
    'diploma',
    'graduate',
    'post graduate ',
  ];
  onFormSubmit(){
    if (this.empForm.valid) {
      console.log(this.empForm.value);
      
    }
  }
}
