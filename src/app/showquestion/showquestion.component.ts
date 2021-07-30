import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Question } from '../models/question.model'

@Component({
  selector: 'app-showquestion',
  templateUrl: './showquestion.component.html',
  styleUrls: ['./showquestion.component.css']
})
export class ShowquestionComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  isLoggedIn: boolean=false;
  userId: number;
  questionId: number;
  isLoading: boolean=false;
  questionData: Question;
  editQuestion: boolean=false;
  editAnswer: boolean = false;
  editAnserValue: string; //existing ans
  editAnswerId: number;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user)=>{
      if (user===null) {
        this.isLoggedIn = false;
      }
      else{
        this.userId = user.user.id;
        this.isLoggedIn = true;
      }
    })
    this.questionId = this.route.snapshot.params['id'];
    this.fetchQuestion(this.questionId);
  }

  //submit answer to question
  //data is 'form.data' and answerForm is NgForm has which resetForm() method to reset the form
  onSubmitAnswer(data, answerForm: NgForm){
    this.dataService.submitAnswer(data.answer, this.questionId).subscribe((response)=>{
      //
      this.fetchQuestion(this.questionId);
      //reset the form
      answerForm.resetForm();
    })
  }
  //to fetch the details about the question with the id which has been sent via the url
  fetchQuestion(id){
    this.isLoading = true;
    this.dataService.showQuestion(id).subscribe((responseData:Question)=>{ //may b remove
      this.isLoading = false;
      this.questionData = responseData
    })
    this.editQuestion = false;
    this.editAnswer = false;
  }

  //on destroying component
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  //
  deleteAnswer(id: number){
    this.dataService.deleteAnswer(id).subscribe((response)=>{
      this.fetchQuestion(this.questionId);
    })
  }

  //
  deleteQuestion(id: number){
    this.dataService.deleteQuestion(id).subscribe((response)=>{
      this.router.navigate['/'];
    })
  }

  //conditionally render editQuestion
  showEditQuestionModal(){
    this.editQuestion = !this.editQuestion;
  }

  //conditionally render edit answer
  showEditAnswerModal(answer: string, id: number){
    this.editAnswer = !this.editAnswer;
    this.editAnserValue = answer;
    this.editAnswerId = id;
  }

}
