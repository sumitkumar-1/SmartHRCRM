import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardItems = [
    {name: "Interviews", icon: 'assignment', route: '/interviews', roles: ['user']},
    {name: "Vendors", icon: 'people_alt', route: '/vendor', roles: ['user', 'admin']},
    {name: "Candidates", icon: 'person', route: '/candidate', roles: ['user', 'admin', 'employee']},
    {name: "Demands", icon: 'assignment_turned_in', route: '/demand', roles: ['user', 'admin']}
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
