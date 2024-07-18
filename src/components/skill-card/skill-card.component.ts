import { Component, Input } from '@angular/core';
import { SkillProps } from '../../shared/models/Skill';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
})
export class SkillCardComponent {
  constructor() {}

  icons = {
    HTML: 'fab fa-html5',
    CSS: 'fab fa-css3-alt',
    Javascript: 'fab fa-js-square',
    Angular: 'fab fa-angular',
    React: 'fab fa-react',
    Vue: 'fab fa-vuejs',
    Node: 'fab fa-node-js',
  };

  cores = {
    HTML: '#ff552a',
    CSS: '#267fe4',
    Javascript: '#F0DB4F',
    Angular: '#DD0031',
    React: '#61DAFB',
    Vue: '#41B883',
    Node: '#3C873A',
  };

  @Input() skill: SkillProps;
}
