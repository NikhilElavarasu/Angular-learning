import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Promotion } from "../shared/promotion";
import { ProcessHttpMsgService } from "./process-http-msg.service";
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(catchError(this.processHttpMsgService.handleError));
  }

  getPromotion(id : string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id).pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(promo => promo[0]))
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

}
