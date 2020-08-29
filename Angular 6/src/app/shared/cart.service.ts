import { Injectable } from '@angular/core';
import {Product} from "../model/product";
import {Cart} from "../model/cart";
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartListSubject = new BehaviorSubject([]);
 
  public toggleCartSubject = new BehaviorSubject(false);

  toggleCart = () => {
      this.toggleCartSubject.next(!this.toggleCartSubject.getValue());
  };
  
  addToCart = (cart:Cart) => {
  let orderset = localStorage.getItem('current')
   let orderlength = JSON.parse(orderset)
   if( orderlength !== null) {
    let current = JSON.parse(localStorage.getItem('current'))
  let dup = current.find(c=>c.product.package_name === cart.product.package_name);
      
      if(dup) dup.quantity += cart.quantity;
      else current.push(cart);
      localStorage.setItem('current',JSON.stringify(current))
      let localcurrent = localStorage.getItem('current')
      //this.cartListSubject.next(current);
      this.cartListSubject.next(JSON.parse(localcurrent));
   }else{
    let current = this.cartListSubject.getValue();
    
    let dup = current.find(c=>c.product.package_name === cart.product.package_name);
        
        if(dup) dup.quantity += cart.quantity;
        else current.push(cart);
        localStorage.setItem('current',JSON.stringify(current))
        let localcurrent = localStorage.getItem('current')
        //this.cartListSubject.next(current);
        this.cartListSubject.next(JSON.parse(localcurrent));
   }
  };
  reloadCart = (cartList) => {
    console.log('reload',cartList)
      this.cartListSubject.next(cartList);
  };
  removeCart = index => {
      //let current = this.cartListSubject.getValue();
      let current = JSON.parse(localStorage.getItem('current'))
      current.splice(index,1);
      console.log(index)
      console.log(current)
      localStorage.setItem('current',JSON.stringify(current))
      this.cartListSubject.next(current);
  };



}
