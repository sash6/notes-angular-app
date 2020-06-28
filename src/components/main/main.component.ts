import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Globals } from '../../services/globals';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'Notes App';
  notesArr: object[] = [];
  dupNotesArr: object[] = [];
  receivedNotes:any;
  noteCreated:any = false;
  noteToBeShownOnRightSide:any;
  // renderComponent:boolean=false
  constructor(public gobalVariablesService: Globals) {

    // localStorage.clear()     
    let prevNotes = JSON.parse(localStorage.getItem('notes'));
    console.log('app component constructor stored notes in local storage::::', prevNotes)
    if (prevNotes != null && prevNotes.length > 0) {
      this.notesArr = prevNotes
      this.dupNotesArr = prevNotes
    }
  }

  ngOnInit() {
  }

  getNotesData(message: string) {
    this.receivedNotes = message
  }

  showNoteOnRightSide(noteObj: any) {
    this.noteToBeShownOnRightSide = noteObj
  }

  showNewNote(message) {
    this.noteToBeShownOnRightSide = message
  }

  async saveNote() {

    var obj = {
      'content': this.receivedNotes,
      'timestamp': moment().format('LT')
    }   
    this.notesArr.push(obj)
    this.dupNotesArr =this.notesArr
    this.gobalVariablesService.updateNotesArr(this.notesArr)   
    this.gobalVariablesService.toggleNoteCreationStatus()
    this.receivedNotes = 'New Note'
    this.noteCreated=!this.noteCreated
  }

  async deleteNote() {
    var delIndex = this.gobalVariablesService.clickedIndex
    console.log('index to be removed:::', this.gobalVariablesService.clickedIndex);    
    var temp =JSON.parse(localStorage.getItem('notes'))
    console.log('before notes arr:::', temp)
    var arr= temp.filter((x,index)=> index!=delIndex)     
    this.notesArr = arr    
    console.log('after deletion notes arr:::', this.notesArr)
    this.dupNotesArr =this.notesArr
    this.gobalVariablesService.updateNotesArr(this.notesArr)
    this.gobalVariablesService.toggleNoteDeletionStatus()
    this.noteCreated=!this.noteCreated
    this.receivedNotes = null
    this.noteToBeShownOnRightSide = 'deleted'
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
