import { Demand } from './../../interfaces/Demand';
import { DemandService } from './../../services/demand.service';
import { AddDemandDialogComponent } from './../add-demand-dialog/add-demand-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.css']
})
export class DemandComponent implements OnInit {

  dataSource!: Demand[];

  constructor(private dialog: MatDialog, private demandService: DemandService) { }

  ngOnInit(): void {
    this.getDemandsData();
  }

  getDemandsData() {
    this.demandService.getDemands().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  openAddDemandDialog() {
    const dialogRef = this.dialog.open(AddDemandDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const demand: Demand = {
          id: '',
          vendorid: result.vendorid,
          description: result.description,
          vacancy: result.vacancy,
          level: result.level,
          qualification: result.qualification,
          contact: result.contact,
          position: result.position,
          skills: result.skills,
          yearofexpfrom: result.yearofexpfrom,
          yearofexpto: result.yearofexpto,
          worklocation: result.worklocation,
          workmode: result.workmode,
          maxnoticeperiod: result.maxnoticeperiod,
          minnoticeperiod: result.minnoticeperiod,
          minsalary: result.minsalary,
          maxsalary: result.maxsalary,
          startdate: result.startdate,
          enddate: result.enddate,
          updatedat: '',
          createdat: ''
        };
        this.demandService.createDemand(demand).subscribe((data: any) => {
          console.log(data);
          this.getDemandsData();
        });
      }
    });
  }

}
