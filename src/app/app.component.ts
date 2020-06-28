import { Component } from '@angular/core';
// import { RightSideComponent } from '../components/right-side/right-side.component';
import * as moment from 'moment';
import { Globals } from '../services/globals';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Notes App';
  receivedNotes: string;
  index = 1;
  notesArr: object[] = [];
  dupNotesArr: object[] = [];
  noteToBeShownOnRightSide: any;
  isNoteCreated: boolean = false;
  isNoteDeleted: boolean = false;
  storedNotes: object[] = [];
  constructor(public gobalVariables: Globals) {
    console.log('notes from local storage in app.component:::', JSON.parse(localStorage.getItem('notes')))

    // localStorage.clear() 
    let prevNotes = [];
    prevNotes = JSON.parse(localStorage.getItem('notes'));
    console.log('prevNotes:::', prevNotes)
    if (prevNotes != null && prevNotes.length > 0) {
      this.storedNotes = prevNotes
      this.dupNotesArr = prevNotes
    }

  }



  getNotesData(message: string) {
    this.receivedNotes = message
  }

  showNoteOnRightSide(noteObj: any) {
    this.noteToBeShownOnRightSide = noteObj
  }



  async saveNote() {

    var obj = {
      'content': this.receivedNotes,
      'timestamp': moment().format('LT')
    }
    this.notesArr = this.storedNotes
    this.notesArr.push(obj)
    await localStorage.setItem('notes', JSON.stringify(this.notesArr))
    this.dupNotesArr = JSON.parse(localStorage.getItem('notes'));
    // await console.log('notes from local storage:::',JSON.parse(localStorage.getItem('notes')))
    this.index += 1
    this.isNoteCreated = !this.isNoteCreated
    this.gobalVariables.isNoteCreated = true
    this.receivedNotes = 'New Note'
  }

  deleteNote() {
    var index;
    if (this.noteToBeShownOnRightSide) {
      index = this.noteToBeShownOnRightSide.index
      this.notesArr.splice(index, 1);
      this.gobalVariables.isNoteDeleted = true
    }
    this.isNoteCreated = !this.isNoteCreated;
    this.receivedNotes = 'New Note'
  }

  onChangeSearchFieldCharacters(e) {

    if (e.target.value == '') {
      this.notesArr = this.dupNotesArr
    } else {
      const options = {
        threshold: 0,
        keys: [
          'content'
        ]
      }
      // 2. Set up the Fuse instance
      let fuse = new Fuse(this.dupNotesArr, options)
      const results = fuse.search(e.target.value);

      console.log('res::::', results)
      var arr = []
      results.map(note => {
        arr.push(note.item)
      })
      this.notesArr = arr
    }
  }


}
