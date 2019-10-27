import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/main/index/index.component';
import { JobComponent } from './components/job/job.component';

import { LoginComponent } from './components/main/login/login.component';
import { RegisterComponent } from './components/main/register/register.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './components/user/user.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditRecruiterComponent } from './components/recruiter/edit-recruiter/edit-recruiter.component';
import { PostJobComponent } from './components/recruiter/post-job/post-job.component';
import { JobPostedComponent } from './components/recruiter/job-posted/job-posted.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'findjob', component: JobComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'displayjobs', component: UserComponent, canActivate: [AuthGuard] }, // landing page for job seekers
  { path: 'editprofile', component: EditProfileComponent, canActivate: [AuthGuard] }, // edit profile page for job seekers

  { path: "edit_recruiter", component: EditRecruiterComponent , canActivate: [AuthGuard] },
  { path: "post_job", component: PostJobComponent , canActivate: [AuthGuard]},
  { path: "ownjobs", component: JobPostedComponent , canActivate: [AuthGuard]},

  { path: 'jobdetails', component: JobComponent, canActivate: [AuthGuard] }, //  job details page for job seekers
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
