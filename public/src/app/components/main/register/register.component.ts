import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  reg_type: boolean = true
  constructor() { }

  ngOnInit() {
    this.reg_type = false
  }

  change_to_user_reg() {
    if (this.reg_type == true) {
      this.reg_type = false
      console.log("Change to user")
    }
    else {
      console.log("No Change")
    }
  }
  change_to_rec_reg() {
    if (this.reg_type == false) {
      this.reg_type = true
      console.log("Change to Rec")
    }
    else {
      console.log("No Change")
    }

  }

}
