import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { IsLoginGuard } from 'src/app/guards/is-login.guard';
import { FavouritesComponent } from 'src/app/components/core/favourites/favourites.component';

const routes: Routes = [
  {
    path: '',
    component: FavouritesComponent
    // canActivate: [IsLoginGuard]   
  }
];

@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule    
  ]
})
export class FavouritesModule { }
