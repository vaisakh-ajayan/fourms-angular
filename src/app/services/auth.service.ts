import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject(null)
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  })

  constructor(private http: HttpClient, private router: Router) { }

  signUp(name: string, email:string, password: string, cnfpassword: string){
    return this.http.post('http://forum.mashuptest.com/api/register',{
      name: name,
      email: email,
      password: password,
      password_confirmation: cnfpassword
    })
  }

  login(email: string, password: string){
    const body = new HttpParams().set('email',email).set('password',password)

    return this.http.post<User>(
      'http://forum.mashuptest.com/api/login',
      body.toString,
      {headers: this.headers}
    )
    .pipe(
      tap((event)=>{
        const loginResp = {
          token: event.token,
          user: {
            id: event.user.id,
            name: event.user.name,
            email: event.user.email,
            createdAt: event.user.createdAt, //else try created_at
            updatedAt: event.user.updatedAt,
          }
        }
        localStorage.setItem('user',JSON.stringify(loginResp))
        this.user.next(loginResp)
      })
    )
  }

  logout(){
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('user')
  }

  autoLogin(){
    const userdet: User = JSON.parse(localStorage.getItem('user'))
    if (!userdet) {
      this.user.next(null)
      return
    }
    else{
      this.user.next(userdet)
      return true
    }
  }
}
