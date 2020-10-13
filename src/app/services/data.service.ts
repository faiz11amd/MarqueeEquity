import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public selectedTasks = new Subject<any>();
  public fetchTasks = new BehaviorSubject(null);
  constructor() { }

  sendFetchTasks(event) {
    this.fetchTasks.next(event);
  }
  get getfetchTasks() {
    return this.fetchTasks.asObservable();
  }

  sendSelectedTasks(event) {
    this.selectedTasks.next(event);
  }
  get getSelectedTasks() {
    return this.selectedTasks.asObservable();
  }

}
