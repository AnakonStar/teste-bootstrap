import { Component, Input } from '@angular/core';
import { SkillProps } from '../../dtos/Skill';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
})
export class SkillCardComponent {
  constructor() {}

  @Input() skill: SkillProps;
}
