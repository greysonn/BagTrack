import * as moment from 'moment';
import { CookieJar } from 'request';
import * as request from 'request-promise';

import { StockxSale, StockxUser, SalesResponse } from '@/common/stockx';
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
        url: 'https://stockx.com/api/login',
        headers: {
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
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
      const body: StockxUser = JSON.parse(JSON.stringify(res.body));
      data.setSetting('stockxUserId', body.Customer.id);

      return this.jwtToken;
    } catch (e) {
      return '';
    }
  }

  public async getSales(): Promise<void> {
    data.clearStockxSales();
    let page: number = 1;
    let paging: boolean = true;
    while (paging) {
      try {
        const res: SalesResponse = await request({
          method: 'GET',
          url: `https://stockx.com/api/customers/${data.getSettings().stockxUserId}/selling/history`,
          qs: {
            sort: 'matched_with_date',
            order: 'DESC',
            limit: '100',
            page: page.toString(),
            currency: 'USD'
          },
          json: true,
          headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
            'jwt-authorization': this.jwtToken
          },
          jar: this.jar
        });
        const sales: SaleInfo[] = [];

        if (!res.Pagination.total) {
          paging = false;

          return;
        }

        for (const order of res.PortfolioItems) {
          if (order.text === 'Sale Complete') {
            sales.push({
              product: order.product.title,
              category: this.getCategory(order.product.title),
              size: order.product.shoeSize || 'One Size',
              purchaseDate: moment(order.product.releaseDate).format('D MMM YYYY'),
              purchasePrice: parseInt((order.product.retailPrice).toFixed(2)),
              sellPrice: parseInt((order.amount).toFixed(2)),
              netProfit: parseInt((order.localAmount - order.product.retailPrice).toFixed(2)),
              grossProfit: parseInt((order.amount - order.product.retailPrice).toFixed(2)),
              stockxSale: true
            });
          }
        }
        await data.createSale(sales);
        page++;
      } catch (e) {
        console.error(e);
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
