import { UserService } from './../../services/user.service';
import { User } from './../../interfaces/Users';
import { DemandService } from './../../services/demand.service';
import { Demand } from './../../interfaces/Demand';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-interview-dialog',
  templateUrl: './add-interview-dialog.component.html',
  styleUrls: ['./add-interview-dialog.component.css']
})
export class AddInterviewDialogComponent implements OnInit {

  addInterviewform!: FormGroup;
  users!: User[];
  demands!: Demand[];
  
  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddInterviewDialogComponent>, private userService: UserService, private demandService: DemandService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllVendors();
    this.addInterviewform = this.formBuilder.group({
      userid: ['', Validators.required],
      demandid: ['', Validators.required],
      companyname: ['', Validators.required],
      jobdescription: ['', Validators.required],
      scheduledate: ['', Validators.required],
      status: ['', Validators.required],
      venue: ['', Validators.required],
      mode: ['', Validators.required],
      duration: ['', Validators.required],
      panel: ['', Validators.required]
    });
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  getAllVendors() {
    this.demandService.getDemands().subscribe((data: any) => {
      this.demands = data;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.addInterviewform.valid) {
      const shortlistedcandidate = this.addInterviewform.value;
      this.dialogRef.close(shortlistedcandidate);
    }
  }

}
