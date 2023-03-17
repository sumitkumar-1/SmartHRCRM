import { UserService } from './../../services/user.service';
import { ShortListedProfile } from './../../interfaces/ShortListedProfile';
import { ShortlistedprofileService } from './../../services/shortlistedprofile.service';
import { Profile } from './../../interfaces/Profile';
import { ProfileService } from './../../services/profile.service';
import { AddInterviewDialogComponent } from './../add-interview-dialog/add-interview-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  dataSource!: Profile[];

  constructor(private dialog: MatDialog, private profileService: ProfileService, private userService: UserService, private shortListedProfileService: ShortlistedprofileService) { }

  ngOnInit(): void {
    this.getAllProfiles();
  }

  getAllProfiles() {
    this.profileService.getProfiles().subscribe((data: any) => {
      this.dataSource = data;
      console.log(data);
    });
  }

  openAddInterviewDialog() {
    const dialogRef = this.dialog.open(AddInterviewDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        const currentUserId = localStorage.getItem('userid') ?? '';

        this.userService.getUsers().subscribe((data: any) => {
          const user = data.find((obj: any) => obj.id === currentUserId);
          const profile : ShortListedProfile = {
            id: '',
            userid: result.userid,
            demandid: result.demandid,
            companyname: result.companyname,
            jobdescription: result.jobdescription,
            scheduledate: result.scheduledate,
            status: result.status,
            venue: result.venue,
            mode: result.mode,
            duration: result.duration,
            panel: result.panel,
            operator: user.firstname + ' ' + user.lastname,
            updatedat: '',
            createdat: ''
          };
          this.shortListedProfileService.createShortListedProfile(profile).subscribe((data: any) => {
            console.log(data);
          });
        });
      }
    });
  }

}
