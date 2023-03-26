import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller: SellerService, private router: Router) {}
  showLogin=false
  authError:string=""
  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data: SignUp) {
    this.seller.userSignUp(data);
  }
  openLogin(){
    this.showLogin=true
  }
  openSignUp(){
    this.showLogin=false 
  }
  login(data: Login) {
    this.seller.userLogin(data)
    this.authError=""
    this.seller.isLogginsucess.subscribe((error)=>{
        if(error){
          this.authError="Email or password is not correct"
        }
    })
  }
}
