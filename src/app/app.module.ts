import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ListitemComponent } from './listitem/listitem.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { AskquestionComponent } from './askquestion/askquestion.component';
import { HttpClientModule } from '@angular/common/http';
import { EditanswerComponent } from './editanswer/editanswer.component';
import { EditquestionComponent } from './editquestion/editquestion.component';
import { MyanswersComponent } from './myanswers/myanswers.component';
import { MyquestionsComponent } from './myquestions/myquestions.component';
import { ShowquestionComponent } from './showquestion/showquestion.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    ListitemComponent,
    HomeComponent,
    AuthComponent,
    AskquestionComponent,
    EditanswerComponent,
    EditquestionComponent,
    MyanswersComponent,
    MyquestionsComponent,
    ShowquestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
