import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from "@angular/router"
import { User } from '../model/user';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  userName: string = "";
  password: string = "";
  incorrect: boolean;
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.incorrect = false;
  }

  login() {
     this.commonService.isAuthenticateUser(this.userName, this.password).subscribe((result:any)=>{
       this.commonService.setSession(result);
       this.router.navigate(['/']);
     },(error =>{
       this.incorrect = true;
     }));
  }

}
