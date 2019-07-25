import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UserService]
})
export class RegistroComponent implements OnInit {
  public user: User;
  public status;  

  constructor(private _userService: UserService, private _router: Router) {
    this.user = new User('', '', '', '', '', '');        
  }

  ngOnInit() {
  }

  public clean() {
    this.user = new User('', '', '', '', '', '');
  }


  public register() {
    this._userService.register(this.user).subscribe(
      response => {
        if (response) {
          console.log(response)
          this.status = 'OK'
          if(response.message != 'Rellene todos los datos necesarios'){
            Swal.fire({
              text: response.message,            
              type: 'success'
            })
            this._router.navigate(['/login']);
            this.clean()
          }else{
            Swal.fire({
              text: response.message,            
              type: 'error'
            })
          }
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error'
          this.clean()
        }
      }
    )
  }

}
