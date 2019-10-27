import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/interaction.service';

@Component({
  selector: 'app-as-user',
  templateUrl: './as-user.component.html',
  styleUrls: ['./as-user.component.css']
})
export class AsUserComponent implements OnInit {

  jobSeekerData: any = {};
  msg:any
  msgif:boolean=false
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _interactionService: InteractionService
  ) { }

  ngOnInit() {
    this.jobSeekerData = {
      email: "",
      password: "",
    };
  }

  loginJobSeeker() {

    this._auth.loginJobSeeker(this.jobSeekerData)
      .subscribe(
        res => {

          if (!res.token) {
            this.msg=res
            this.msgif=true
            console.log(res);
            return;
          }

          this.jobSeekerData.password = "";
          localStorage.setItem('token', res.token);
          this._interactionService.notify(res);
          this._router.navigate(['/displayjobs']);
        },
        err => console.log(err)

      );
  }
}
