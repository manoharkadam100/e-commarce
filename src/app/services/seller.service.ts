import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLogginsucess = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: SignUp) {
    let result = this.http
      .post('http://localhost:3000/seller', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        if(result){
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data:Login){
   // console.log(data)
   let result = this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{
    observe: 'response',
  }).subscribe((result:any)=>{
   
    if(result && result.body && result.body.length)
    {
      
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
    }else{
      this.isLogginsucess.emit(true)
    }
  })
  }
}
