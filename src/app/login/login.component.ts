import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from "@angular/router"

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
    let value = this.commonService.isAuthenticateUser(this.userName, this.password);
    if (value === true) {
      this.router.navigate(['/']);
    }
    else {
      this.incorrect = true;
    }
  }

}
