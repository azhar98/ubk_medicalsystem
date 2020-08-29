// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { CartPageComponent } from "./cartpage/cartpage.component";
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PlaceOrderComponent } from './placeorder/placeorder.component';
import { ContinueComponent } from './continue/continue.component';
import { PayComponent } from './pay/pay.component';
import { OrderDetailComponent } from './orderdetail/orderdetail.component';
import { CategoryComponent } from './category/category.component';
import { BookComponent } from './book/book.component';
import { CartService } from './shared/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    CartPageComponent,
    PlaceOrderComponent,
    ContinueComponent,
    PayComponent,
    OrderDetailComponent,
    CategoryComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
