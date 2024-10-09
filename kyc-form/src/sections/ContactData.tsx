import React from 'react';
import { Form, Input, Button, Select, Row, Col, DatePicker } from 'antd';
import CountriesSelect from '../components/form/CountriesSelect';
import { FormData } from '../types/FormData';

const { Option } = Select;

interface ContactDataProps {
  formData: FormData;
  onFormChange: (field: string, value: string) => void;
  onContinue: () => void;
  onGoBack: () => void;
}

const ContactData: React.FC<ContactDataProps> = ({ formData, onFormChange, onContinue, onGoBack }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" initialValues={formData} onFinish={onContinue}>
      <h2 className="form-section-title">Contact data</h2>

      <Row>
        <Col span={24}>
          <Form.Item name="streetAddress1" label="Street address line 1" rules={[{ required: true, message: 'Please enter street address' }]}>
            <Input onChange={(e) => onFormChange('streetAddress1', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item name="streetAddress2" label="Street address line 2">
            <Input onChange={(e) => onFormChange('streetAddress2', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter city' }]}>
            <Input onChange={(e) => onFormChange('city', e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="zipCode" label="ZIP/postal code" rules={[{ required: true, message: 'Please enter ZIP/postal code' }]}>
            <Input onChange={(e) => onFormChange('zipCode', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CountriesSelect formItemName="country" label="Country" onChange={(country) => onFormChange('country', country)}/>
        </Col>
        <Col span={12}>
          <Form.Item name="state" label="State">
            <Input onChange={(e) => onFormChange('state', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>


      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input onChange={(e) => onFormChange('email', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="mobilePhone" label="Mobile phone">
            <Input onChange={(e) => onFormChange('mobilePhone', e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="businessPhone" label="Business phone">
            <Input onChange={(e) => onFormChange('businessPhone', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="fax" label="Fax">
            <Input onChange={(e) => onFormChange('fax', e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="preferredContactMethod" label="Preferred method of contact">
            <Select onChange={(value) => onFormChange('preferredContactMethod', value)}>
              <Option value="Any">Any</Option>
              <Option value="Email">Email</Option>
              <Option value="MobilePhone">Mobile Phone</Option>
              <Option value="BusinessPhone">Mobile Phone</Option>
              <Option value="Fax">Fax</Option>
              <Option value="Email">Mail</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
      <Col span={12}>
          <Form.Item name="addressChangeDate" label="Effective date of adress change">
            <DatePicker className='datePicker' onChange={(date, dateString) => onFormChange('passportValidity', dateString.toString())} />
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

export default ContactData;
