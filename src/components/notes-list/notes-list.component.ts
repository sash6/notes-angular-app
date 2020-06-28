import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Globals } from '../../services/globals'

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  @Input() savedNotes: any;
  @Input() noteFromRightSide: any;  
  @Input() isNoteCreated:any;
  @Output() clickedNote = new EventEmitter<any>();
  @Output() showNewNoteEmitter = new EventEmitter<any>();
  date: any;
  id: any =[];
  newNoteBooleanVar:boolean=false;

  constructor(public globalVariablesService: Globals) {
    setInterval(() => {
      this.date = moment().format('LT')
    }, 1);
  }

  ngOnInit() {
  }

  showNewNote() {
    this.showNewNoteEmitter.emit('newnote')
  }

  ngOnChanges() {

    console.log('on ngChanges in list comp....')
    if(!this.noteFromRightSide)
      this.noteFromRightSide = 'New Note'           
  }

  showNoteContent(noteIndex) {  

    
    this.savedNotes.map((note,index) => {
      this.id[index] = false
    })  
    this.id[noteIndex] = true
    var arrLen = this.savedNotes.length
    this.globalVariablesService.getClickedIndex(arrLen-noteIndex-1)

    var obj={
      'note': this.savedNotes[arrLen-noteIndex-1],
      'index': arrLen-noteIndex-1
    }  
    this.clickedNote.emit(obj)
    this.newNoteBooleanVar = false
  }

}
