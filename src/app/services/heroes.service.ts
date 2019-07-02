import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesapp-8ce54.firebaseio.com';

  constructor( private http: HttpClient) { }

  crearHeroe( heroe: HeroeModel ){
    return this.http.post(`${ this.url }/heroes.json`, heroe)
            .pipe(
              map( (resp: any) => {
                heroe.id = resp.name;
                return heroe;
              })
            );
  }

  actualizarHeroe( heroe: HeroeModel ){

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }

  //Obtiene todos los heroes
  getHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
                .pipe(
                  map( resp => this.crearArreglo(resp)),
                  delay(1500) //Mil quinientos milisegundos
                );
  }

  getHeroesXid( id: string ){
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  borrarHeroe( id:string ){
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

  private crearArreglo( heroeObj: object ){
    //heroes va a ser una coleccion de heroesModels
    const heroes: HeroeModel[] = [];
    console.log(heroeObj);
    //Si heroeObj es null, retornara un arreglo vacio
    if( heroeObj == null ) { return []; }

    //Con esto extraemos el objeto para luuego agregarlo al arreglo de heroes
    Object.keys( heroeObj ).forEach( key => {
      const heroe: HeroeModel = heroeObj[key];
      heroe.id = key;
      heroes.push( heroe );
    });
    return heroes;
  }
}
