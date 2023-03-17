import { VendorService } from './../../services/vendor.service';
import { Vendor } from './../../interfaces/Vendor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  vendorDetails: Vendor = {id: '', name: '', logo: '', primarycontact: '', status: '', email: '', phone: '', location: '', address: '', updatedat: '', createdat: ''};

  constructor(private vendorService: VendorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.getVendorData(id);
    });
    
  }

  getVendorData(id: string) {
    this.vendorService.getVendorById(id).subscribe((data: any) => {
      this.vendorDetails = data;
    })
  }

}
