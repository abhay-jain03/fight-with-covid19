import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { catchError,  } from 'rxjs/operators';
import { throwError, fromEvent, of } from 'rxjs';

export class Http {
  send_request(request) {
    return ajax(request).pipe(
      map((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.response;
        }
      }),catchError(error => {
        console.log('error: ', error);
        return of(error)}),
    );
  }

  get(url, headers = {}) {
    const request = {
      url,
      method: 'GET',
      headers,
    };
    return this.send_request(request);
  }

  post(url, data = {}, headers = {}) {
    const request = {
      url,
      method: 'POST',
      body: data,
      headers,
    };
    try{
    return this.send_request(request);
  }
  catch (e){
    console.log("dsfs",e)
  }
  }

  put(url, data = {}, headers = {}) {
    const request = {
      url,
      method: 'PUT',
      body: data,
      headers,
    };
    return this.send_request(request);
  }

  patch(url, data = {}, headers = {}) {
    const request = {
      url,
      method: 'PATCH',
      body: data,
      headers,
    };
    return this.send_request(request);
  }

  delete(url, data = {}, headers = {}) {
    const request = {
      url,
      method: 'DELETE',
      body: data,
      headers,
    };
    return this.send_request(request);
  }
}
