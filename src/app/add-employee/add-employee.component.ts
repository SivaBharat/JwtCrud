import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/Models/user';
import { UserAuthService } from 'src/Services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService,
    private router: Router
  ){this.createForm();}
  
  createForm() {
    this.employeeForm = this.formBuilder.group({
      EmpName: ['', Validators.required],
      EmpDept: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      this.userAuthService.addEmployee(employee).subscribe(
        (response) => {
          alert('Employee added successfully');
          this.router.navigate(['welcome']);
          console.log('Employee added successfully', response);
        },
        (error) => {
          console.error('Error adding employee', error);
        }
      );
    }
  }
}
