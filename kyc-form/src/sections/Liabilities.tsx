import React from 'react';
import { Button, Form } from 'antd';
import AssetList from '../components/form/AssetList';
import { Asset } from '../types/Asset';

const assetTypes = [
  { type: 'Mortgage', tooltipText: 'Description for mortgage' },
  { type: 'Personal loan', tooltipText: 'Description for personal loan' },
  { type: 'Credit card debt', tooltipText: 'Description for credit card debt' },
  { type: 'Student loan', tooltipText: 'Description for student loan' },
  { type: 'Car loan', tooltipText: 'Description for car loan' },
  { type: 'Other liabilities', tooltipText: 'Description for other liabilities' },
];

const currencyOptions = ['USD', 'EUR', 'GBP'];

interface LiabilitiesProps {
    assets: Asset[],
    onFormChange: (field: string, value: Asset[]) => void;
    onContinue: () => void;
    onGoBack: () => void;
  }

const Liabilities: React.FC<LiabilitiesProps> = ({ onFormChange, onContinue, onGoBack, assets }) => {
  const handleAssetsChange = (newAssets: Asset[]) => {
      console.log(newAssets);
      onFormChange('liabilities', newAssets);
  };

  return (
    <Form layout="vertical" onFinish={onContinue}>
      <h2 className="form-section-title">Liabilities</h2>
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

export default Liabilities;
