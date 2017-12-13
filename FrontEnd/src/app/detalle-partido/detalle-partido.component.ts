import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PartidosService } from '../partidos-service/partidos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'detalle-partido',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.css']
})
export class DetallePartido implements OnInit{
  id: string;
  onematch: any;

  constructor(private route: ActivatedRoute, private service:PartidosService,private location: Location) {}

  ngOnInit() {
     this.route.params.subscribe(params => {
       this.id = params['_id'];
         });
         this.getDetallePartido(this.id);
  }

   getDetallePartido(id){
     this.service.getDetallePartido(id).subscribe(result => this.onematch=result);
   }

   goBack(){
     this.location.back();
   }

}
