import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../services/data.service';

export interface res{
  question: string;
  title: string;
  id: number;
}

@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css']
})
export class EditquestionComponent implements OnInit {
  @Input() id: number;
  @Output() close = new EventEmitter();
  @Output() editted = new EventEmitter();

  titleValue='';
  questionValue='';
  questionId: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.showQuestion(this.id).subscribe((responseData: res)=>{ //may be remove
      this.titleValue= responseData.question;
      this.titleValue= responseData.title;
      this.questionId= responseData.id;
    })
  }

  onClose(){
    this.close.emit();
  }
  //event emitted to parent shoeQuestion
  onEditQuestionSubmit(data){
    this.dataService.editQuestion(this.questionId,data.title,data.question).subscribe((response)=>{
      this.editted.emit()
    })
  }

}
