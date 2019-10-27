import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service'
import { AuthService } from 'src/app/auth.service';
import { InteractionService } from 'src/app/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  recruiters: any
  selectedRec: any
  logged_in: boolean = false;
  admin_data: any;

  constructor(
    private http: HttpService,
    private _auth: AuthService,
    private _interactionService: InteractionService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.selectedRec = { _id: "", active: "" };
    this.admin_data = { email: "", password: "" };

    if (localStorage.getItem('token')) {
      this.getRec();
      this.logged_in = true;
    }
  }

  login() {
    this._auth.loginAdmin(this.admin_data)
      .subscribe(
        res => {

          if (!res.token) {
            console.log(res);
            return;
          }

          this.admin_data.password = "";
          localStorage.setItem('token', res.token);
          this._interactionService.notify(res);
          this.getRec();
          this.logged_in = true;
          this._router.navigate(['/admin']);
        },
        err => console.log(err)

      );
  }

  //Getting All Recruiters
  getRec() {
    let observable = this.http.getRecruiters();
    observable.subscribe(data => {
      this.recruiters = data;
    });
  }

  updateRecStatus(recruiter) {

    this.selectedRec = {
      _id: recruiter._id,
      active: !recruiter.active
    };

    let observable = this.http.ActivateRec(this.selectedRec);
    observable.subscribe((data: any) => {
    });
  }
}
