import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'welcome/add',component:AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
