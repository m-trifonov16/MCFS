import React from 'react';
import { Form, Button, Radio, InputNumber, Row, Col } from 'antd';
import { FormData } from '../types/FormData';

interface HouseholdDataProps {
  formData: FormData;
  onFormChange: (field: string, value: any) => void;
  onContinue: () => void;
  onGoBack: () => void;
}

const HouseholdData: React.FC<HouseholdDataProps> = ({ formData, onFormChange, onContinue, onGoBack }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} initialValues={formData} onFinish={onContinue} className="household-data-form">
      <h2 className="form-section-title">Household data</h2>

      <Row>
        <Col>
          <Form.Item name="maritalStatus" label="Marital status" rules={[{ required: true, message: 'Please select marital status' }]}>
            <Radio.Group
              onChange={(e) => onFormChange('maritalStatus', e.target.value)}
              optionType="button"
            >
              <Radio.Button value="Single">Single</Radio.Button>
              <Radio.Button value="Marriage">Marriage</Radio.Button>
              <Radio.Button value="Divorce">Divorce</Radio.Button>
              <Radio.Button value="Widowhood">Widowhood</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Item
            name="dependentAdults"
            label="How many dependent adults?"
            rules={[{ required: true, message: 'Please enter number of dependent adults' }]}
          >
            <InputNumber
              min={0}
              onChange={(value) => onFormChange('dependentAdults', value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Item
            name="dependentChildren"
            label="How many dependent children?"
            rules={[{ required: true, message: 'Please enter number of dependent children' }]}
          >
            <InputNumber
              min={0}
              onChange={(value) => onFormChange('dependentChildren', value)}
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

export default HouseholdData;
