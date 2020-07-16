import { Component, OnInit } from '@angular/core';
import { LeaderService } from "../services/leader.service";
import { Leader } from "../shared/leader";
import { expand, flyInOut } from "../animations/app.animation";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
  },
  animations: [
    expand(),
    flyInOut(),
  ]
})
export class AboutComponent implements OnInit {

  leaders : Leader[];

  constructor(private leaderService : LeaderService) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe((lead) => (this.leaders = lead));
  }

}
