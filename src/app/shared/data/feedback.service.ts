import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  // etape 0 : import de httpClientModule dans appModule
  // etape 1 : define the urlBackend
  urlBackend="http://localhost:3000/feedbacks/";
  // etape 2 : inject the httpClientService
  constructor(private httpClient:HttpClient) {

  }

  // etape 3 : preparer l'entite model sous le dossier model

  public createFeedback(feedback:Feedback){
    return this.httpClient.post<Feedback>(this.urlBackend,feedback);
  }

  public getFeedbacks(){
    return this.httpClient.get<Feedback[]>(this.urlBackend);
  }

  public deleteFeedback(id:number){
    return this.httpClient.delete(this.urlBackend+id);

  }

  public updateFeedback(feedback:Feedback){
    return this.httpClient.put(this.urlBackend+feedback.id,feedback);
  }
}
