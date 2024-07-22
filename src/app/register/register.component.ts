import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataShareService } from '../services/data-share.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private fb:FormBuilder, private api:DataShareService, private router:Router){}

  registerForm= this.fb.group({
      username:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  register(){
    if (this.registerForm.valid) {
      let user = this.registerForm.value
      console.log(user);
      this.api.registerAPI(user).subscribe({
        next:(res:any)=>{
          console.log(res);
          Swal.fire({
            title: 'Successfull!',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.router.navigateByUrl('/user/login')
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
      
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
