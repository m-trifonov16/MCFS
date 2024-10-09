import React from 'react';
import { Form, Input, Button, Select, Row, Col, Checkbox, InputNumber } from 'antd';
import { FormData } from '../types/FormData';
import CountriesSelect from '../components/form/CountriesSelect';

const { Option } = Select;

interface EmploymentIncomeProps {
  formData: FormData;
  onFormChange: (field: string, value: any) => void;
  onContinue: () => void;
  onGoBack: () => void;
}

const EmploymentIncome: React.FC<EmploymentIncomeProps> = ({ formData, onFormChange, onContinue, onGoBack }) => {
  const [form] = Form.useForm();

  const handleIncomeSourceChange = (checkedValues: any) => {
    onFormChange('sourcesOfIncome', checkedValues);
  };

  const currencyDropdown = (
    <Select value={formData.incomeCurrency} onChange={(value) => onFormChange('incomeCurrency', value)}>
        <Option value="USD">USD</Option>
        <Option value="EUR">EUR</Option>
        <Option value="GBP">GBP</Option>
    </Select>
  )

  return (
    <Form form={form} layout="vertical" initialValues={formData} onFinish={onContinue}>
      <h2 className="form-section-title">Employment/income</h2>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="employmentStatus" label="Employment" rules={[{ required: true, message: 'Please select your employment status' }]}>
            <Select onChange={(value) => onFormChange('employmentStatus', value)}>
              <Option value="Employed">Employed</Option>
              <Option value="Unemployed">Unemployed</Option>
              <Option value="Self-employed">Self-employed</Option>
              <Option value="Retired">Retired</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="companyName" label="Company name">
            <Input onChange={(e) => onFormChange('companyName', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="occupation" label="Occupation">
            <Input onChange={(e) => onFormChange('occupation', e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="yearsEmployed" label="Number of years employed here">
            <Select onChange={(value) => onFormChange('yearsEmployed', value)}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={6}>6+</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CountriesSelect 
            onChange={(value) => onFormChange('employerCountry', value)}
            formItemName="employerCountry"
            label="Employer country"
          />
        </Col>
      </Row>

      <Form.Item name="sourcesOfIncome" label="Sources of income">
        <Checkbox.Group onChange={handleIncomeSourceChange}>
          <Row>
            <Col span={8}>
              <Checkbox value="Salary/wages">Salary/wages</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Government benefits">Government benefits</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Retirement/pension">Retirement/pension</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Investments">Investments</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Interest and dividends">Interest and dividends</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Trust">Trust</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Inheritance/family wealth">Inheritance/family wealth</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Rental property">Rental property</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Annuity">Annuity</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Spousal/family support">Spousal/family support</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Self-employed income/business owner">Self-employed income/business owner</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="None">None</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="annualIncome" label="Annual income">
            <InputNumber
              addonAfter={currencyDropdown}
              min={0}
              style={{ width: '100%' }}
              onChange={(value) => onFormChange('annualIncome', value)}
            />
          </Form.Item>
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

export default EmploymentIncome;
