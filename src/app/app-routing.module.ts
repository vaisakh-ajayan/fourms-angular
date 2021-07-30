import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AskquestionComponent } from './askquestion/askquestion.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { MyanswersComponent } from './myanswers/myanswers.component';
import { MyquestionsComponent } from './myquestions/myquestions.component';
import { ShowquestionComponent } from './showquestion/showquestion.component';


const routes: Routes = [
  { path: '',component: HomeComponent },
  { path:'auth', component: AuthComponent },
  { path:'askquestion', component: AskquestionComponent },
  { path:'showquestion/:id', component: ShowquestionComponent },
  { path:'myquestions', component: MyquestionsComponent },
  { path:'myanswers', component: MyanswersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
