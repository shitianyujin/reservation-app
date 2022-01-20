import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    errors: any = [];
    constructor(
        private aushService: AuthService,
        private router: Router
    ) { }

    ngOnInit() { }

    login(loginForm: any) {
        this.errors = null;
        console.log(loginForm.value);
        this.aushService.login(loginForm.value).subscribe(
            (token) => {
                console.log("login success!!");
                this.router.navigate(['/products']);
            },
            (err: HttpErrorResponse) => {
                console.error(err);
                this.errors = err.error.errors;
            }
        )
    }
}
