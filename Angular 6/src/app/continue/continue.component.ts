import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.css']
})
export class ContinueComponent implements OnInit {
  codname='COD';
  wallet='wallet';
  card='card';
  submitted : boolean;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    
  }

  onItemChange(value){
    if(value=='wallet') {
    localStorage.removeItem('pay_type')
     localStorage.setItem('pay_type',value)
    console.log(" Value is : ", value );
   } else if(value=='card'){
    localStorage.removeItem('pay_type')
    localStorage.setItem('pay_type',value)
    console.log(" Value is : ", value );
   } else{
     console.log(value)
   }
 }


  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  onSubmit() {
   let pay=localStorage.getItem('pay_type') 
   let data = localStorage.getItem('order_data')
   let order_id = localStorage.getItem('order_id')
   let convertData = JSON.parse(data);
   console.log(convertData[0].first_name)
   
   let orderDetail = {
     order_id: order_id,
    user_id:convertData[0].user_id,
    status: 'pending',
    total_amount:convertData[0].anount,
    city_id:convertData[0].city_id,
    vendor_id:convertData[0].vendor_id,
    productt_id:convertData[0].fkproduct_id,
    date: new Date(),
    created_at:convertData[0].date_time,
    order_type: pay,
    discount_amount:convertData[0].discount_per,
     assign:convertData[0].report_within,
     
     
   }
     
   if(pay) {
    let orderDetail = {
      order_id: order_id,
     user_id:convertData[0].user_id,
     status: 'pending',
     total_amount:convertData[0].anount,
     city_id:convertData[0].city_id,
     vendor_id:convertData[0].vendor_id,
     productt_id:convertData[0].fkproduct_id,
     date: new Date(),
     created_at:convertData[0].date_time,
     order_type: pay,
     discount_amount:convertData[0].discount_per,
      assign:convertData[0].report_within,
      
      
    }

    this.userService.createOrderDetail(orderDetail).subscribe(res=>{
      console.log(res)
     localStorage.removeItem('pay_type')
     localStorage.removeItem('order_data')
     localStorage.removeItem('order_id')
     this.router.navigateByUrl('/orderdetail')
    })
   } else{

    let orderDetail = {
      order_id: order_id,
     user_id:convertData[0].user_id,
     status: 'pending',
     total_amount:convertData[0].anount,
     city_id:convertData[0].city_id,
     vendor_id:convertData[0].vendor_id,
     productt_id:convertData[0].fkproduct_id,
     date: new Date(),
     created_at:convertData[0].date_time,
     order_type: 'COD',
     discount_amount:convertData[0].discount_per,
      assign:convertData[0].report_within,
      
      
    }
    this.userService.createOrderDetail(orderDetail).subscribe(res=>{
      console.log(res)
     localStorage.removeItem('pay_type')
     localStorage.removeItem('order_data')
     localStorage.removeItem('order_id')
     this.router.navigateByUrl('/orderdetail')
    })
   }
    
      
      
    
  
  }

}
