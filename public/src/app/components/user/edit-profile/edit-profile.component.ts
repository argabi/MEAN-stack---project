import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any;
  updated: any;
  fileToUpload: File = null;

  constructor(
    private http: HttpService,
    private _router: Router
  ) {

  }
  ngOnInit() {
    this.user = localStorage;
  }

  updateUser() {
    let observable = this.http.updateUser(this.user);
    observable.subscribe(res => {
      console.log(res);

      this._router.navigate(['/editprofile']);
    });
  }

  handleFileInput(event) {
    console.log(event.target.files[0]);
    this.http.postFile(event.target.files[0]).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log(error);
    });

    // this.fileToUpload = event.target.files[0];
    // this.uploadFileToActivity();
  }

  uploadFileToActivity() {

  }
}
