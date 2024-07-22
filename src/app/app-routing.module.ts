import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './all-product/all-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',component:AllProductComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'carts',component:CartComponent},
  {path:'user/login',component:LoginComponent},
  {path:'user/register',component:RegisterComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'view-product/:id',component:ViewProductComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
