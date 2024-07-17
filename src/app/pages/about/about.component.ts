import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SkillCardComponent } from '../../../components/skill-card/skill-card.component';
import { SkillProps } from '../../../dtos/Skill';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SkillCardComponent, NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  skills: SkillProps[] = [
    {
      id: 1,
      title: 'HTML',
      description: 'Testando algumas coisas',
    },
    {
      id: 1,
      title: 'CSS',
      description: 'Testando algumas coisas',
    },
  ];
}
