import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl, FormGroup } from '@angular/forms';
import { Message, MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EstudianteService } from 'src/app/laudex/services/estudiante-service';

@Component({
  selector: 'app-crear-estudiante',
  templateUrl: './crear-estudiante.component.html',
  styleUrls: ['./crear-estudiante.component.css'],
  providers: [
    MessageService,
    ConfirmationService
  ]
})

export class CrearEstudianteComponent {
  idLblAsterisco: string = '(*)';
  idLblRequerida: string = 'requerido.';
  idLblNombre: string = 'Nombre';
  idLblApellidopaterno: string = 'Apellido Paterno';
  idLblApellidomaterno: string = 'Apellido Materno';
  idLblEmail: string = 'Email';

  emailPattern: any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

  guardarFG: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellidopaterno: ['', [Validators.required]],
    apellidomaterno: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private srvMessage: MessageService,
    private ref: DynamicDialogRef,
    private srvStudent: EstudianteService
  ) { }

  guardar() {
    this.mapearError('guardar');
    if (this.validarCampos('guardar')) {
      let form: any = this.guardarFG.value;

      let params: any = {
        nombre: form.nombre,
        apellidopaterno: form.apellidopaterno,
        apellidomaterno: form.apellidomaterno,
        email: form.email
      }

      console.log("PARAMS ::: ", params);
      this.srvStudent.create(params).subscribe((s: any) => {
        console.log("RESPONSE ::: ", s);
      });
    }
  }

  mapearError(param: any) {
    if (param === 'guardar') {
      this.guardarFG.controls['nombre'].markAsDirty();
      this.guardarFG.controls['apellidopaterno'].markAsDirty();
      this.guardarFG.controls['apellidomaterno'].markAsDirty();
      this.guardarFG.controls['email'].markAsDirty();
    }
  }

  validarCampos(peticion: string): boolean {
    if (peticion === 'guardar') {
      var form = this.guardarFG.value;

      if (form.nombre === '' || form.nombre === undefined || form.nombre === null) { return false }
      if (form.apellidopaterno === '' || form.apellidopaterno === undefined || form.apellidopaterno === null) { return false }
      if (form.apellidomaterno === '' || form.apellidomaterno === undefined || form.apellidomaterno === null) { return false }
      if (form.email === '' || form.email === undefined || form.email === null) { return false }
      if (this.guardarFG.controls['email'].valid === false) {
        this.addMessages('warn', 'El formato de Email ingresado es incorrecto.');

        setTimeout(() => {
          this.clearMessages();
        }, 4000);
      }
    }

    return true;
  }

  addMessages(tipoMensaje: string, mensaje: string) {
    if (tipoMensaje === 'success') {
      this.srvMessage.addAll([
        { severity: 'success', summary: '¡Éxito!', detail: mensaje }
      ]);
    }
    if (tipoMensaje === 'warn') {
      this.srvMessage.addAll([
        { severity: 'warn', summary: '¡Advertencia!', detail: mensaje }
      ]);
    }
  }

  clearMessages() {
    this.srvMessage.clear();
  }

  showRegresar() {
    this.ref.destroy();
  }
}