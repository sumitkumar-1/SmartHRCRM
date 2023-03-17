import { AddVendorDialogComponent } from './../add-vendor-dialog/add-vendor-dialog.component';
import { VendorService } from './../../services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/interfaces/Vendor';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  dataSource: Vendor[] = [];

  constructor(private vendorService: VendorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getVendorData();
  }

  getVendorData() {
    this.vendorService.getVendors().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  openAddVendorDialog() {
    const dialogRef = this.dialog.open(AddVendorDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const vendor: Vendor = {
          id: '',
          name: result.vendorname,
          logo: result.logo,
          primarycontact: result.primarycontact,
          status: result.status,
          email: result.email,
          phone: result.phone,
          location: result.location,
          address: result.address,
          updatedat: '',
          createdat: ''
        };
        this.vendorService.createVendor(vendor).subscribe((data: any) => {
          console.log(data);
          this.getVendorData();
        });
      }
    });
  }

}
