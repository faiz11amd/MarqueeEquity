import { ApiService } from './../../services/api.service';
import { URL_CONSTANTS } from './../../services/api-url.constants';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public today;

  todos: any = [];
  todoObj: any;
  formData: FormGroup;
  editable = false;
  taskList: any;
  addfield = false;
  showList = true;


  constructor(private apiService: ApiService , private route: Router, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      newTodo: [''],
      companyName: ['', Validators.required],
      cin: ['', Validators.required],
    })
    this.updateTime();
    // this.fetchTasks();

  }

  updateTime() {
    setInterval(() => {
      this.today = new Date();
    })
  }

  fetchTasks() {
    this.apiService.getRequest().subscribe((res)=> {
      this.taskList = res;
      this.showList = true;
      console.log(this.taskList, " : taskList");
    } , (err) => {
      console.log(err, " : error");
      
    })
    // this.http.get(URL_CONSTANTS.TODO.FETCH_ALL_TASK).subscribe((res) => {
    //   this.taskList = res;
    //   this.showList = true;
    //   console.log(this.taskList, " : taskList");
    // }, (err) => {
    //   console.log(err, " : error");
    // })
  }
  
  showCList() {
    this.showList = true;
  }

  reset() {
    this.showList = false;
  }

  onClickedOutside(e: Event) {
    console.log('outside click');
    
    this.reset();
  }

  insertTasks() {
    let payload = {
      companyName: this.formData.get('companyName').value,
      cin: this.formData.get('cin').value
    }

    this.apiService.postRequest(payload).subscribe((res)=>{
      console.log(res, " : service post req");
      this.fetchTasks();
    }, (err) => {
      console.log(err);
    })
    // this.http.post(URL_CONSTANTS.TODO.INSERT_TASK, payload).subscribe((res) => {
    //   console.log(res, " : post"); 
    //   this.fetchTasks();
    // }, (err) => {
    //   console.log(err);
      
    // })
  }

  selectedCompany(cname) {
    console.log(cname, " : clicked");
    
    this.formData.get('newTodo').patchValue(cname);
    this.reset();
  }

  addTodoTask(event) {
    this.insertTasks();
    if (this.formData.get('newTodo').value !== '') {
      this.todoObj = {
        newTodo: this.formData.get('newTodo').value,
        completed: false
      }
      // this.newTodo = this.formData.get('newTodo').value;
      this.todos.push(this.todoObj);
      this.formData.get('newTodo').patchValue('');
      event.preventDefault();
    }

  }



  navToClist() {
    this.route.navigate(['/clist']);
    this.insertTasks();
  }

  searchCList() {
    let payload = {
      name: this.formData.get('newTodo').value
    }
      this.http.post(`${URL_CONSTANTS.TODO.SEARCH_TASK}?name=${this.formData.get('newTodo').value}`, payload).subscribe((res) => {
        this.taskList = res;
        console.log(this.taskList, " : taskList");
      }, (err) => {
        console.log(err, " : error");
      })

  }

  addCompany() {
    this.addfield = true;
  }

  close() {
    this.addfield = false;
  }

}
