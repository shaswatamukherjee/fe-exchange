import {Injectable} from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ListOrderService {
    constructor(private http: Http) {}
    listOrder(start: string, size: string) {
      const params: URLSearchParams = new URLSearchParams();
      params.set('size', size);
      params.set('start', start);

      const requestOptions = new RequestOptions();
      requestOptions.params = params;

      return this.http.get('http://localhost:5001/listOrders', requestOptions)
        .map((response: Response) => {
          return response.json();
        });
    }
}
