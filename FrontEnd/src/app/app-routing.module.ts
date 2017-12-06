import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetallePartido } from './detalle-partido/detalle-partido.component';
import { ListaPartidos } from './lista-partidos/lista-partidos.component';


const routes: Routes = [
  { path: '', redirectTo: 'lista-partidos', pathMatch: 'full' },
  { path: 'detail/:id', component: DetallePartido },
  { path: 'lista-partidos', component : ListaPartidos},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
