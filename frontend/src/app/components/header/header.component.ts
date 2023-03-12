import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    console.log("Init");
  }

  logout() {
    this.userService.logout().subscribe((data: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      this.router.navigate(['login']);
    }, (err: HttpErrorResponse) => {console.log(err)});
    console.log("logout");
  }
}
