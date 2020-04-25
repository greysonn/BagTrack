import * as moment from 'moment';
import * as request from 'request-promise';

import { SaleInfo } from '@/common/types';
import { data } from './data';

/**
 * Cyber account manager
 */
export class Cyber {
  public async testCookie(cookie: string): Promise<boolean> {
    try {
      const res = await request({
        method: 'GET',
        url: 'https://cybersole.io/api/checkouts',
        headers: {
          cookie: `dashboard_session=${cookie};`
        },
        qs: {
          amount: 10
        },
        json: true,
        resolveWithFullResponse: true
      });

      return res.statusCode === 200;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }

  public async getSales(cookie: string): Promise<boolean> {
    data.clearCyberSales();
    try {
      const body = await request({
        method: 'GET',
        url: 'https://cybersole.io/api/checkouts',
        headers: {
          cookie: `dashboard_session=${cookie};`
        },
        qs: {
          amount: 99999999
        },
        json: true
      });

      const sales: SaleInfo[] = [];

      for (const checkout of body) {
        sales.push({
          product: checkout.product,
          category: this.getCategory(checkout.product),
          size: checkout.size,
          purchaseDate: moment(checkout.timestamp).format('D MMM YYYY'),
          purchasePrice: parseInt((checkout.dPrice / 100).toFixed(2)),
          sellPrice: parseInt((checkout.dPrice / 100).toFixed(2)),
          netProfit: parseInt((checkout.dPrice / 100).toFixed(2)),
          grossProfit: parseInt((checkout.dPrice / 100).toFixed(2)),
          cyberCheckout: true
        });
      }
      await data.createSale(sales);

      return true;
    } catch (e) {
      console.log(e.message);
      return false;
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
