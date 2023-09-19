import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LaudexRoutingModule } from './laudex-routing.module';
import { CrearEstudianteComponent } from './components/crear-estudiante/crear-estudiante.component';
import { EditarEstudianteComponent } from './components/editar-estudiante/editar-estudiante.component';

@NgModule({
    declarations: [
        EstudianteComponent,
        CrearEstudianteComponent,
        EditarEstudianteComponent
    ],
    imports: [
        CommonModule,
        PrimeNgModule,
        ReactiveFormsModule,
        LaudexRoutingModule
    ],
    exports: [
    ]
})

export class LaudexModule { }