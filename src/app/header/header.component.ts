import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../services/data-share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginUserName: string = ""

  wishlistCout: number = 0
  CartCnt: number = 0

  constructor(private api: DataShareService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("username")) {
      this.loginUserName = sessionStorage.getItem("username") || ""
      this.api.wishListCout.subscribe((res: any) => {
        this.wishlistCout = res
      })
      this.api.cartCout.subscribe((res: any) => {
        this.CartCnt = res
      })

    }
    else {
      this.loginUserName = ""
    }
  }






}
