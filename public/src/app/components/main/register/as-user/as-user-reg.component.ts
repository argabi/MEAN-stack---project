import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/interaction.service';

@Component({
  selector: 'app-as-user_reg',
  templateUrl: './as-user.component.html',
  styleUrls: ['./as-user.component.css']
})
export class AsUserRegComponent implements OnInit {

  registerJobSeekerData: any = {};
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _interactionService: InteractionService
  ) { }

  ngOnInit() {
    this.registerJobSeekerData = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  }

  registerJobSeeker() {
    this._auth.registerJobSeeker(this.registerJobSeekerData)
      .subscribe(
        res => {
          if (!res.token) {
            console.log(res.token);
            return;
          }

          this.registerJobSeekerData.password = "";
          localStorage.setItem('token', res.token);
          this._interactionService.notify(res);
          this._router.navigate(['/findjob']);
        },
        err => console.log(err)
      );
  }

}
