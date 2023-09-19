import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from 'src/app/laudex/estudiante/estudiante.component';

const routes: Routes = [
    {
        path: 'estudiante',
        component: EstudianteComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
 
export class LaudexRoutingModule { }