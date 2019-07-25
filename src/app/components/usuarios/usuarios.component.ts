import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';
import { GLOBAL } from '../../services/global.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UserService]
})
export class UsuariosComponent implements OnInit {
  public users: User;
  public userEdit: User;
  public status: string;
  public identity;
  public token;
  public url;
  public loading: boolean;

  constructor(private _userService: UserService) {
    this.userEdit = new User('','', '', '', '', '')
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.loading = true
  }

  ngOnInit() {
    this.listUsers()
  }

  public listUsers() {
    setTimeout(() => {
      this._userService.getUsers(this.token).subscribe(
        response => {
          if (response.usuarios) {
            console.log(response.usuarios);
            this.loading = false;
            this.users = response.usuarios;
            this.status = 'OK'
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          if (errorMessage != null) {
            Swal.fire(error.error.message)
            this.status = 'error'
          }
        }
      )
    }, 1500);
  }

  public getUser(id){
    this._userService.getUser(this.token, id).subscribe(
      response=>{
        if(response.user){
          console.log(response.user);
          this.userEdit =  response.user;
          this.status='OK';
        } 
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

}
