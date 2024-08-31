import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  cli_usr: string = '';
  cli_psw: string = '';
  visibleWarning: boolean = false;
  visibleSpinner: boolean = false;

  constructor(public fb: FormBuilder,private router: Router) {

    this.formularioLogin = this.fb.group({
      'nombre' : new FormControl("",Validators.required),
      'password' : new FormControl("",Validators.required)
    })

   }

  ngOnInit() {
  }


  ingresar(){
    if(this.cli_usr == "BAS" && this.cli_psw == "123"){
      this.visibleWarning = true;
      this.router.navigate(['principal'])
      this.visibleWarning = true;
    }else {
      this.visibleWarning = true;
    }
  }

}
