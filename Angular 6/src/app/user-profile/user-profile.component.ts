import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  labotary;
  package;

  //cart
  public collapse: boolean = false;
  public cart_num:number;

  constructor(private userService: UserService, private cartService: CartService, private router: Router) { }

  ngOnInit() {
    //category
    this.userService.getDesisCategory().subscribe(res=>{
      this.userDetails = res;
     // console.log(this.userDetails)
    })
    //labotary
    this.userService.getLabotaryDetail().subscribe(res=>{
      this.labotary = res;
     // console.log(this.labotary)
    })
    //package
    this.userService.getPackageDetail().subscribe(res=>{
      this.package = res;
     // console.log(this.labotary)
    })

    //cart service
        this.cartService.cartListSubject.subscribe(res=>{
          
          let orderset = localStorage.getItem('current')
          let orderlength = JSON.parse(orderset)
          console.log(orderlength)
          if(orderlength !== null){
            this.cart_num = orderlength.length;
          } else {
            
            this.cart_num = 0;
          }
         
        })

      
    
  }

  //add to cart product
  addToCart = (product) => {
    //console.log(product)
    this.cartService.addToCart({product,quantity:1})
};

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
