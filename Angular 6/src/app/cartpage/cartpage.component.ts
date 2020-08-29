import { Component, OnInit, Input, Output } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from '../shared/cart.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartPageComponent implements OnInit {
  userDetails;
  //orderdetails: any;
  cartData;
  constructor(private userService: UserService,
     private cartService: CartService,
      private router: Router,
       private activeRoute: ActivatedRoute
       ) {
         
        }

  ngOnInit() {
    let order_id = this.activeRoute.snapshot.params['id'];
    //getproduct by OrderId
    this.userService.getOrderedProduct(order_id).subscribe(res=>{
     // this.orderdetails=res;
      
    })

   // get order by cart from local storage
  // let cartData = localStorage.getItem('current')
       this.cartData = JSON.parse(localStorage.getItem('current'))
   console.log('cartdata',this.cartData)
  }

  // delete cart 
  removeFromCart(i) {
    this.cartService.removeCart(i)
  }



  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
