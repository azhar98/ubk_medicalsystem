import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }
//get category
  getDesisCategory() : Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/getcategories');
  }
//get laborator
  getLabotaryDetail() : Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/getlaboratoy');
  }
  //get laborator
  getPackageDetail() : Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/getpackage');
  }
   //get laborator
   getProductByCategoryId(cat_id) : Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/'+ `${cat_id}`);
  }

    //get OrderProduct
    getOrderedProduct(order_id) : Observable<any> {
      return this.http.get(environment.apiBaseUrl + '/sam/'+ `${order_id}`);
    }


      //get OrderProduct After Order
      getOrderAfterOrder(order_id) : Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/order/'+ `${order_id}`);
      }

    //get Book Order Delete
    deleteOrder(order_id) : Observable<any> {
      return this.http.delete(environment.apiBaseUrl + '/delete/'+ `${order_id}`);
    }


// create order
createOrder(data) : Observable<any> {
  return this.http.post(environment.apiBaseUrl + '/order',data)
}


// create order
createOrderDetail(data) : Observable<any> {
  return this.http.post(environment.apiBaseUrl + '/orderdetail',data)
}
 
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
