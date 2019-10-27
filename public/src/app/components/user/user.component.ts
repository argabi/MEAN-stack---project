import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  appliedJobs: any;
  modal_info: any;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.modal_info = {}
    this.getAppliedJobs();
  }

  getAppliedJobs() {
    let observable = this.http.appliedJobs();
    observable.subscribe(data => {
      this.appliedJobs = data;
    });
  }

  getModalInfo (job){
    this.modal_info = job;
    console.log(job);
    
  }

}
