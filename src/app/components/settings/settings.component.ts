import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  companyName: string;
  cin: number;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  displayedColumns: string[] = ['companyName', 'cin'];
  dataSource;


  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get(`http://localhost:4000/clist`).subscribe((res) => {
      // let ELEMENT_DATA: PeriodicElement[];
      this.dataSource = res;
      console.log(this.dataSource, " : dataSource");
    }, (err) => {
      console.log(err, " : error");
    })
  }

  backToHome() {
    this.route.navigate(['/home']);
  }

}
