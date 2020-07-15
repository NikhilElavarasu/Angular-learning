import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProcessHttpMsgService } from "../services/process-http-msg.service";
import { Dish } from "../shared/dish";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { baseURL } from "../shared/baseurl";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.processHttpMsgService.handleError));
  }

  getDish(id : string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id).pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(Dishes => Dishes[0]))
      .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }
}
