import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal'
import { DataShareService } from '../services/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  grandTotal:any=""
  proccedPaymentNow:boolean=false
  status:boolean=false

  public payPalConfig ? : IPayPalConfig;

  constructor(private fb:FormBuilder , private api:DataShareService, private router:Router){}

  checkoutForm = this.fb.group({
    uname:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    flat:["",[Validators.required, Validators.pattern('[a-zA-Z0-9:,. ]*')]],
    place:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pincode:["",[Validators.required, Validators.pattern('[0-9]*')]]
  })
  ngOnInit(): void {
    this.initConfig()
  }

  /* reset */
  cancel(){
    this.checkoutForm.reset()
  }

  /* payment portal address */
  proceedPaymenet(){
    if (this.checkoutForm.valid) {
      this.grandTotal= sessionStorage.getItem("total")
      this.proccedPaymentNow=true
    }
    else{
      Swal.fire({
        title: 'Form Incomplete',
        text: 'Plaese Fill The Form Completely',
        icon: 'error',
        confirmButtonText: 'Confimed'
      })
    }
  }

  /* payments */
  payment(){
    this.initConfig()
    this.status=true
  }

  /* back button */
  back(){
    this.proccedPaymentNow=false
  }

  /* paypal */
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.grandTotal,
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any )=> {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },

        /* when payment is successfull */
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.api.getCartCount()
            Swal.fire({
              title: 'Successfull!',
              text: 'Payment is Successfull',
              icon: 'success',
              confirmButtonText: 'Confimed'
            })
            this.status=false
            this.proccedPaymentNow=false
            this.router.navigateByUrl("/")


            /* this.showSuccess = true; */
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
           
            /* payment failure */
            Swal.fire({
              title: 'Failure!',
              text: 'Payment Failed',
              icon: 'error',
              confirmButtonText: 'Confimed'
            })
            this.status=true
    
            this.router.navigateByUrl("/")
           /*  this.showCancel = true; */

        },
        /* gateway error */
        onError: err => {
            console.log('OnError', err);
            Swal.fire({
              title: 'Error',
              text: 'Plaese Try Again Later Due to Error',
              icon: 'info',
              confirmButtonText: 'Confimed'
            })
            this.status=false
            
            this.router.navigateByUrl("/")
           /*  this.showError = true; */
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
          /*   this.resetStatus(); */
        }
    };
}

}
