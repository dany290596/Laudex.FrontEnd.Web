import { Component, OnInit } from '@angular/core';
import { EditarEstudianteComponent } from 'src/app/laudex/components/editar-estudiante/editar-estudiante.component';
import { EstudianteService } from 'src/app/laudex/services/estudiante-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrearEstudianteComponent } from 'src/app/laudex/components/crear-estudiante/crear-estudiante.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
  providers: [MessageService, ConfirmationService, DialogService]
})

export class EstudianteComponent implements OnInit {
  dataStudent: [] = [];
  selectedProducts: [] = [];

  constructor(
    private srvStudent: EstudianteService,
    private srvDialog: DialogService
  ) { }

  ngOnInit(): void {
    this.srvStudent.getAll().subscribe((s: any) => {
      console.log("GET ALL ::: ", s);
      this.dataStudent = s;
    });
  }

  deleteSelectedStudent() {
    console.log("ARREGLO TEMPORAL ::: ", this.selectedProducts);
    this.selectedProducts.forEach((e: any) => {
      this.srvStudent.delete(e.id).subscribe((s: any) => {
        console.log("RESPONSE ::: ", s);
      });
    });
  }

  showStudent() {
    // this.product = {};
    // this.submitted = false;
    // this.productDialog = true;
    const modal = this.srvDialog.open(CrearEstudianteComponent, {
      header: 'Agregar - Estudiante',
      width: '40%',
      // height: '80%',
      contentStyle: { overflow: 'auto' },
      // baseZIndex: 10000,
      data: ''
    });

    modal.onClose.subscribe((value: any) => {
      //console.log("ONCLOSE ::: ", value);
      // if (value === '' || value === null || value === undefined) {
      // } else {
      //   if (value.length === 0) {
      //   } else {
      //     this.mapearFiltros.emit(value);
      //   }
      // }
    });
  }

  showUpdate(e: any) {
    console.log("EVENT ::: ", e);
    // this.product = {};
    // this.submitted = false;
    // this.productDialog = true;
    const modal = this.srvDialog.open(EditarEstudianteComponent, {
      header: 'Agregar - Estudiante',
      width: '40%',
      // height: '80%',
      contentStyle: { overflow: 'auto' },
      // baseZIndex: 10000,
      data: e.id
    });

    modal.onClose.subscribe((value: any) => {
      //console.log("ONCLOSE ::: ", value);
      // if (value === '' || value === null || value === undefined) {
      // } else {
      //   if (value.length === 0) {
      //   } else {
      //     this.mapearFiltros.emit(value);
      //   }
      // }
    });
  }

  showDelete(e: any) {
    console.log("EVENT ::: ", e.id);
    this.srvStudent.delete(e.id).subscribe((s: any) => {
      console.log("RESPONSE ::: ", s);
    });
  }
}