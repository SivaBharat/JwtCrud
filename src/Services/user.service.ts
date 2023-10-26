import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, TokenDetails } from 'src/Models/user';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private loginUrl = 'https://localhost:7166/api/Auth/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const user = { UserName: username, Password: password };
    return this.http.post(this.loginUrl, user);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  renewToken(tokenApi: TokenDetails) {
    return this.http.post<any>(this.loginUrl + '/Refresh', tokenApi)
  }

  storeRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(environment.employee);
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(environment.employee, employee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(environment.employee + `/${employeeId}`);
  }

}
