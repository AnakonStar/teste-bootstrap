import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-masterpage',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './masterpage.component.html',
  styleUrl: './masterpage.component.scss',
})
export class MasterpageComponent {
  constructor() {}
}
