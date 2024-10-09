import React from 'react';
import { Form, Input, Button, DatePicker, Radio, Row, Col } from 'antd';
import moment from 'moment';
import CountriesSelect from '../components/form/CountriesSelect';
import { FormData } from '../types/FormData';

interface PersonalDataProps {
  formData: FormData;
  onFormChange: (field: string, value: string) => void;
  onContinue: () => void;
}

const PersonalData: React.FC<PersonalDataProps> = ({ formData, onFormChange, onContinue }) => {
  const [form] = Form.useForm();

  const birthdayMoment = formData.birthday ? moment(formData.birthday) : null;
  const passportValidityMoment = formData.passportValidity ? moment(formData.passportValidity) : null;

  return (
    <Form form={form} layout="vertical" initialValues={{ ...formData, birthday: birthdayMoment, passportValidity: passportValidityMoment }} onFinish={onContinue}>
      <h2 className="form-section-title">Personal data</h2>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="firstName" label="First name" rules={[{ required: true, message: 'Please enter your first name' }]}>
            <Input onChange={(e) => onFormChange('firstName', e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="lastName" label="Last name" rules={[{ required: true, message: 'Please enter your last name' }]}>
            <Input onChange={(e) => onFormChange('lastName', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="birthday" label="Birthday">
            <DatePicker className='datePicker' onChange={(date, dateString) => onFormChange('birthday', dateString.toString())} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="gender" label="Gender">
            <Radio.Group onChange={(e) => onFormChange('gender', e.target.value)} optionType="button">
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CountriesSelect formItemName="citizenship" label="Citizenship" onChange={(country) => onFormChange('citizenship', country)}/>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="passportId" label="Passport ID">
            <Input onChange={(e) => onFormChange('passportId', e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="passportValidity" label="Passport validity period">
            <DatePicker className='datePicker' onChange={(date, dateString) => onFormChange('passportValidity', dateString.toString())} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item className="kyc-form__buttons">
        <Button type="primary" htmlType="submit">Continue</Button>
      </Form.Item>
    </Form>
  );
};

export default PersonalData;
