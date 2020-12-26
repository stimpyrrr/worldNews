import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { LoginService } from '../../services/firebase/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private firestoreService: FirestoreService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.currentUser().then(resp => {
      console.log('user logged --> ', resp.uid);
    });
    this.firestoreService.getUser('yw4fyHmjbfSn8orYXLWfTKQmu6T2');
  }
  


}