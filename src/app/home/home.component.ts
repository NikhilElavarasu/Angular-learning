import { Component, OnInit, Inject } from '@angular/core';

import { DishService } from "../services/dish.service";
import { PromotionService } from "../services/promotion.service";
import { LeaderService } from "../services/leader.service";

import { expand, flyInOut } from "../animations/app.animation";

import { Dish } from "../shared/dish";
import { Promotion } from "../shared/promotion";
import { Leader } from "../shared/leader";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    expand(),
    flyInOut(),
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion : Promotion;
  leader : Leader;
  errmess: string;

  constructor(private dishService : DishService, 
    private promotionService : PromotionService,
    private leaderService : LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe((dish) => (this.dish = dish), (errmess) => (this.errmess = <any>errmess));
    this.promotionService.getFeaturedPromotion()
      .subscribe((promo) => (this.promotion = promo), (errmess) => (this.errmess = <any>errmess));
    this.leaderService.getFeaturedLeader().subscribe((lead) => (this.leader = lead), (errmess) => (this.errmess = <any>errmess));
  }

}
