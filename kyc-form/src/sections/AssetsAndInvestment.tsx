import React from 'react';
import { Button, Form } from 'antd';
import AssetList from '../components/form/AssetList';
import { Asset } from '../types/Asset';

const assetTypes = [
  { type: 'Checking bank accounts', tooltipText: 'Description for checking bank accounts' },
  { type: 'Savings / CD bank accounts', tooltipText: 'Description for savings / CD bank accounts' },
  { type: 'Real estate', tooltipText: 'Description for real estate' },
  { type: 'Stocks', tooltipText: 'Description for stocks' },
  { type: 'Bonds', tooltipText: 'Description for bonds' },
  { type: 'Retirement portfolio', tooltipText: 'Description for retirement portfolio' },
  { type: 'Brokerage portfolio', tooltipText: 'Description for brokerage portfolio' },
  { type: 'Discretionary portfolio', tooltipText: 'Description for discretionary portfolio' },
  { type: 'Deposit', tooltipText: 'Description for deposit' },
  { type: 'Provident fund', tooltipText: 'Description for provident fund' },
];

const currencyOptions = ['USD', 'EUR', 'GBP'];

interface AssetsAndInvestmentsProps {
    assets: Asset[],
    onFormChange: (field: string, value: Asset[]) => void;
    onContinue: () => void;
    onGoBack: () => void;
  }

const AssetsAndInvestments: React.FC<AssetsAndInvestmentsProps> = ({ onFormChange, onContinue, onGoBack, assets }) => {
  const handleAssetsChange = (newAssets: Asset[]) => {
      onFormChange('assets', newAssets);
  };

  return (
    <Form layout="vertical" onFinish={onContinue}>
      <h2 className="form-section-title">Assets and investments</h2>
      <AssetList
        items={assets}
        types={assetTypes}
        currencyOptions={currencyOptions}
        onChange={handleAssetsChange}
      />

      <Form.Item className="kyc-form__buttons">
        <Button onClick={onGoBack} style={{ marginRight: '10px' }}>
          Go back
        </Button>
        <Button type="primary" htmlType="submit">
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AssetsAndInvestments;
