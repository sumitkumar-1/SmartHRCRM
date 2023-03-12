import { UploadService } from './../../services/upload.service';
import { ProfileService } from './../../services/profile.service';
import { Profile } from './../../interfaces/Profile';
import { Skill } from './../../interfaces/Skill';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  
  profileForm!: FormGroup;
  file!: File;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: Skill[] = [];

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private uploadService: UploadService) {
    console.log("construct profile");
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      contact: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required]) ],
      alternatecontact: ['', Validators.required],
      whatsappcontact: ['', Validators.required],
      linkedinprofile: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      totalexp: ['', [Validators.required]],
      relevantexp: ['', [Validators.required]],
      currentorganization: ['', [Validators.required]],
      noticeperiod: ['', [Validators.required]],
      currentlocation: ['', [Validators.required]],
      prefferedlocation: ['', [Validators.required]],
      ctc: ['', [Validators.required]],
      ectc: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      status: ['', [Validators.required]],
      cvurl: ['', [Validators.required]],
      designation: ['', [Validators.required]]
    });

    this.profileForm.disable();

    this.profileForm.patchValue({
      firstname: 'Rob',
      lastname: 'Randle',
    });
    "C++,JAVA,Python".split(',').map(name => (this.skills.push({name})));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push({ name: value });
    }
    event.chipInput!.clear();
  }

  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0];
  }
  
  upload() {
    if (this.file) {
      const formData: FormData = new FormData();
      formData.append('file', this.file);
      this.uploadService.uploadFile(formData).subscribe((data: any) => {
        console.log(data);
        this.profileForm.get('cvurl')?.setValue(data.location);
      });
    } else {
      alert("Please select a file first")
    }
  }

  onSubmit(form: FormGroup) {
    this.profileForm.disable();
    const userId = localStorage.getItem('userid') ?? '';
    const userProfile: Profile = {
      id: '',
      userid: userId,
      firstname: form.get('firstname')?.value,
      lastname: form.get('lastname')?.value,
      contact: form.get('contact')?.value,
      email: form.get('email')?.value,
      alternatecontact: form.get('alternatecontact')?.value,
      whatsappcontact: form.get('whatsappcontact')?.value,
      linkedinprofile: form.get('linkedinprofile')?.value,
      skills: this.skills.map(obj => obj.name).join(','),// form.get('skills')?.value,
      totalexp: form.get('totalexp')?.value,
      relevantexp: form.get('relevantexp')?.value,
      currentorganization: form.get('currentorganization')?.value,
      noticeperiod: form.get('noticeperiod')?.value,
      currentlocation: form.get('currentlocation')?.value,
      prefferedlocation: form.get('prefferedlocation')?.value,
      ctc: form.get('ctc')?.value,
      ectc: form.get('ectc')?.value,
      gender: form.get('gender')?.value,
      status: form.get('status')?.value,
      cvurl: form.get('cvurl')?.value,
      designation: form.get('designation')?.value,
      updatedat: '',
      createdat: ''
    };
    console.log(userProfile);
    this.profileService.createProfile(userProfile).subscribe((data) => {
      console.log(data);
    });
  }

  onEdit() {
    this.profileForm.enable();
  }

  get userForm() { return this.profileForm.controls; }

}
