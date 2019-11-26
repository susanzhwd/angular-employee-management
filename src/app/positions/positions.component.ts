import { Component, OnInit, OnDestroy } from '@angular/core';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {
  positions: Position[];
  loadingError: boolean = false;
  private getPositionsSub ;
  constructor(private positionService: PositionService, private router : Router) { }

  ngOnInit() {
    this.getPositionsSub = this.positionService.getPositions().subscribe(positions => {
      this.positions = positions;
    }, 
    e =>{
      this.loadingError = true;
    })
  }

  routePosition(id: string){
    this.router.navigate(['/position', id]);  
  }                  

  ngOnDestroy(){
    if(this.getPositionsSub){
      this.getPositionsSub.unsubscribe();
    }
  }
}
