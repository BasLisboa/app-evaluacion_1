import { Component, Injectable, OnInit } from '@angular/core';
import { SessionGuard } from '../app/session.guard';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private sessionGuard: SessionGuard,
  ) {}

  async ngOnInit() {
    this.sessionGuard.canActivate();
  }
}
