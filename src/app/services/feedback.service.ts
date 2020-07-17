import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProcessHttpMsgService } from "./process-http-msg.service";

import { Feedback } from "../shared/feedback";
import { baseURL } from "../shared/baseurl";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService) { }

  submitFeedback(feedback: Feedback): Observable<Feedback>{
    const HttpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<Feedback>(baseURL + 'feedback', feedback, HttpOptions)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
