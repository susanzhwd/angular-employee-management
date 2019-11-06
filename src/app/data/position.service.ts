import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Position } from "./position";

@Injectable({
  providedIn: 'root'
})

export class PositionService {
 positions: Position[];
 private url = 'https://vast-atoll-38417.herokuapp.com';
  constructor(private http: HttpClient) { }

  getPositions(): Observable<Position[]>{
    return this.http.get<Position[]>(`${this.url}/positions`)
  }
}
