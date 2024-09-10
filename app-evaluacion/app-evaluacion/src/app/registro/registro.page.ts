//*******************************************************************************/
//*                                   SecGar                                    */
//*******************************************************************************/
//* Proyecto: registro WEB movil                                                   */
//* Desarrollador: Daniel Gálvez (Dan)                                         */
//* Fecha: 30-08-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Daniel Gálvez                                               */
//* Fecha: 30-08-2024                                                           */
//* Descripcion: Creacion de WEB                                                */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class registro implements OnInit {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('contrasena')?.value;
    const confirmPassword = form.get('confirmarContrasena')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario válido', this.registroForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  isPasswordMismatch() {
    return this.registroForm.errors?.['mismatch'] && this.registroForm.get('confirmarContrasena')?.touched;
  }
}