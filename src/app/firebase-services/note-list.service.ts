import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';



@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  //unsubSingle
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  firestore: Firestore = inject(Firestore);
  unsubNotes;
  unsubTrash;

  constructor() {
    this.unsubNotes = this.subNotesList();
    this.unsubTrash = this.subTrashList()
  }

  ngonDestroy() {
    this.unsubNotes();
    this.unsubTrash();
  }

  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id))
      });
    })
  }

  subNotesList() {
    return onSnapshot(this.getNotesRef(),
    (list) => {
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id))
      });
    });
  }

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id || "",
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false
    }
  }


  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getNotesRef() {
    return collection(this.firestore, 'Notes');
  }

  getSingleTrashDoc(colID: string, docId: string) {
    return doc(collection(this.firestore, colID), docId)
  }

}

