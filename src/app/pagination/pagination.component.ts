import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionResponse } from '../models/questionsresponse.model'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() questionResponse: QuestionResponse
  @Output() pageNumberEmitter = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  //generating array of indexes
  generateArray(n:number): number[]{
    return [...Array(n).keys()]
  }

  //emit the event
  pageChangeHandler(pageNum:number){
    this.pageNumberEmitter.emit(pageNum)
  }

}
