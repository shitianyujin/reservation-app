import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    errors: any = [];
    constructor(
        private aushService: AuthService,
        private router: Router
    ) { }

    ngOnInit() { }

    register(registerForm: any) {
        this.errors = null;
        console.log(registerForm.value);
        this.aushService.register(registerForm.value).subscribe(
            (result) => {
                console.log("register success!!");
                this.router.navigate(['/login']);
            },
            (err: HttpErrorResponse) => {
                console.error(err);
                this.errors = err.error.errors;
            }
        )
    }
}
