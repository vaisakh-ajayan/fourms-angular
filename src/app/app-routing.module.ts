import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AskquestionComponent } from './askquestion/askquestion.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '',component: HomeComponent },
  { path:'auth', component: AuthComponent },
  { path:'askquestion', component: AskquestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
