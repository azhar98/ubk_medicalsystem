import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from "@angular/router";
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  productdetails;
  categoryname;
  
  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    let cat_id = this.activeRoute.snapshot.params['id'];
    //getproduct by category id
    this.userService.getProductByCategoryId(cat_id).subscribe(res=>{
      if(res) {
        this.productdetails=res;
        this.categoryname = res[0].cat_name;
      }
      
     
    })
  }
  
onSubmit(myForm: NgForm) {
 
  this.userService.createOrder(myForm.value).subscribe(res=>{
    console.log(res)
    console.log(res.user_id.insertId)
    localStorage.setItem('order_id',res.user_id.insertId)
    this.router.navigateByUrl('/placeorder');

  })
  
}

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
