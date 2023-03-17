import { DemandDetailComponent } from './pages/demand-detail/demand-detail.component';
import { CandidateDetailComponent } from './pages/candidate-detail/candidate-detail.component';
import { VendorDetailComponent } from './pages/vendor-detail/vendor-detail.component';
import { InterviewDetailComponent } from './pages/interview-detail/interview-detail.component';
import { DemandComponent } from './pages/demand/demand.component';
import { CandidateComponent } from './pages/candidate/candidate.component';
import { InterviewsComponent } from './pages/interviews/interviews.component';
import { VendorComponent } from './pages/vendor/vendor.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'vendor', component: VendorComponent, canActivate: [AuthGuard]},
  { path: 'vendordetail/:id', component: VendorDetailComponent, canActivate: [AuthGuard]},
  { path: 'interviews', component: InterviewsComponent, canActivate: [AuthGuard]},
  { path: 'interviewdetail/:id', component: InterviewDetailComponent, canActivate: [AuthGuard]},
  { path: 'candidate', component: CandidateComponent, canActivate: [AuthGuard]},
  { path: 'candidatedetail/:id', component: CandidateDetailComponent, canActivate: [AuthGuard]},
  { path: 'demand', component: DemandComponent, canActivate: [AuthGuard]},
  { path: 'demanddetail/:id', component: DemandDetailComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
