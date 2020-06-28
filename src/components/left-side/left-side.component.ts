import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit {

  notesData: any;
  // index:any;
  id: any =[];
  newNoteBooleanVar: boolean = true;

  @Input() notesFromRightSide: string ;
  @Input() savedNotes: string[] =[];
  @Input() key:any;
  @Output() clickedNote = new EventEmitter<any>();
  savedNotesArr:string[] =[];
  date:any;
  constructor() { 
    let prevNotes = []; 
    prevNotes = JSON.parse(localStorage.getItem('notes'));    
    if(prevNotes!=null && prevNotes.length>0)
      this.savedNotesArr = JSON.parse(localStorage.getItem('notes')) 

    this.start();
    setInterval(() => {
      this.date = moment().format('LT')
    }, 1);
   }

   ngOnChanges(): void {
    this.newNoteBooleanVar = true  
    // console.log('ngOnChanges:::: in left side')    
    if (this.notesFromRightSide == null) {
       this.notesFromRightSide = 'New Note';
    }
    //  }else    
    //   this.savedNotesArr = this.savedNotes
    if(this.savedNotes.length>0)
      this.savedNotesArr = this.savedNotes
    else
      this.savedNotesArr = JSON.parse(localStorage.getItem('notes'))
   }

   private start(): void {
    console.log('event listener starts....')
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    console.log('storageEventListener....')
    if (event.storageArea == localStorage) {
      let v;
      try { v = JSON.parse(event.newValue); }
      catch (e) { v = event.newValue; }
    }
  }

  private stop(): void {
    console.log('event listener ends....')
    window.removeEventListener("storage", this.storageEventListener.bind(this));    
  }
  

  ngOnDestroy() {
    this.stop();
  }


  ngOnInit() {
    console.log('notesFromRightSide::::', this.notesFromRightSide)    
  }

  showNewNote() {
    this.newNoteBooleanVar =true
    this.savedNotesArr.map((note,index) => {
      this.id[index] = false
    }) 
  }

  showNoteContent(noteIndex) {  
    this.savedNotesArr.map((note,index) => {
      this.id[index] = false
    })  
    this.id[noteIndex] = true
    var arrLen = this.savedNotesArr.length
    var obj={
      'note': this.savedNotesArr[arrLen-noteIndex-1],
      'index': arrLen-noteIndex-1
    }  
    this.clickedNote.emit(obj)
    this.newNoteBooleanVar = false
  }

}
