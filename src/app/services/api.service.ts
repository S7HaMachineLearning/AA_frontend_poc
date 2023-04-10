import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor, SensorResponse } from '../models/sensor';
import { Automation, AutomationResponse } from '../models/automation';

const HTTP_HEADERS = {
  headers: {
    'content-type': 'application/json',

  }
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) {
    console.warn('load')
  }

  getSensors(): Observable<SensorResponse> {
    return this.http.get<SensorResponse>(
      this.url + "/sensors",
      HTTP_HEADERS
    );
  }

  getAutomations(): Observable<AutomationResponse> {
    return this.http.get<AutomationResponse>(
      this.url + "/automations",
      HTTP_HEADERS
    );
  }

}
