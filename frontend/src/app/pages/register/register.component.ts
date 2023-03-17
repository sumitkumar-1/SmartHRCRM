import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './../../interfaces/Users';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required]) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      dob: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }

  onSubmit(form: FormGroup) {
    const user: User = {
      id: '', 
      email: form.get('email')?.value,
      phone: form.get('phone')?.value,
      password: form.get('password')?.value,
      role: 'user', 
      firstname: form.get('firstname')?.value,
      lastname: form.get('lastname')?.value,
      dob: form.get('dob')?.value,
      sex: form.get('sex')?.value,
      city: form.get('city')?.value,
      country: form.get('country')?.value,
      updatedat: '', 
      createdat: ''
    };
    this.userService.registerUser(user).subscribe((data: any) => {
      this.router.navigate(['login']);
    }, (err: HttpErrorResponse) => { console.log(err);});
  }

  get userForm() { return this.registerForm.controls; }

}
