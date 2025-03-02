import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc } from '@angular/fire/firestore';
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
    
    return onSnapshot(this.getTrashRef(),
      (list) => {
      this.trashNotes= [];
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id))
      });
    })
  }

  subNotesList() {
    return onSnapshot(this.getNotesRef(),
      (list) => {
        this.normalNotes= [];
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

  async updateNote(docID: string, colID: string, item: {}) {
    await updateDoc(this.getSingleDoc(colID, docID), item).catch(
      (err) => { console.error(err)}
    )
  }

  async addNote(item: Note) {
    await addDoc(this.getNotesRef(), item).catch(
      (err) => { console.error(err) }
    ).then((docRef) => {
      console.log("Document written with ID:", docRef?.id);
    })
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getNotesRef() {
    return collection(this.firestore, 'Notes');
  }

  getSingleDoc(colID: string, docId: string) {
    return doc(collection(this.firestore, colID), docId)
  }

}

