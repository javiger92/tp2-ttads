import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { DetallePartido } from './detalle-partido/detalle-partido.component';
import { ListaPartidos } from './lista-partidos/lista-partidos.component';
import { PartidosService } from './partidos-service/partidos.service';
import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DetallePartido,
    ListaPartidos
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [PartidosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
