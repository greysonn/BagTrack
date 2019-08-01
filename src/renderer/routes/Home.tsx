import * as React from 'react';
import { TableItem } from '../components/tableItem';

import { SaleInfo } from '@/common/types';
import '@public/scss/home.scss';

const sales: SaleInfo[] = [{
  product: 'Off White MCA AF1',
  category: 'Off-White Nike',
  size: '8.5',
  purchaseDate: '17 Jun 2019',
  purchasePrice: 160,
  sellPrice: 2230,
  netProfit: 1864.18
},{
  product: 'Off White MCA AF1',
  category: 'Off-White Nike',
  size: '8.5',
  purchaseDate: '17 Jun 2019',
  purchasePrice: 160,
  sellPrice: 2230,
  netProfit: 1864.18
},{
  product: 'Off White MCA AF1',
  category: 'Off-White Nike',
  size: '8.5',
  purchaseDate: '17 Jun 2019',
  purchasePrice: 160,
  sellPrice: 2230,
  netProfit: 1864.18
},{
  product: 'Off White MCA AF1',
  category: 'Off-White Nike',
  size: '8.5',
  purchaseDate: '17 Jun 2019',
  purchasePrice: 160,
  sellPrice: 2230,
  netProfit: 1864.18
},{
  product: 'Cyber AIO',
  category: 'Digital Goods',
  size: 'N/A',
  purchaseDate: '17 Jun 2019',
  purchasePrice: 300,
  sellPrice: 5000,
  netProfit: 4603.40
}];

/**
 * Home component to be used as main homepage
 */
export class Home extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <div className='home'>
        <div className='container'>
          <div className='title-container'>
            <div className='title'>
              Analytic Overview
            </div>
            <button className='ml-auto add-button'>
              Add Sale
            </button>
          </div>
          <div className='summary-cards'>
            <div className='summary-card gross-profit-loss'>
              <div className='title'>
                <p>
                  Gross Profit
                </p>
              </div>
              <div className='content'>
                <p>
                  $300
                </p>
              </div>
            </div>
            <div className='summary-card net-profit-loss'>
              <div className='title'>
                <p>
                  Net Profit
                </p>
              </div>
              <div className='content'>
                <p>
                  $267.30
                </p>
              </div>
            </div>
            <div className='summary-card top-category'>
              <div className='title'>
                <p>
                  Top Category
                </p>
              </div>
              <div className='content'>
                <p>
                  Yeezy
                </p>
              </div>
            </div>
            <div className='summary-card average-sales'>
              <div className='title'>
                <p>
                  Average Sale per Week
                </p>
              </div>
              <div className='content'>
                <p>
                  1
                </p>
              </div>
            </div>
          </div>
          <div className='sales-table-container'>
            <div className='title'>
              All Sales
              <div className='divider' />
              <div className='total'>
                2 Sales
              </div>
            </div>
            <table className='sales-table'>
              <thead className='table-head'>
                <tr className='row'>
                  <td>
                    <div className='cell'>
                      <span>
                        Product
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='cell'>
                      <span>
                        Purchase Date
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='cell'>
                      <span>
                        Purchase Price
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='cell'>
                      <span>
                        Sell Price
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='cell'>
                      <span>
                        Net Profit
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='cell'>
                      <span></span>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody className='table-body'>
                {sales.map((sale: SaleInfo, index: number) => {
                  return (
                    <TableItem sale={sale} key={index} />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
