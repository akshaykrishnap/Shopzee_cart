import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../services/data-share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  allProducts: any = []

  constructor(private api: DataShareService) { }


  ngOnInit(): void {
    this.api.getAllProductAPI().subscribe({
      next: (res: any) => {

        this.allProducts = res
        console.log(this.allProducts);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  /* add to wishlist */

  addWishList(product: any) {

    if (sessionStorage.getItem("token")) {
      this.api.wishlistAPI(product).subscribe({
        next: (res: any) => {
          console.log(res);
          this.api.getwishlistCout()

          Swal.fire({
            title: 'Successfull!',
            text: 'Added to Wishlist',
            icon: 'success',
            confirmButtonText: 'Confirm'
          })

        },
        error: (err: any) => {
          console.log(err);

          Swal.fire({
            title: 'Error!',
            text: 'Already Added to Wishlist',
            icon: 'info',
            confirmButtonText: 'Confirm'
          })

        }
      })
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'Login to add to Wishlist',
        icon: 'info',
        confirmButtonText: 'Cool'
      })
    }
  }

  /* add to carts */

  addToCart(product: any) {

    console.log(product);

    if (sessionStorage.getItem("token")) {

      Object.assign(product, { quantity: 1 })  // Ojectname[]

      this.api.addToCartAPI(product).subscribe({
        next: (res: any) => {
          console.log(res);
          this.api.getToCartAPI()

          Swal.fire({
            title: 'Successfull!',
            text: 'Added to Cart',
            icon: 'success',
            confirmButtonText: 'Confimed'
          })


        },
        error: (err: any) => {
          console.log(err);
          Swal.fire({
            title: 'Error!',
            text: 'Something is wrong',
            icon: 'info',
            confirmButtonText: 'Try Again'
          })

        }
      })
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'Login to add to Wishlist',
        icon: 'info',
        confirmButtonText: 'Confirm'
      })
    }
  }


}
