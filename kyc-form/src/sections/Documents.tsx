import React from 'react';
import { Button, Form, Row, Col, Card } from 'antd';
import DocumentSection from '../components/form/DocumentsSection';

interface ContactDataProps {
  documents: Record<string, any[]>;
  onFormChange: (field: string, value: Record<string, any[]>) => void;
  onContinue: () => void;
  onGoBack: () => void;
}

const Documents: React.FC<ContactDataProps> = ({ documents, onContinue, onFormChange, onGoBack }) => {
  const onChange = (value: Record<string, any[]>) => {
    onFormChange('documents', value);
  };

  return (
    <Form layout="vertical" onFinish={onContinue}>
      <h2 className="form-section-title">Documents</h2>
      <Card style={{ backgroundColor: '#f7f7f7', marginBottom: '24px' }}>
        <p>Copies (scans) of uploaded documents must meet the following requirements:</p>
        <ul>
            <li>color, uncut, scanned with a resolution of at least 300 dpi</li>
            <li>file size should not exceed 10 MB</li>
            <li>valid formats: png, jpeg, jpg, tif, bmp, gif, pdf, doc, docx</li>
        </ul>
        <p>The document confirming your identity must contain your hand-written signature.</p>
        <p>
            It is important that all submitted documentation is legible, without image modifications or irrelevant
            subjects on it. A full-page coloured scan copy should be provided for ID documents (with clearly visible
            machine-readable zone codes if any).
        </p>
      </Card> 
      <Row gutter={24}>
        <Col span={24}>
          <DocumentSection
            title="Proof of identity"
            name="proofOfIdentity"
            documents={documents}
            onChange={onChange}
            documentDescription={[
                { title: 'Passport', description: 'a valid passport with a photograph.' },
                { title: 'Driver\'s license', description: 'if issued in the UK and contains a photograph.' },
                { title: 'National identity card', description: 'if available.' },
            ]}
          />
          <DocumentSection
            title="Proof of address"
            name="proofOfAddress"
            documents={documents}
            onChange={onChange}
            documentDescription={[
              { title: 'Utility bill', description: 'electricity, gas, water, etc.' },
              { title: 'Property deed or lease agreement', description: 'confirming your place of residence.' },
              { title: 'Letter from a government agency or bank', description: 'indicating your address.' },
            ]}
          />
          <DocumentSection
            title="Proof of income"
            name="proofOfIncome"
            documents={documents}
            onChange={onChange}
            documentDescription={[
              { title: 'Income declaration', description: 'to confirm sources of income (e.g., tax return).' },
              { title: 'Bank account statements', description: 'for the last 3-6 months, showing your address.' },
              { title: 'Salary certificate', description: 'from your employer, if applicable.' },
            ]}
          />
          <DocumentSection
            title="Other"
            name="other"
            documents={documents}
            onChange={onChange}
            documentDescription={[
              { title: 'Documents confirming sources of assets', description: 'for example, sale agreements for property.' },
              { title: 'Business documents', description: 'If the client is a business owner, additional documents may be required.' },
            ]}
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

export default Documents;
