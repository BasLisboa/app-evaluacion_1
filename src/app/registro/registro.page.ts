import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;
  Alerta: boolean = false;
  visibleSpinner: boolean = false;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.registroForm = this.fb.group({
      nombre: new FormControl("", Validators.required),
      password1: new FormControl("", Validators.required),
      password2: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  /*registro() {
    if (this.registroForm.invalid) {
      this.Alerta = true;
      this.mensajeError = 'Todos los campos son obligatorios y deben ser válidos.';
      return;
    }

    const nombre = this.registroForm.get('nombre').value.trim();
    const password1 = this.registroForm.get('password1').value.trim();
    const confirmarPsw = this.registroForm.get('password2').value.trim();

    if (password1 !== confirmarPsw) {
      this.Alerta = true;
      this.mensajeError = 'Las contraseñas no coinciden.';
    } else {
      this.Alerta = false;
      this.visibleSpinner = true;

      const formData = { nombre,password: password1 };

      // Lógica para manejar el registro usando sharedDataService
      this.sharedDataService.registrarUsuario(formData).subscribe(
        response => {
          this.visibleSpinner = false;
          this.router.navigate(['/login']);
        },
        error => {
          this.visibleSpinner = false;
          this.Alerta = true;
          this.mensajeError = 'Error al registrar el usuario';
        }
      );
    }
  }*/

  goBack() {
    this.router.navigate(['/login']);
  }
}