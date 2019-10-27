import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/interaction.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  is_login: boolean
  admin: boolean = false;
  jobSeeker: boolean = false;
  recruiter: boolean = false;
  userData: any;

  constructor(
    private _interactionService: InteractionService,
    private _http: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.is_login = false;
    } else {
      this.is_login = true;
      this.userData = localStorage;

      if (localStorage.getItem('recruiter')) {
        this.recruiter = true;
        this.jobSeeker = false;
        this.admin = false;
      } else if (localStorage.getItem('jobSeeker')) {
        this.jobSeeker = true;
        this.recruiter = false;
        this.admin = false;
      } else if (localStorage.getItem('admin')) {
        this.admin = true;
        this.recruiter = false;
        this.jobSeeker = false;
      }
    }
    this._interactionService.login$
      .subscribe(
        data => {
          this.is_login = true;
          this.userData = data;

          localStorage.setItem('first_name', data.first_name);
          localStorage.setItem('last_name', data.last_name);
          localStorage.setItem('email', data.email);
          localStorage.setItem('_id', data._id);

          if (data.jobSeeker) {
            this.jobSeeker = true;
            this.recruiter = false;
            this.admin = false;

            localStorage.setItem('gender', data.info.gender);
            localStorage.setItem('phone', data.info.phone);
            localStorage.setItem('city', data.info.city);
            localStorage.setItem('gpa', data.info.gpa);
            localStorage.setItem('university', data.info.university);
            localStorage.setItem('major', data.info.major);
            localStorage.setItem('education', data.info.education);
            localStorage.setItem('dateOfBirth', data.info.dateOfBirth);
            localStorage.setItem('jobSeeker', 'true');
          }

          if (data.recruiter) {
            this.recruiter = true;
            this.jobSeeker = false;
            this.admin = false;

            localStorage.setItem('companyName', data.companyName);
            localStorage.setItem('website', data.website);
            localStorage.setItem('recruiter', 'true');
          }

          if (data.admin) {
            this.recruiter = false;
            this.jobSeeker = false;
            this.admin = true;
            localStorage.setItem('admin', 'true');
          }
        }
      );
  }

  sign_out() {
    localStorage.clear();
    this.is_login = false;
    this.userData = {};
    this._router.navigate(['/']);

    this._http.sign_out()
      .subscribe(res => console.log(res));
  }
}
