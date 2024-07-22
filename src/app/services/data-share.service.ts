import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  serverUrl = 'https://shopzee-server.onrender.com'


  // behavipour subject
  wishListCout = new BehaviorSubject(0)
  cartCout = new BehaviorSubject(0)


  constructor(private http: HttpClient) {
    if (sessionStorage.getItem("token")) {
      this.getwishlistCout()
      this.getCartCount()
    }
  }


  // api to get  all product
  getAllProductAPI() {
    return this.http.get(`${this.serverUrl}/all-product`)
  }

  // api to register an user
  registerAPI(reqbody: any) {
    return this.http.post(`${this.serverUrl}/user/register`, reqbody)
  }

  // api to login an user
  loginAPI(reqbody: any) {
    return this.http.post(`${this.serverUrl}/user/login`, reqbody)
  }

  // token handling
  addTokenToHeader() {
    // object for the httpHeaders
    let headers = new HttpHeaders()
    // session token fetch
    const token = sessionStorage.getItem("token")
    if (token) {
      // append() - used to add data to the object
      headers = headers.append('Authorization', `Bearer ${token}`)
      console.log(headers);


    }

    return { headers }  // return an object with key headers and value has headers
  }

  // api to wishlist a product
  wishlistAPI(reqbody: any) {
    return this.http.post(`${this.serverUrl}/add-wishlist`, reqbody, this.addTokenToHeader())
  }

  // api to get a product
  getAProductAPI(id: any) {
    return this.http.get(`${this.serverUrl}/get-product/${id}`)
  }


  // api to wishlist of user  product
  getwishlistAPI() {
    return this.http.get(`${this.serverUrl}/wishlist/allproduct`, this.addTokenToHeader())
  }


  //api to delete an item from wishlist
  deleteWishListAPI(id: any) {
    return this.http.delete(`${this.serverUrl}/remove-wishlistItem/${id}`, this.addTokenToHeader())
  }

  // api to wishlist of user  product cout
  getwishlistCout() {
    this.getwishlistAPI().subscribe((res: any) => {
      this.wishListCout.next(res.length)
    })
  }


  // api to cart 
  addToCartAPI(product: any) {
    return this.http.post(`${this.serverUrl}/add-cart`, product, this.addTokenToHeader())
  }


  // api to get cart items
  getToCartAPI() {
    return this.http.get(`${this.serverUrl}/cart/all-products`, this.addTokenToHeader())
  }


  //api to delete an item from cart
  deleteCartAPI(id: any) {
    return this.http.delete(`${this.serverUrl}/cart/remove-item/${id}`, this.addTokenToHeader())
  }


  // api to empty cart
  emptyCartAPI() {
    return this.http.delete(`${this.serverUrl}/empty-cart`, this.addTokenToHeader())
  }


  // cart count
  getCartCount() {
    return this.getToCartAPI().subscribe((res: any) => {
      this.cartCout.next(res.length)
    })
  }

  // api to increment
  incrementProductAPI(id: any) {
    return this.http.get(`${this.serverUrl}/cart/increment/${id}`, this.addTokenToHeader())
  }

  // api to decrement
  decrementProductAPI(id: any) {
    return this.http.get(`${this.serverUrl}/cart/increment/${id}`, this.addTokenToHeader())
  }


}
