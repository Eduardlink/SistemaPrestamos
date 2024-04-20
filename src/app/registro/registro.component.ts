import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      // Aquí puedes enviar los datos del formulario al servidor
      console.log(this.registroForm.value);
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}