import { UploadService } from './../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-vendor-dialog',
  templateUrl: './add-vendor-dialog.component.html',
  styleUrls: ['./add-vendor-dialog.component.css']
})
export class AddVendorDialogComponent implements OnInit {

  addVendorform!: FormGroup;
  file!: File;
  
  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddVendorDialogComponent>, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.addVendorform = this.formBuilder.group({
      vendorname: ['', Validators.required],
      primarycontact: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      logo: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.addVendorform.valid) {
      const vendor = this.addVendorform.value;
      this.dialogRef.close(vendor);
    }
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0];
  }
  
  upload() {
    if (this.file) {
      const formData: FormData = new FormData();
      formData.append('file', this.file);
      this.uploadService.uploadFile(formData).subscribe((data: any) => {
        console.log(data);
        alert("File Uploaded Successfully");
        this.addVendorform.get('logo')?.setValue(data.location);
      });
    } else {
      alert("Please select a file first")
    }
  }

}
