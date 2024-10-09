import React from 'react';
import { Form, Checkbox, Button, Row, Col, Divider } from 'antd';
import { FormData } from '../types/FormData';
import CountriesSelect from '../components/form/CountriesSelect';

interface SourceOfWealthProps {
  formData: FormData;
  onFormChange: (field: string, value: any) => void;
  onContinue: () => void;
  onGoBack: () => void;
}

const SourceOfWealth: React.FC<SourceOfWealthProps> = ({
  formData,
  onFormChange,
  onContinue,
  onGoBack,
}) => {
  const sourceOfWealthOptions = [
    'Sold assets or business',
    'Investment growth',
    'Insurance',
    'Lottery',
    'Employment',
    'Business ownership',
    'Gift/inheritance',
    'Spousal/family support',
    'Legal settlement',
  ];

  const fundingSourcesOptions = [
    'Available cash',
    'Proceeds from business ownership',
    'Gift/inheritance',
    'Liquidation of investments',
    'Loan from financial institutions',
    'Sale of asset(s)',
    'Sale of property',
    'Internal transfer',
    'Wages/pension/social security',
    'Other',
  ];

  const handleCheckboxChange = (field: string, checkedValues: any) => {
    onFormChange(field, checkedValues);
  };

  return (
    <Form layout="vertical" onFinish={onContinue}>
      <h2 className="form-section-title">Source of wealth</h2>

      <Divider />
      <Form.Item label="Source of wealth (select all that apply)">
        <Checkbox.Group
          value={formData.sourceOfWealth}
          onChange={(checkedValues) => handleCheckboxChange('sourceOfWealth', checkedValues)}
        >
          <Row gutter={16}>
            {sourceOfWealthOptions.map((option) => (
              <Col span={12} key={option}>
                <Checkbox value={option}>{option}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Divider />
      <Form.Item label="What are your current funding sources for this account?">
        <Checkbox.Group
          value={formData.currentFundingSources}
          onChange={(checkedValues) =>
            handleCheckboxChange('currentFundingSources', checkedValues)
          }
        >
          <Row gutter={16}>
            {fundingSourcesOptions.map((option) => (
              <Col span={12} key={option}>
                <Checkbox value={option}>{option}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Divider />
      <Form.Item label="What are your expected funding sources for this account?">
        <Checkbox.Group
          value={formData.expectedFundingSources}
          onChange={(checkedValues) =>
            handleCheckboxChange('expectedFundingSources', checkedValues)
          }
        >
          <Row gutter={16}>
            {fundingSourcesOptions.map((option) => (
              <Col span={12} key={option}>
                <Checkbox value={option}>{option}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Divider />
      <Row gutter={16}>
        <Col span={24}>
          <CountriesSelect 
            onChange={(value) => onFormChange('initialFundingCountries', value)}
            formItemName="initialFundingCountries"
            label="What country(ies) will the initial funds routinely originate from?"
            selectMultiple
          />
        </Col>
        <Col span={24}>
          <CountriesSelect 
            onChange={(value) => onFormChange('ongoingFundingCountries', value)}
            formItemName="ongoingFundingCountries"
            label="What country(ies) will the ongoing funds routinely originate from?"
            selectMultiple
          />
        </Col>
      </Row>

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

export default SourceOfWealth;
