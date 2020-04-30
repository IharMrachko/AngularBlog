import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  forms: FormGroup;
  submitted = false;
  message: string;
  constructor(public auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
       this.message = 'Пожалуйста, введите данные';
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные заново';
      }
    });
    this.forms = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    if (this.forms.invalid) {
      return;
    }
    this.submitted = true;
    const user: User = {
      email: this.forms.value.email,
      password: this.forms.value.password
    };
    this.auth.login(user).subscribe(() => {
      this.forms.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
