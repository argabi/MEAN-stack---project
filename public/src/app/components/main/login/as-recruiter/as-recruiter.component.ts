import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { InteractionService } from 'src/app/interaction.service';

@Component({
  selector: 'app-as-recruiter',
  templateUrl: './as-recruiter.component.html',
  styleUrls: ['./as-recruiter.component.css']
})
export class AsRecruiterComponent implements OnInit {

  recruiterData: any = {};
  msg:any
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _interactionService: InteractionService
  ) { }

  ngOnInit() {
    this.recruiterData = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      companyName: "",
      website: ""
    };
  }

  loginRecruiter() {
    this._auth.loginRecruiter(this.recruiterData)
      .subscribe(
        res => {

          if (!res.token) {
            this.msg=res
            console.log(this.msg);

            return;
          }

          this.recruiterData.password = "";
          localStorage.setItem('token', res.token);
          this._interactionService.notify(res);
          this._router.navigate(['/ownjobs']);
        },
        err => console.log(err)

      );
  }

}
