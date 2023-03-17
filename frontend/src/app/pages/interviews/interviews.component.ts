import { ShortListedProfile } from './../../interfaces/ShortListedProfile';
import { ShortlistedprofileService } from './../../services/shortlistedprofile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css'],
})
export class InterviewsComponent implements OnInit {

  shortlistedProfile!: ShortListedProfile[];

  constructor(private shortListedProfileService: ShortlistedprofileService) {}

  ngOnInit() {
    this.getShortListedProfiles();
  }

  getShortListedProfiles() {
    this.shortListedProfileService.getShortListedProfiles().subscribe((data: any) => {
      console.log(data);
      this.shortlistedProfile = data;
    });
  }
}
