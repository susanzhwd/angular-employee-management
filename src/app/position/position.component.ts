import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {
  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position;
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private positionService: PositionService) { }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe(params => {
      this.positionSubscription = this.positionService.getPosition(params['_id']).subscribe(position => {
        this.position = position[0];
      });
    })
  }

  onSubmit(f: NgForm) : void {
    this.savePositionSubscription = this.positionService.savePosition(this.position).subscribe(() => {
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      }, 2500)
    }, () => {
      this.failMessage = true;
      setTimeout(() => {
        this.failMessage = false;
      }, 2500)
    })
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
    if (this.savePositionSubscription) {
      this.savePositionSubscription.unsubscribe();
    }
  }
}
