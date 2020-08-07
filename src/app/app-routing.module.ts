import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SecureComponent } from './secure/secure.component'; 
import { ProfileComponent } from './secure/user/profile/profile.component'; 
import { PostListComponent } from './secure/post-list/post-list.component';
import { PostAddComponent } from './secure/post-add/post-add.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: '', redirectTo: 'list-post', pathMatch: 'full' },
  { path: 'list-post', component: PostListComponent }, 
  { path: 'login', component: LoginComponent }, 

  {
    path: 'secure', component: SecureComponent, children: [
      { path: '', redirectTo: 'list-post', pathMatch: 'full' },
      { path: 'myprofile', component: ProfileComponent },
      { path: 'list-post', component: PostListComponent }, 
      { path: 'add-post', component: PostAddComponent }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }