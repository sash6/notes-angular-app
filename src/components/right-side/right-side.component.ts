import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { Globals } from '../../services/globals'
// import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.css']
})
export class RightSideComponent implements OnInit {

  date: any;
  @Output() messageToEmit = new EventEmitter<string>();
  @Input() onClickedNote;
  @Input() noteCreated;
  dataToBeShown: string;
  noteText: any;

  constructor(public globalVariables: Globals) {
    setInterval(() => {
      this.date = moment().format('LLLL')
    }, 1);   
    // this.date = formatDate(new Date(), 'dd/MM/yyyy, hh:mm a', 'en');
  }

  

  ngOnInit() {

  }

  onInputChanging(e) {
    this.messageToEmit.emit(e.target.value)
    this.noteText = e.target.value
  }

  ngOnChanges(): void {
    console.log('on ngOnChanges method in right side....')
    if (this.onClickedNote) {
      this.dataToBeShown = this.onClickedNote.note.content
    }
    if (!this.onClickedNote && this.globalVariables.isNoteCreated) {
      this.dataToBeShown = ''
      this.globalVariables.isNoteCreated = false
    }

    if (this.globalVariables.isNoteDeleted) {
      console.log('here in right side on note delete', this.globalVariables.isNoteDeleted)
      this.dataToBeShown = ''
      this.globalVariables.isNoteDeleted = false
    }
  }

}
