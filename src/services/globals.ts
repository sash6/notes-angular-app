// globals.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class Globals {
    isNoteCreated: boolean = false;
    isNoteDeleted:boolean = false;
    updateNotes:any=[];
    clickedIndex:any;

    isNoteCreatedChange: Subject<boolean> = new Subject<boolean>();
    isNoteDeletedChange: Subject<boolean> = new Subject<boolean>();
    updateSavedNotes: Subject<any> = new Subject<any>();
    clickedIndexChange: Subject<any> = new Subject<any>();

    constructor()  {
        this.isNoteCreatedChange.subscribe((value) => {
            this.isNoteCreated = value
        });
        this.isNoteDeletedChange.subscribe((value) => {
            this.isNoteDeleted = value
        });
        this.updateSavedNotes.subscribe((arr) => {
            this.updateNotes=arr
        })
        this.clickedIndexChange.subscribe((index) => {
            this.clickedIndex= index
        })
    }

    getClickedIndex(index) {
        console.log('index:::', index)
        this.clickedIndexChange.next(index)        
    }

    async toggleNoteCreationStatus() {
        await this.isNoteCreatedChange.next(!this.isNoteCreated);
        console.log('creation status:::', this.isNoteCreated)
    }

    async toggleNoteDeletionStatus() {
        await this.isNoteDeletedChange.next(!this.isNoteDeleted);
        console.log('Deletion status:::', this.isNoteDeleted)
    }

   async updateNotesArr(notes) {
       this.updateNotes=notes
        await this.updateSavedNotes.next(this.updateNotes);
        console.log('updated notes::::', this.updateNotes)
        await localStorage.setItem('notes', JSON.stringify(notes))
   }
}