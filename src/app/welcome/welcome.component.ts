import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { UserAuthService } from 'src/Services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  username!: string;
  employees: any[] = [];
  editedRecord: any = null;

  constructor(private authService: UserAuthService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.decodeToken();
    this.getEmployees();
  }

  decodeToken() {
    const token = this.authService.getToken();
    console.log('Token from local storage:', token);

    if (token) {
      const decodedToken: any = jwt_decode(token);
      console.log('Decoded Token:', decodedToken);
      this.username = decodedToken.nameid;
      console.log('Username:', this.username);
    }
  }

  getEmployees() {
    this.authService.getEmployees().subscribe(
      (data: any[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
        alert('Error occured during fetching the datas')
      }
    );
  }

  deleteEmployee(employeeId: number) {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      this.authService.deleteEmployee(employeeId).subscribe(
        () => {
          this.employees = this.employees.filter((employee) => employee.empId !== employeeId);
          console.log('Employee deleted successfully');
        },
        (error) => {
          console.error('Error deleting employee', error);
        }
      );
    }
  }

  editRecord(record: any) {
    this.editedRecord = { ...record };
  }

  updateRecord() {
    if (this.editedRecord) {
      const empId = this.editedRecord.empId;
      this.http.put(`https://localhost:7166/api/Employees/${empId}`, this.editedRecord)
        .subscribe(() => {
          const index = this.employees.findIndex((r) => r.empId === empId);
          if (index !== -1) {
            this.employees[index] = this.editedRecord;
          }
          alert('Saved successfully');
          this.editedRecord = null;
        });
    }
  }

  logout() {
    this.router.navigate(['']);
    return this.authService.logout();
  }
}
