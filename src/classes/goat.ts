import * as moment from 'moment';
import { CookieJar } from 'request';
import * as request from 'request-promise';

import { Order } from '@/common/goat';
import { SaleInfo } from '@/common/types';
import { data } from './data';
import { ipcMain } from 'electron';

/**
 * Goat account manager
 */
export class Goat {
  private authToken: string;
  private jar: CookieJar;
  constructor() {
    this.jar = request.jar();
  }

  public async logIn(username: string, password: string): Promise<string> {
    // tslint:disable: await-promise
    try {
      const res: request.RequestPromise = await request({
        method: 'POST',
        url: 'https://www.goat.com/api/v1/users/sign_in',
        headers: {
          'User-Agent': 'GOAT/2.17.0 (iPhone; iOS 11.3; Scale/3.00) Locale/en',
          'content-type': 'application/x-www-form-urlencoded'
        },
        formData: {
          'user[login]': username,
          'user[password]': password
        },
        resolveWithFullResponse: true,
        jar: this.jar
      });
      this.authToken = JSON.parse(res.body.toString()).authToken;

      return this.authToken;
    } catch (e) {
      return '';
    }
  }

  public async getSales(): Promise<void> {
    data.clearGoatSales();
    let page: number = 1;
    let paging: boolean = true;
    while (paging) {
      try {
        const res: request.RequestPromise = await request({
          method: 'GET',
          url: 'https://www.goat.com/api/v1/orders',
          qs: {
            filter: 'sell',
            page
          },
          headers: {
            Authorization: `Token token="${this.authToken}"`,
            'User-Agent': 'GOAT/2.17.0 (iPhone; iOS 11.3; Scale/3.00) Locale/en'
          },
          jar: this.jar,
          resolveWithFullResponse: true
        });

        const orders: Order[] = JSON.parse(res.body.toString()).orders;
        const sales: SaleInfo[] = [];

        if (!orders.length) {
          paging = false;

          return;
        }

        for (const order of orders) {
          if (order.product.saleStatus === 'completed') {
            sales.push({
              product: order.product.productTemplate.name,
              category: this.getCategory(order.product.productTemplate.name),
              size: order.product.size.toString(),
              purchaseDate: moment(order.product.productTemplate.releaseDate).format('D MMM YYYY'),
              purchasePrice: parseInt((order.product.productTemplate.specialDisplayPriceCents / 100).toFixed(2)),
              sellPrice: parseInt((order.priceCents / 100).toFixed(2)),
              netProfit: parseInt((order.sellerAmountMadeCents / 100 - order.product.productTemplate.specialDisplayPriceCents / 100).toFixed(2)),
              grossProfit: parseInt((order.priceCents / 100 - order.product.productTemplate.specialDisplayPriceCents / 100).toFixed(2)),
              goatSale: true
            });
          }
        }
        await data.createSale(sales);
        page++;
      } catch (e) {
        console.error(e.statusCode);
        paging = false;
      }
    }
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
