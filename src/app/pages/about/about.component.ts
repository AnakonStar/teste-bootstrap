import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SkillCardComponent } from '../../../components/skill-card/skill-card.component';
import { SkillProps } from '../../../shared/models/Skill';

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
      description: 'Testando algumas coisas algumasalgumas algumas',
    },
    {
      id: 2,
      title: 'CSS',
      description: 'Testando algumas coisas algumasalgumas ',
    },
    {
      id: 3,
      title: 'Javascript',
      description: 'Testando algumas coisasalgumas',
    },
    {
      id: 4,
      title: 'Angular',
      description: 'Testando algumas coisas',
    },
    {
      id: 5,
      title: 'React',
      description: 'Testando algumas coisasalgumasalgumasalgumas',
    },
    {
      id: 6,
      title: 'Vue',
      description: 'Testando algumas coisasalgumasalgumas ',
    },
    {
      id: 7,
      title: 'Node',
      description: 'Testando algumas coisasalgumasalgumas',
    },
  ];
}
