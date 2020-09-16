import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private htpp: HttpClient) { 
    console.log('Spotify service listo');
  }

  getQuery( query: string){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization':'Bearer BQA0jkyp7JwBI3HhYF65NJatP85UOYXqr4hBI2zOqgIkz9dZZi_UnT90L83z1t7El1GvyN7FjNhhRap_Q8s'
    });

    return this.htpp.get(url, { headers });
  }

  getNewRelases() {
    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( data=> data['albums'].items));
  }

  getArtistas( termino:string){
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
              .pipe( map( data => data['artists'].items));
  }

  getArtista( id:string){
    return this.getQuery(`artists/${ id }`);
              //.pipe( map( data => data['artists'].items));
  }

  getTopTracks( id:string){
    return this.getQuery(`artists/${ id }/top-tracks?=country=us`)
               .pipe( map( data => data['tracks']));
  }

}
