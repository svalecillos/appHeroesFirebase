import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor( private heroesServices:HeroesService ) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesServices.getHeroes()
      .subscribe( resp=> {
          this.heroes = resp;
          this.cargando = false;
      });
  }

  borrarHeroe( heroe: HeroeModel, index: number ){
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro de borrar a ${ heroe.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      //Si la respuesta es true
      if( resp.value ){
        //Eliminamos el elemento del arreglo
        this.heroes.splice(index, 1);
        //Eliminamos al heroe de la db
        this.heroesServices.borrarHeroe( heroe.id ).subscribe();
      }
    });
  }
}
