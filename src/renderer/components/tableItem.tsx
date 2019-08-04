import * as React from 'react';
import Select from 'react-select';
import { ipcRenderer } from 'electron';
import { SaleInfo } from '@/common/types';

type Action = { label: string; value: string };
type TableItemProps = {
  index: number;
  sale: SaleInfo;
};
type TableItemState = {
  selectedAction: {
    value: string;
    label: string;
  };
};

/**
 * TableItem Component
 */
export class TableItem extends React.Component<TableItemProps, TableItemState> {
  private handleSelectChange: (selectedOption: Action) => void;
  constructor(props: TableItemProps) {
    super(props);
    this.state = {
      selectedAction: {
        value: 'title', label: 'Actions'
      }
    };
    this.handleSelectChange = (selectedAction: Action): void => {
      if (selectedAction.value === 'delete') {
        ipcRenderer.send('deleteSale', this.props.index);
      }
    };
  }

  public render(): React.ReactNode {
    const { sale } = this.props;

    if (sale && sale.purchasePrice !== undefined) {
      return (
        <tr className='row'>
          <td>
            <div className='cell'>
              <p>{sale.product}</p>
              <p className='category'>{sale.category}</p>
              <p className='category'>Size {sale.size}</p>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                {sale.purchaseDate}
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                ${sale.purchasePrice.toString()}
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                ${sale.sellPrice.toString()}
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                ${sale.netProfit.toString()}
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <Select
                className='select-container'
                value={this.state.selectedAction}
                onChange={this.handleSelectChange}
                options={[
                  {
                    value: 'title', label: 'Actions'
                  },
                  {
                    value: 'delete', label: 'Delete'
                  }
                ]}
              />
            </div>
          </td>
        </tr>
      );
    } else {
      return (
        <tr><td><span>Error</span></td></tr>
      );
    }
  }
}
