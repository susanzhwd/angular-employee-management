import { Component, OnInit, OnDestroy } from '@angular/core';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {
  positions: Position[];
  loadingError: boolean = false;
  private getPositionsSub ;
  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.getPositionsSub = this.positionService.getPositions().subscribe(positions => {
      this.positions = positions;
    }, 
    e =>{
      this.loadingError = true;
    })
  }

  ngOnDestroy(){
    if(this.getPositionsSub){
      this.getPositionsSub.unsubscribe();
    }
  }
}
