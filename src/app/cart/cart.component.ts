import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../services/data-share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allProduct: any = []
  total: number = 0

  constructor(private api: DataShareService) { }

  ngOnInit(): void {
    this.getcartItem()
  }

  /* cart items */
  getcartItem() {

    this.api.getToCartAPI().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProduct = res
        this.getTotalPrice()



      },
      error: (err: any) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: `${err}`,
          icon: 'info',
          confirmButtonText: 'Try Again'
        })

      }
    })

  }

  /* delete cart items */
  removeCartItem(id: any) {
    this.api.deleteCartAPI(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getcartItem()
        this.api.getCartCount()

        Swal.fire({
          title: 'Deleted',
          text: 'Removed from Cart',
          icon: 'error',
          confirmButtonText: 'Confimed'
        })
      },
      error: (err: any) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'info',
          confirmButtonText: 'Try Again'
        })

      }
    })
  }


  /* clear full carts */
  emptyCart() {
    this.api.emptyCartAPI().subscribe({
      next: (res: any) => {
        console.log(res);
        this.getcartItem()
        this.api.getCartCount()

        Swal.fire({
          title: 'Deleted',
          text: 'Removed from Cart',
          icon: 'error',
          confirmButtonText: 'Confimed'
        })
      },
      error: (err: any) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'info',
          confirmButtonText: 'Try Again'
        })

      }
    })
  }


  /* increment */
  incrementItem(id: any) {
    this.api.incrementProductAPI(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getcartItem()
        this.api.getCartCount()


      }
      , error: (err: any) => {
        console.log(err);

      }
    })
  }

  /* decrement */
  decrementItem(id: any) {
    this.api.decrementProductAPI(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getcartItem()
        this.api.getCartCount()


      }
      , error: (err: any) => {
        console.log(err);

      }
    })
  }

  /* get total */
  getTotalPrice() {
    this.total = this.allProduct.map((item: any) => item.grandTotal).reduce((n1: any, n2: any) => n1 + n2)
    console.log(this.total);

  }

  /* checkout */
  checkout(){
    sessionStorage.setItem("total",JSON.stringify(this.total))
  }

}