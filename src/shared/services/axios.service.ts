import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../enviroments/enviroment';
import Utilitarios from '../classes/utils';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  constructor(private router: Router) {}

  public Criar() {
    var token = Utilitarios.ObterToken();

    const instance = axios.create({
      maxContentLength: 100000000,
      baseURL: environment.urlApi,
      headers: { Authorization: 'Bearer ' + token },
      validateStatus: (status) => {
        if (status == 401) {
          if (this.router.url.indexOf('login') < 0) {
            this.router.navigate(['login']);
          }
          return false;
        }

        if (status == 200 || status == 201) return true;

        return false;
      },
    });

    return instance;
  }
}
