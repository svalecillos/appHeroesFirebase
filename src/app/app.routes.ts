import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeDetalleComponent } from './components/heroe-detalle/heroe-detalle.component';

const ROUTES: Routes = [
    { path: 'heroes', component:HeroesComponent },
    { path: 'heroe/:id', component:HeroeDetalleComponent },
    { path: '', pathMatch: 'full', redirectTo: 'heroes' }, //->Cualquier otra ruta redireciona al home
    { path: '**', pathMatch: 'full', redirectTo: 'heroes' }
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);