import { Component, OnInit } from '@angular/core';
import { ListItem } from '../models/listitem.model';
import { QuestionResponse } from '../models/questionsresponse.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-myquestions',
  templateUrl: './myquestions.component.html',
  styleUrls: ['./myquestions.component.css']
})
export class MyquestionsComponent implements OnInit {
  listQuestions: ListItem[]=[];
  questionResponse: QuestionResponse;
  isLoggedIn: boolean=false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.listMyQuestions(
      'http://forum.mashuptest.com/api/question/my-questions'
    ).subscribe((responseData: QuestionResponse)=>{
      this.listQuestions=responseData.data;
      this.questionResponse=responseData;
      console.log(responseData);
    })
  }

  fetchPaginatedResult(page: number){
    this.dataService.listMyQuestions(
      'http://forum.mashuptest.com/api/question/my-questions?page=' + page
    )
    .subscribe((responseData: QuestionResponse)=>{
      this.listQuestions=responseData.data;
      this.questionResponse=responseData;
    })
  }

}
