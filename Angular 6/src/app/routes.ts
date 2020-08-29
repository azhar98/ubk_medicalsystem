import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { CartPageComponent } from './cartpage/cartpage.component';
import { PlaceOrderComponent } from './placeorder/placeorder.component';
import { ContinueComponent } from './continue/continue.component';
import { PayComponent } from './pay/pay.component';
import { OrderDetailComponent } from './orderdetail/orderdetail.component';
import { CategoryComponent } from './category/category.component';
import { BookComponent } from './book/book.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent
       // ,canActivate:[AuthGuard]
    },
    {
        path: 'cartpage', component: CartPageComponent
       // ,canActivate:[AuthGuard]
    },
    {
        path: 'placeorder', component: PlaceOrderComponent
       // ,canActivate:[AuthGuard]
    },
    {
        path: 'continue', component: ContinueComponent
       // ,canActivate:[AuthGuard]
    },
    {
        path: 'pay', component: PayComponent
       // ,canActivate:[AuthGuard]
    },
    {
        path: 'orderdetail', component: OrderDetailComponent
       // ,canActivate:[AuthGuard]
    },
    {
        path: 'category/:id', component: CategoryComponent
       // ,canActivate:[AuthGuard]
    },
    {
        path: 'book', component: BookComponent
       // ,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];