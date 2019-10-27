import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
    this.getJobs();
  }

  getJobs() {
    return this.http.get('/jobs');
  }

  userApplied(job) {
    return this.http.put('/user/applied', job);
  }

  getRecruiters() {
    return this.http.get('/admin/recruiters');
  }

  ActivateRec(rec) {
    return this.http.put('/admin/activate', rec);
  }

  sign_out() {
    return this.http.get('/sign_out');
  }

  appliedJobs() {
    return this.http.get('/user/jobs');
  }
  recruitersById() {
    return this.http.get('/recruiter');
  }
  updateRecruitersById(rec) {
    return this.http.put('/recruiter', rec);
  }

  updateUser(user) {
    return this.http.put('/user', user);
  }

  postNewJob(job) {
    return this.http.post('/job', job);
  }

  getRecJobs() {
    return this.http.get('/recruiter/jobs');
  }

  postFile(fileToUpload: File) {
    const endpoint = 'upload';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }
}
