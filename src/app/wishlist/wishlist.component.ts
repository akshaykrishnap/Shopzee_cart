import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../services/data-share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allproduct :any = []

  constructor(private api:DataShareService){}

  ngOnInit(): void {
    this.getWishlistItems()
  }

getWishlistItems(){
this.api.getwishlistAPI().subscribe({
  next:(res:any)=>{
    console.log(res);
    this.allproduct = res
    
  },
  error:(err:any)=>{
    console.log(err);
    
  }
})

}


 removeItem(id:any){
  this.api.deleteWishListAPI(id).subscribe({
   
      next:(res:any)=>{
    console.log(res);
    this.getWishlistItems()
    this.api.getwishlistCout()
    
    Swal.fire({
      title: 'Error!',
      text: 'Items Deleted from Wishlist',
      icon: 'error',
      confirmButtonText: 'Confirm'
    })
    
  },
  error:(err:any)=>{
    console.log(err);
    
  }
  })
} 



  /* add to carts */

  addToCart(product: any) {

    console.log(product);

    if (sessionStorage.getItem("token")) {

      Object.assign(product, {quantity:1})  // Ojectname[]

      this.api.addToCartAPI(product).subscribe({
        next: (res: any) => {
          console.log(res);
          this.api.getCartCount()


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