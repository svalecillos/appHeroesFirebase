import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe-detalle',
  templateUrl: './heroe-detalle.component.html',
})
export class HeroeDetalleComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesServices:HeroesService,
                private route: ActivatedRoute) { }

  ngOnInit() {
    //Obtiene el argumento por la url
    const id = this.route.snapshot.paramMap.get('id');

    if( id !== 'nuevo'){
      this.heroesServices.getHeroesXid( id )
          .subscribe( (resp: HeroeModel) => {
            this.heroe = resp;
            this.heroe.id = id;
          });
    }
  }
  //Metodo que guarda al heroe
  guardar( form: NgForm ){

    if (form.invalid) {
      console.log("Formulario no valido");
      return;
    }
    //Libreria que muestra un mensaje informativo
    Swal.fire({
      title: 'Espere...',
      text:'Guardando informacion',
      type:'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if( this.heroe.id ){
      peticion = this.heroesServices.actualizarHeroe(this.heroe);
    }else{
      peticion = this.heroesServices.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title:this.heroe.nombre,
        text:'Se actualizo correctamente',
        type:'success',
      });
    });

  }

}
