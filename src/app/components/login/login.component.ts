import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: User
  public status;
  public token;
  public identity;

  constructor(private _userService: UserService, private _router: Router) {
    this.user = new User('','', '', '', '', '')    
  }

  ngOnInit() {
  }

  public clean() {
    this.user = new User('','', '', '', '', '')
  }

  public getToken() {
    this._userService.login(this.user, 'true').subscribe(
      response=>{
        this.token = JSON.stringify(response.token);   
        console.log('este es el token -- ' + this.token);
             
        if(this.token.length <= 0){
          this.status = 'error'
        }else{
          sessionStorage.setItem('token', this.token);
          this._router.navigate(['/homeLoged']);         
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }    

  public login() {    
      this._userService.login(this.user).subscribe(
        response => {
          this.identity = response.user;               
          if(!this.identity){            
            this.status = 'error';
          }else{
            sessionStorage.setItem('identity', JSON.stringify(this.identity));
            this.getToken();            
            this.status = 'ok';            
                      
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {            
            this.status = 'error';
            this.clean()
          }
        }
      )    
  }

}
