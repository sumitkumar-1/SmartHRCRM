import { VendorService } from './../../services/vendor.service';
import { Vendor } from './../../interfaces/Vendor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-demand-dialog',
  templateUrl: './add-demand-dialog.component.html',
  styleUrls: ['./add-demand-dialog.component.css']
})
export class AddDemandDialogComponent implements OnInit {

  addDemandform!: FormGroup;
  vendors!: Vendor[];
  
  constructor(private formBuilder: FormBuilder,
    private vendorService: VendorService,
    private dialogRef: MatDialogRef<AddDemandDialogComponent>) { }

  ngOnInit(): void {
    this.getAllVendors();
    this.addDemandform = this.formBuilder.group({
      vendorid: ['', Validators.required],
      description: ['', Validators.required],
      vacancy: ['', Validators.required],
      level: ['', Validators.required],
      qualification: ['', Validators.required],
      contact: ['', Validators.required],
      position: ['', Validators.required],
      skills: ['', Validators.required],
      yearofexpfrom: ['', Validators.required],
      yearofexpto: ['', Validators.required],
      worklocation: ['', Validators.required],
      workmode: ['', Validators.required],
      maxnoticeperiod: ['', Validators.required],
      minnoticeperiod: ['', Validators.required],
      minsalary: ['', Validators.required],
      maxsalary: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required]
    });
  }

  getAllVendors() {
    this.vendorService.getVendors().subscribe((data: any) => {
      this.vendors = data;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.addDemandform.valid) {
      const vendor = this.addDemandform.value;
      this.dialogRef.close(vendor);
    }
  }

}
