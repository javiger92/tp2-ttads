import{ Injectable } from '@angular/core';
import{ Headers, Http, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';

 @Injectable ()
 export class PartidosService {
  constructor(private http:Http){}

  private listaPartidos:string = "http://localhost:3000/api/partidos";
  private DetallePartido:string= "http://localhost:3000/api/partidos/";

 getPartidos(): Observable <any>{
  return this.http.get(this.listaPartidos).map((res:Response) => res.json());
  }

  getDetallePartido(id): Observable <any>{
    let detalle: string=this.DetallePartido+id;
    return this.http.get(detalle).map((res:Response) => res.json());
  }

 }
