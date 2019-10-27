import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  jobs: any;
  jobData: any;
  isRecruiter: boolean;
  searchText: any;
  City: any;
  lvl: any;
  field: any;
  modal_info: any;


  constructor(
    private http: HttpService,
    private _router: Router,
  ) {

  }

  ngOnInit() {
    this.modal_info = {}
    this.jobData = {
      _id: ""
    };

    this.getJobs();
  }

  getJobs() {
    let observable = this.http.getJobs();
    observable.subscribe(data => {
      this.jobs = data;

      if (localStorage.getItem('recruiter')) {
        this.isRecruiter = true;
      }
    });
  }

  userApplied(job) {
    if (!localStorage.getItem('token')) {
      return this._router.navigate(['/login']);
    }

    let observable = this.http.userApplied(job);
    observable.subscribe(res => {
      console.log(res);

      if (res === 1) {
        job.applied = true;
      } else if (res === 0) {
        job.applied = false;
      }
    });
  }

  placeFun(word) {
    this.searchText = word
    console.log(this.searchText)
  }

  getModalInfo (job){
    this.modal_info = job;
    console.log(job);
    
  }

  



}



