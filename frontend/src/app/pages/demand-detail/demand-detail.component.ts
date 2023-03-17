import { ShortListedProfile } from './../../interfaces/ShortListedProfile';
import { ShortlistedprofileService } from './../../services/shortlistedprofile.service';
import { UserService } from './../../services/user.service';
import { DemandHandler } from './../../interfaces/DemandHandler';
import { DemandhandlerService } from './../../services/demandhandler.service';
import { Demand } from './../../interfaces/Demand';
import { DemandService } from './../../services/demand.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DemandHandlerDialogComponent } from './../demand-handler-dialog/demand-handler-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/Users';

@Component({
  selector: 'app-demand-detail',
  templateUrl: './demand-detail.component.html',
  styleUrls: ['./demand-detail.component.css']
})
export class DemandDetailComponent implements OnInit {

  demandDetail!: Demand;
  demandId!: string;
  demandHandlers!: DemandHandler[];
  shortListedProfiles!: ShortListedProfile[];
  users!: User[];

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private demandService: DemandService, private demandHandlerService: DemandhandlerService, private userService: UserService, private shortListedProfileService: ShortlistedprofileService) { 
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.demandId = params['id'];
      this.getDemandData();
      this.getDemandHandlers();
      this.getShortListedProfiles();
    })
  }

  getDemandData() {
    this.demandService.getDemandById(this.demandId).subscribe((data: any) => {
      this.demandDetail = data;
    });
  }

  getDemandHandlers() {
    this.demandHandlerService.getDemandHandlers().subscribe((data: any) => {
      const handlers = data;
      this.demandHandlers = handlers.filter((obj: any) => obj.demandid === this.demandId);
    });
  }

  getShortListedProfiles() {
    this.shortListedProfileService.getShortListedProfiles().subscribe((data: ShortListedProfile[]) => {
      this.shortListedProfiles = data.filter((obj:ShortListedProfile) => obj.demandid === this.demandId);
    });
  }

  getName(id: string) {
    const u = this.users.find((item: User) => item.id === id);
    return u?.firstname + ' ' + u?.lastname;
  }

  openAddMemberDialog() {
    const dialogRef = this.dialog.open(DemandHandlerDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        const currentUserId = localStorage.getItem('userid') ?? '';
    
        this.userService.getUsers().subscribe((data: any) => {
          const user = data.find((obj: any) => obj.id === currentUserId);
          const muser = data.find((obj: any) => obj.id === result.memberid);
          const demandHandler: DemandHandler = {
            id: '',
            demandid: this.demandId,
            handlername: muser.firstname + ' ' + muser.lastname,
            operator: user.firstname + ' ' + user.lastname,
            processingdate: Date.now().toString(),
            status: 'Active',
            updatedat: '',
            createdat: ''
          };
          
          if(result) {
            this.demandHandlerService.createDemandHandler(demandHandler).subscribe((data: any) => {
              console.log(data);
              this.getDemandHandlers();
            });
          }
        });
    });
  }

}
