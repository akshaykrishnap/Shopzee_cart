import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataShareService } from '../services/data-share.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder,private router:Router, private api: DataShareService) { }

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login() {
    if (this.loginForm.valid) {
      let user = this.loginForm.value
      this.api.loginAPI(user).subscribe({
        next: (res: any) => {
          console.log(res);

          sessionStorage.setItem("username",res.existingUser.username)
          sessionStorage.setItem("token",res.token)
          Swal.fire({
            title: 'Successfull!',
            text: 'Login Accepted',
            icon: 'success',
            confirmButtonText: 'Cool'
          })

          this.router.navigateByUrl('')


        },
        error: (err: any) => {
          console.log(err);
    }})
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid',
        icon: 'error',
        confirmButtonText: 'Cool'
      })


    }
  }

}
