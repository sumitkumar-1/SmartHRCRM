import { User } from './../../interfaces/Users';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-demand-handler-dialog',
  templateUrl: './demand-handler-dialog.component.html',
  styleUrls: ['./demand-handler-dialog.component.css']
})
export class DemandHandlerDialogComponent implements OnInit {

  addMemberform!: FormGroup;
  users!: User[];

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<DemandHandlerDialogComponent>) { }

  ngOnInit(): void {
    this.getUsers();
    this.addMemberform = this.formBuilder.group({
      memberid: ['', Validators.required]
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.addMemberform.valid) {
      const member = this.addMemberform.value;
      this.dialogRef.close(member);
    }
  }

}
