import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PartidosService } from '../partidos-service/partidos.service';

@Component({
  selector: 'detalle-partido',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.css']
})
export class DetallePartido implements OnInit{
  id: number;
  detallePartido: any;

  constructor(private route: ActivatedRoute, private service:PartidosService) {}

  ngOnInit() {
     this.route.params.subscribe(params => {
       this.id = +params['id'];
         });
         this.getDetallePartido(this.id);
  }

   getDetallePartido(id){
     this.service.getDetallePartido(id).subscribe(result => this.detallePartido=result);
   }

}
