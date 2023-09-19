import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Estudiante';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigateByUrl('/laudex/estudiante');
  }
}