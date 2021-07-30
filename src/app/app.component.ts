import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private userSub: Subscription;
  isLoggedIn=null;
  constructor(private authService: AuthService){}

  ngOnInit(): void{
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user)=>{
      if (user===null) {
        this.isLoggedIn=false;
      }
      else{
        this.isLoggedIn=true;
      }
    })
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout()
  }
}
