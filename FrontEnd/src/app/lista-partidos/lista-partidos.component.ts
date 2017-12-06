import { Component, Input, OnInit} from '@angular/core';
import { PartidosService } from '../partidos-service/partidos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lista-partidos',
  templateUrl: './lista-partidos.component.html',
  styleUrls: ['./lista-partidos.component.css']
})
export class ListaPartidos implements OnInit{
  partidos:any;
  constructor(private service:PartidosService, private router: ActivatedRoute) {}

  ngOnInit() {
       this.service.getPartidos().subscribe(result=>this.partidos=result);
     }
}
