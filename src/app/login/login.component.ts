import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserAuthService } from 'src/Services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: UserAuthService, private router: Router) {
    this.loginForm = this.fb.group({
      Username: [''],
      Password: [''],
    });
  }

  onSubmit() {
    const usernameControl = this.loginForm.get('Username');
    const passwordControl = this.loginForm.get('Password');

    if (usernameControl && passwordControl) {
      const username = usernameControl.value;
      const password = passwordControl.value;

      this.authService.login(username, password).subscribe((response) => {
        if (response && response.token) {
          this.authService.storeToken(response.token);
          alert('Login Successfull');
          this.router.navigate(['welcome']);
        }
      });
    } else {
      alert('error');
    }
  }
}
