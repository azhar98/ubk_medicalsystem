import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { stringify } from 'querystring';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceOrderComponent implements OnInit {
  orderDetails;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    let order_id = localStorage.getItem('order_id')
    console.log('odi',order_id)
    this.userService.getOrderAfterOrder(order_id).subscribe(res=>{
      localStorage.setItem('order_data',JSON.stringify(res))
      console.log('placeorder',res)
      this.orderDetails=res[0];
      
    })
  }

  deleteBookOrder(order_id: number) {
    console.log('delet', order_id)
    this.userService.deleteOrder(order_id).subscribe(res=>{
      console.log('deleted',res)
      localStorage.removeItem('order_id')
      localStorage.removeItem('order_data')
      localStorage.removeItem('pay_type')
      this.router.navigateByUrl('/userprofile')
    })

  }


  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
