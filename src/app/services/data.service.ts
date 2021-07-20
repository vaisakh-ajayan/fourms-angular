import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { QuestionResponse } from '../models/questionsresponse.model'
import { exhaustMap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  //list all questions
  listQuestions(url: string){
    return this.http.get(url)
  }

  //search questions using keywords
  searchQuestions(keyword: string){
    return this.http.get('http://forum.mashuptest.com/api/question/search?keyword='+keyword)
    .pipe(
      map((response: {result: QuestionResponse})=>{
        let questions: QuestionResponse = response.result
        console.log(questions)
        return questions
      })
    )
  }

  //ask a question
  askQuestion(title: string, question: string){
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user)=>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ user.token
        })

        const body = new HttpParams().set('title', title).set('question',question)

        return this.http.post(
          'http://forum.mashuptest.com/api/question',
          body,
          {headers: headers}
        )
      })
    )
  }

  //finding specific question
  showQuestion(id: number){
    return this.http.get('http://forum.mashuptest.com/api/question/'+id)
  }

  //submit answer
  submitAnswer(answer: string, questionId: number){
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user)=>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ user.token
        })

        const body = new HttpParams().set('answer', answer)
        return this.http.post(
          'http://forum.mashuptest.com/api/question/'+questionId+'/answer',
          body,
          {headers: headers}
        )
      })
    )
  }

  //list my questions
  listMyQuestions(url: string){
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user)=>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ user.token
        })
        return this.http.get(
          url,
          {headers: headers}
        )
      }),
      map((response: {questions: QuestionResponse})=>{
        let questions: QuestionResponse = response.questions
        console.log(questions)
        return questions
      })
    )
  }

  //list answered questions
  listAnsweredQuestions(url: string){
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user)=>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ user.token
        })

        return this.http.get(
          url,
          {headers: headers}
        ).pipe(
          map((response: {questions:  QuestionResponse})=>{
            let questions : QuestionResponse = response.questions
            console.log(questions)
            return questions
          })
        )

      })
    )
  }

  //delete answer
  deleteAnswer(answerId: number){
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user)=>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ user.token
        })

        return this.http.delete(
          'http://forum.mashuptest.com/api/answer/'+answerId,
          {headers: headers}
        )
      })
    )
  }

  //delete a question
  deleteQuestion(questionId: number){
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user)=>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ user.token
        })

        return this.http.delete(
          'http://forum.mashuptest.com/api/question/'+questionId,
          {headers: headers}
        )
      })
    )
  }

  //edit question
  editQuestion(questionId: number, title: string, question: string){
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user)=>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ user.token
        })

        const body = new HttpParams()
          .set('title',title)
          .set('question', question)

        return this.http.put(
          'http://forum.mashuptest.com/api/question/'+questionId,
          body,
          {headers: headers}
        )
      })
    )
  }

  //edit answer
  editAnswer(answerId: number, answer: string){
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user)=>{
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ user.token
        })
        const body = new HttpParams().set('answer', answer)
        return this.http.put(
          'http://forum.mashuptest.com/api/answer/'+answerId,
          {headers: headers}
        )
      })
    )
  }
}
