import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _recruiterRegisterUrl = '/recruiter';
  private _recruiterLoginUrl = '/recruiter/login';
  private _jobSeekerRegisterUrl = '/user';
  private _jobSeekerLoginUrl = '/user/login';
  private _adminrLoginUrl = '/admin/login';

  constructor(private http: HttpClient) { }

  registerRecruiter(user) {
    return this.http.post<any>(this._recruiterRegisterUrl, user);
  }

  loginRecruiter(user) {
    return this.http.post<any>(this._recruiterLoginUrl, user);
  }

  registerJobSeeker(user) {
    return this.http.post<any>(this._jobSeekerRegisterUrl, user);
  }

  loginJobSeeker(user) {
    return this.http.post<any>(this._jobSeekerLoginUrl, user);
  }

  loginAdmin(user) {
    return this.http.post<any>(this._adminrLoginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
