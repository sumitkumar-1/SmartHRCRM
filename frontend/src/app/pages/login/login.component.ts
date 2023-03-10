import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error: string = '';
  
  constructor(private formBulder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBulder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onLogin(form: FormGroup) {
    this.error = '';
    const data = { email: form.get('email')?.value, password: form.get('password')?.value}
    this.userService.login(data).subscribe((data: any) => {
      if(data.message == "OK") {
        console.log(data);
        localStorage.setItem('token', data.token);
        this.router.navigate(['dashboard']);
      }
    }, (err: HttpErrorResponse) => {console.log(err); this.error = err.message;});
  }

}
