import { ProfileService } from './../../services/profile.service';
import { Profile } from './../../interfaces/Profile';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {

  candidateDetail! : Profile;

  constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.getCandidateDetail(id);
    })
  }

  getCandidateDetail(id: string) {
    this.profileService.getProfileById(id).subscribe((data: any) => {
      this.candidateDetail = data;
    })
  }

}
