import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../services/data-share.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product: any = {}

  constructor(private api: DataShareService, private router: ActivatedRoute) { }


  ngOnInit(): void {
    this.router.params.subscribe((res: any) => {
      const id = res.id
      console.log(id);
      this.getAProduct(id)

    })
  }


   getAProduct(id: any) {
    this.api.getAProductAPI(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.product = res

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  } 

  addToWishList(product:any){
    if (sessionStorage.getItem("token")) {
      this.api.wishlistAPI(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getwishlistCout()
          Swal.fire({
            title: 'Successfull!',
            text: 'Added to Wishlist',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          
        },
        error:(err:any)=>{
          console.log(err);
          Swal.fire({
            title: 'Error!',
            text: 'Already Added to Wishlist',
            icon: 'info',
            confirmButtonText: 'Cool'
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

  addToCart(product:any) {

    console.log(product);

    if (sessionStorage.getItem("token")) {

      Object.assign(product, {quantity: 1})  // Onjectname[]

      this.api.addToCartAPI(product).subscribe({
        next: (res: any) => {
          console.log(res);
        

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
            text: 'Already Added to Cart',
            icon: 'info',
            confirmButtonText: 'Try Again'
          })

        }
      })
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'Login to add to Cart',
        icon: 'info',
        confirmButtonText: 'Confirm'
      })
    }
  }

}
