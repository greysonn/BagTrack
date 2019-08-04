import * as React from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { SaleInfo } from '@/common/types';
import '@public/scss/addSale.scss';
import { ipcRenderer } from 'electron';
import { Theme } from 'react-select/src/types';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';

type SelectOption = { 
  value: 'Nike' | 'Adidas' | 'Jordan' | 'Bape' | 'Supreme' | 'Palace' | 'Yeezy' | 'Off-White Nike' | 'Converse' | 'Kith' | 'Digital Goods' | 'Other';
  label: 'Nike' | 'Adidas' | 'Jordan' | 'Bape' | 'Supreme' | 'Palace' | 'Yeezy' | 'Off-White Nike' | 'Converse' | 'Kith' | 'Digital Goods' | 'Other';
};
type AddSaleProps = {
  closeModal: any;
};
type AddSaleState = {
  productName: string;
  size: string;
  category: SelectOption;
  purchaseDate: Date;
  purchasePrice: string;
  sellPrice: string;
  fees: string;
};

/**
 * AddSale component to be used in the modal popup.
 */
export class AddSale extends React.Component<AddSaleProps, AddSaleState> {
  private categoryOptions: SelectOption[];
  constructor(props: AddSaleProps) {
    super(props);
    this.state = {
      productName: '',
      size: '',
      category: { label: 'Nike', value: 'Nike' },
      purchaseDate: new Date(),
      purchasePrice: '',
      sellPrice: '',
      fees: ''
    };

    this.categoryOptions = [
      {
        value: 'Nike',
        label: 'Nike'
      },
      {
        value: 'Adidas',
        label: 'Adidas'
      },
      {
        value: 'Jordan',
        label: 'Jordan'
      },
      {
        value: 'Bape',
        label: 'Bape'
      },
      {
        value: 'Supreme',
        label: 'Supreme'
      },
      {
        value: 'Palace',
        label: 'Palace'
      },
      {
        value: 'Yeezy',
        label: 'Yeezy'
      },
      {
        value: 'Off-White Nike',
        label: 'Off-White Nike'
      },
      {
        value: 'Converse',
        label: 'Converse'
      },
      {
        value: 'Kith',
        label: 'Kith'
      },
      {
        value: 'Digital Goods',
        label: 'Digital Goods'
      },
      {
        value: 'Other',
        label: 'Other'
      }
    ];

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <div className='add-sale'>
        <div className='title-container'>
          <div className='title'>
            <span>
              New Sale
            </span>
          </div>
          <svg onClick={this.props.closeModal} className='title-cancel'
            width='22' height='22' viewBox='0 0 22 22' fill='none'>
            <rect width='22' height='22' rx='5' fill='black' fillOpacity='0.3'/>
            <path fillRule='evenodd' clipRule='evenodd' d='M14.9125 7.08753C15.1403 7.31533 15.1403 7.68468 14.9125 7.91248L7.9125 14.9125C7.68469 15.1403 7.31535 15.1403 7.08754 14.9125C6.85974 14.6847 6.85974 14.3153 7.08754 14.0875L14.0875 7.08753C14.3153 6.85972 14.6847 6.85972 14.9125 7.08753Z' fill='white'/>
            <path fillRule='evenodd' clipRule='evenodd' d='M7.08754 7.08753C7.31535 6.85972 7.68469 6.85972 7.9125 7.08753L14.9125 14.0875C15.1403 14.3153 15.1403 14.6847 14.9125 14.9125C14.6847 15.1403 14.3153 15.1403 14.0875 14.9125L7.08754 7.91248C6.85974 7.68468 6.85974 7.31533 7.08754 7.08753Z' fill='white'/>
          </svg>
        </div>
        <div className='row'>
          <div className='col'>
            <p className='label'>Product Name</p>
            <input className='input' value={this.state.productName} name='productName'
              onChange={this.handleChange} placeholder='Yeezy Boost 350 v2 Beluga' />
          </div>
          <div className='col'>
            <p className='label'>Size</p>
            <input className='input' value={this.state.size} name='size'
              onChange={this.handleChange} placeholder='8.5' />
          </div>
          <div className='col'>
            <p className='label'>Category</p>
            <Select className='select-container' classNamePrefix='select' value={this.state.category} name='category'
              onChange={this.handleSelectChange} options={this.categoryOptions} theme={((theme: Theme) => ({
                ...theme,
                borderRadius: 4,
                colors: {
                  ...theme.colors,
                  text: '#212529',
                  primary25: '#6e51ff',
                  primary: '#6e51ff'
                },
                spacing: {
                  ...theme.spacing,
                  controlHeight: 35
                }
              }))} />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p className='label'>Purchase Date</p>
              <DatePicker
                name='purchaseDate'
                className='input'
                selected={this.state.purchaseDate}
                onChange={this.handleDateChange}
              />
          </div>
          <div className='col'>
            <p className='label'>Purchase Price</p>
            <input className='input' value={this.state.purchasePrice} name='purchasePrice'
              onChange={this.handleChange} placeholder='160' />
          </div>
          <div className='col'>
            <p className='label'>Sell Price</p>
            <input className='input' value={this.state.sellPrice} name='sellPrice'
              onChange={this.handleChange} placeholder='2230' />
          </div>
          <div className='col'>
            <p className='label'>Total Fees</p>
            <input className='input' value={this.state.fees} name='fees'
              onChange={this.handleChange} placeholder='30' />
          </div>
        </div>
        <button onClick={this.addProduct} className='add-button'>
          Create
        </button>
      </div>
    );
  }

  private addProduct(event: any): void {
    // tslint:disable: no-for-in
    const state: any = this.state;
    for (const value in state) {
      if (state[value] === '') {
        toast.error('Form is incomplete');

        return;
      }
    }
    const sale: SaleInfo = {
      product: state.productName,
      category: state.category.value,
      size: state.size,
      purchaseDate: moment(state.purchaseDate).format('D MMM YYYY'),
      purchasePrice: parseInt(state.purchasePrice),
      sellPrice: parseInt(state.sellPrice),
      netProfit: parseInt(state.sellPrice) - parseInt(state.purchasePrice) - parseInt(state.fees),
      grossProfit: parseInt(state.sellPrice) - parseInt(state.purchasePrice)
    };
    ipcRenderer.send('createSale', { sale });
  }

  private handleChange(event: any): void {
    const newState: Pick<AddSaleState, keyof AddSaleState> = { [event.target.name]: event.target.value } as Pick<AddSaleState, keyof AddSaleState>;
    this.setState(newState);
  }

  private handleDateChange(date: any) {
    this.setState({purchaseDate:date});
  }

  private handleSelectChange(selectedOption: SelectOption): void {
    this.setState({ category: selectedOption });
  }
}
