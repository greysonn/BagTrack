import * as moment from 'moment';
import { CookieJar } from 'request';
import * as request from 'request-promise';

import { SaleInfo } from '@/common/types';
import { data } from './data';

/**
 * Stockx account manager
 */
export class Stockx {
  private jwtToken: string;
  private jar: CookieJar;
  constructor() {
    this.jar = request.jar();
  }

  public async logIn(email: string, password: string): Promise<string> {
    // tslint:disable: await-promise
    try {
      const res: request.RequestPromise = await request({
        method: 'POST',
        url: 'https://gateway.stockx.com/api/v1/login',
        headers: {
          'x-api-key': '99WtRZK6pS1Fqt8hXBfWq8BYQjErmwipa3a0hYxX',
          'content-type': 'application/json'
        },
        body: {
          email,
          password
        },
        json: true,
        jar: this.jar,
        resolveWithFullResponse: true
      });
      this.jwtToken = res.headers['jwt-authorization'];

      return this.jwtToken;
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  public async getSales(): Promise<void> {
    return;
  }

  private getCategory(name: string): SaleInfo['category'] {
    if (/yeezy/.test(name.toLowerCase())) {
      return 'Yeezy';
    } else if (/off|white/.test(name.toLocaleLowerCase())) {
      return 'Off-White Nike';
    } else if (/adidas|boost|human|race/.test(name.toLowerCase())) {
      return 'Adidas';
    } else if (/jordan/.test(name.toLowerCase())) {
      return 'Jordan';
    } else if (/nike/.test(name.toLowerCase())) {
      return 'Nike';
    } else if (/supreme/.test(name.toLowerCase())) {
      return 'Supreme';
    } else if (/bape/.test(name.toLowerCase())) {
      return 'Bape';
    } else if (/palace/.test(name.toLowerCase())) {
      return 'Palace';
    } else if (/converse/.test(name.toLowerCase())) {
      return 'Converse';
    } else if (/kith/.test(name.toLowerCase())) {
      return 'Kith';
    }

    return 'Other';
  }
}
