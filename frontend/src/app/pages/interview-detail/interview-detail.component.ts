import { Vendor } from './../../interfaces/Vendor';
import { Demand } from './../../interfaces/Demand';
import { DemandService } from './../../services/demand.service';
import { VendorService } from './../../services/vendor.service';
import { ShortListedProfile } from './../../interfaces/ShortListedProfile';
import { ActivatedRoute, Params } from '@angular/router';
import { ShortlistedprofileService } from './../../services/shortlistedprofile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interview-detail',
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.css']
})
export class InterviewDetailComponent implements OnInit {

  profileData!: ShortListedProfile;
  logoUrl!: string;

  constructor(private shortListedProfileService: ShortlistedprofileService, private route: ActivatedRoute, private vendorService: VendorService, private demandService: DemandService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.getProfileDetails(id);
    })
  }

  getProfileDetails(id: string) {
    this.shortListedProfileService.getShortListedProfileById(id).subscribe((data: any) => {
      this.profileData = data;
      this.getVendor();
    });
  }

  getVendor() {
    this.demandService.getDemandById(this.profileData.demandid).subscribe((data: Demand) => {
      this.vendorService.getVendorById(data.vendorid).subscribe((data: Vendor) => {
        this.logoUrl = data.logo;
      });
    });
  }
}
