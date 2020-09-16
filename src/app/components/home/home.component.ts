import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent  {

  nuevasCanciones:any = []
  loading: boolean;
  error = false;
  errorMensaje:string;

  constructor(  private spotify:SpotifyService ) {

      this.loading = true;

      
      this.spotify.getNewRelases()
      .subscribe( (data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      }, (errorServicio:any) =>{
            this.loading = false;
            this.error = true;
            this.errorMensaje = errorServicio.error.error.message;
            console.log(errorServicio);
      });

   }

 

}
