import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';

  constructor(private httpClient: HttpClient) {}


  ngOnInit() {
      // will cause additional requests (two in total)
      this.getData().subscribe();
      this.getData().subscribe();

      // will be shared using shareReplay (on in total)
      const data$ = this.getData();
      data$.subscribe();
      data$.subscribe();
      data$.subscribe();
      data$.subscribe();
      data$.subscribe();
  }


  private getData() {
    return this.httpClient.get('https://www.metaweather.com/api/location/44418/')
      .pipe(
        catchError(() => of('request failed')),
        tap(res => console.log('REQUEST CALLED:', res)),
        shareReplay(1),   
      )
  }
}
