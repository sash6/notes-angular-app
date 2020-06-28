import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Globals } from '../../services/globals'

@Component({
  selector: 'app-notes-input',
  templateUrl: './notes-input.component.html',
  styleUrls: ['./notes-input.component.css']
})
export class NotesInputComponent implements OnInit {

  date:any;
  dataToBeShown:any;
  @Input() isNoteCreated:any;
  @Input() onClickedNote:any;
  @Output() messageToEmit = new EventEmitter<string>();
  tempVar:any;

  constructor(public globalVariablesService: Globals) {
    setInterval(() => {
      this.date = moment().format('LLLL')
    }, 1);    
  }


  ngOnInit() {
  }

  onInputChanging(e) {
    this.messageToEmit.emit(e.target.value)
    this.dataToBeShown = e.target.value
    this.tempVar = this.dataToBeShown;
  }

  ngOnChanges() {
    console.log('on ngOnChanges method in right side....', this.globalVariablesService.isNoteCreated)
    console.log('clicked note:::', this.onClickedNote)
    if(this.globalVariablesService.isNoteCreated) {
      console.log('inside................on ngOnChanges method in right side....')
      this.dataToBeShown = ''
      this.globalVariablesService.toggleNoteCreationStatus();
    }
    if(!this.globalVariablesService.isNoteCreated && this.onClickedNote == 'newnote')
      this.dataToBeShown = this.tempVar
    else if(this.onClickedNote== 'deleted')
      this.dataToBeShown = ''
    else if(this.onClickedNote)
      this.dataToBeShown = this.onClickedNote.note.content

    if(this.globalVariablesService.isNoteDeleted){
      this.dataToBeShown = ''
      this.globalVariablesService.toggleNoteDeletionStatus();
    }
  }


}
