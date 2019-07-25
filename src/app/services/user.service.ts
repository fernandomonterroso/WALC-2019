import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { User } from "../models/user.model";
import { Observable } from 'rxjs';

@Injectable()
export class UserService{
    public headers = new HttpHeaders().set('Content-Type', 'application/json');
    public url: string;
    public identity;
    public token;

    constructor(public _http: HttpClient)
    {
        this.url= GLOBAL.url;
    }
    getTrak(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.get('https://walc-2019.herokuapp.com/api/track/'+id, {headers: headers})
    }
    getTraks(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.get('https://walc-2019.herokuapp.com/api/tracks', {headers: headers})
    }
    register(user: User): Observable<any>{
        let params = JSON.stringify(user);

        return this._http.post(this.url + '/registrar', params,{headers: this.headers})
    }

    getUser(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this._http.get(this.url + 'usuario/' + id, { headers: headers })
    }

    getUsers(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this._http.get(this.url+'/usuarios', {headers: headers})
    }

    login(user, gettoken2 = null): Observable<any>{
        if(gettoken2 != null){
            user.gettoken = gettoken2;
        }
        let params = JSON.stringify(user);
        console.log(params);
        
        return this._http.post(this.url + '/login', params, {headers: this.headers})
    }

    getIdentity(){
        var identity2 = JSON.parse(sessionStorage.getItem('identity'))

        if(identity2 != null){
            this.identity = identity2
        }else{
            this.identity = null;
        }

        return this.identity
    }

    getToken(){
        var token2 = sessionStorage.getItem('token');

        if(token2 != null){
            this.token = token2
        }else{
            this.token = null;
        }

        return this.token
    }

    updateUser(id,user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization', this.getToken());
      
        return this._http.put(this.url + 'editar-usuario/' + id,params, {headers: headers});
      }
}