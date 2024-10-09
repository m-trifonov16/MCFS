import React from 'react';
import { Form, Button, Checkbox } from 'antd';
import { FormData } from '../types/FormData';

interface ConsentProps {
  formData: FormData
  onFormChange: (field: string, value: any) => void;
  onFinish: () => void;
  onGoBack: () => void;
}

const consentOptions = [
  {
    label: 'Consent for data processing',
    description:
      'I hereby consent to the collection, processing, and storage of my personal data by [Company Name] in accordance with the General Data Protection Regulation (GDPR) and the Data Protection Act 2018. I understand that my data will be used for the purposes of providing financial services, conducting KYC procedures, and complying with legal obligations.',
    value: 'dataProcessing',
  },
  {
    label: 'Consent for data verification',
    description:
      'I consent to [Company Name] conducting necessary identity verification checks, including but not limited to, credit history checks and the verification of information from third-party sources, as required for compliance with regulatory standards and KYC procedures.',
    value: 'dataVerification',
  },
  {
    label: 'Consent for data sharing',
    description:
      'I consent to the sharing of my personal data with third parties, including regulatory bodies and other financial institutions, as required for the purposes of fulfilling legal obligations and performing necessary KYC checks. I understand that my data will be handled in accordance with applicable data protection laws.',
    value: 'dataSharing',
  },
  {
    label: 'Consent for marketing',
    description:
      'I consent to receive marketing communications from [Company Name] regarding products, services, and promotional offers. I understand that I can withdraw my consent at any time by contacting [Company Name] using the provided contact information.',
    value: 'marketing',
  },
  {
    label: 'Consent for data retention',
    description:
      'I acknowledge that my personal data will be retained by [Company Name] for the duration necessary to fulfill the purposes outlined in this consent form and in compliance with applicable laws and regulations. I understand that my data may be retained for a period following the termination of my relationship with [Company Name] as required by law.',
    value: 'dataRetention',
  },
];

const Consents: React.FC<ConsentProps> = ({ formData, onFormChange, onFinish, onGoBack }) => {
  const handleCheckboxChange = (checkedValues: any) => {
    onFormChange('consents', checkedValues);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <h2 className="form-section-title">Consents</h2>
      <Checkbox.Group
        onChange={handleCheckboxChange}
        value={formData.consents}
        style={{ width: '100%' }}
      >
        {consentOptions.map((option) => (
          <div key={option.value} style={{ marginBottom: '20px' }}>
            <Checkbox value={option.value} required>
              <strong>{option.label}</strong>
            </Checkbox>
            <p style={{ padding: "5px 25px"}}>{option.description}</p>
          </div>
        ))}
      </Checkbox.Group>

      <Form.Item className="kyc-form__buttons">
        <Button onClick={onGoBack} style={{ marginRight: '10px' }}>
          Go back
        </Button>
        <Button disabled={formData.consents.length < 5} type="primary" htmlType="submit">
          Finish
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Consents;
