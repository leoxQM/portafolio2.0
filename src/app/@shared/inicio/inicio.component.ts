import { Component } from '@angular/core';
import { SvgGithubComponent } from "../svg-github/svg-github.component";
import { SvgGitlabComponent } from "../svg-gitlab/svg-gitlab.component";
import { SvgLinkedinComponent } from "../svg-linkedin/svg-linkedin.component";

@Component({
  selector: 'app-iconos-inicio',
  imports: [SvgGithubComponent, SvgGitlabComponent, SvgLinkedinComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
