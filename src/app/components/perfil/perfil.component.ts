import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/uploads.service';
import { GLOBAL } from 'src/app/services/global.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UserService,UploadService]
})
export class PerfilComponent implements OnInit {
  public users: User
  public user: User  
  public url;
  public identity;
  public token;
  public status;
  public filesToUpload: Array<File>;
  public subirImege = false;

  constructor(private _userService: UserService, private _uploadService: UploadService) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User('', '', '', '', '', '')    
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }

  updateUser() {
    this._userService.updateUser(this.identity._id, this.identity).subscribe(
      response => {
        console.log(this.identity)
        console.log(response.user)
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'ok';

          sessionStorage.setItem('identity', JSON.stringify(this.identity));

          if (this.subirImege == true) {
            //SUBIR LA IMAGEN DEL CONTACTO          
            this._uploadService.makeFirileRequest(this.url + '/subir-imagen-usuario/' + this.identity._id, [], this.filesToUpload, this.token, 'image')
              .then((result: any) => {
                console.log(result);
                this.identity.image = result.user.image;
                sessionStorage.setItem('identity', JSON.stringify(this.identity));
              });
          } else {

          }
        }
        // this.listarContactos();
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  fileChangeEvent(fileInput: any) {
    this.subirImege = true;
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
