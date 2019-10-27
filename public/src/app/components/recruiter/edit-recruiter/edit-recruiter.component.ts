import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service'

@Component({
  selector: 'app-edit-recruiter',
  templateUrl: './edit-recruiter.component.html',
  styleUrls: ['./edit-recruiter.component.css']
})
export class EditRecruiterComponent implements OnInit {
  recruiter: any;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.recruiter = localStorage;

  }

  updateRecruiter() {
    console.log(this.recruiter);

    let observable = this.http.updateRecruitersById(this.recruiter);
    observable.subscribe(res => { console.log("111", res) });
    //test
  }
}
