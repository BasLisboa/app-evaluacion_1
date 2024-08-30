import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public myForm: FormGroup; // Crea un FormGroup para el formulario
  public nombre = new FormControl('');
  
  constructor(private activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      
    });
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  submitForm() {
    // Aquí puedes manejar la lógica cuando se envía el formulario
    console.log(this.myForm.value);
  }
}
