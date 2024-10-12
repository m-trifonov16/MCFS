import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormData } from '../types/FormData';

interface NotesProps {
  formData: FormData;
  onFormChange: (field: string, value: any) => void;
  onContinue: () => void;
  onGoBack: () => void;
}

const { TextArea } = Input;

const Notes: React.FC<NotesProps> = ({ formData, onFormChange, onContinue, onGoBack }) => {
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onFormChange('notes', e.target.value);
  };

  console.log(formData.notes);

  return (
    <Form layout="vertical" initialValues={formData} onFinish={onContinue}>
      <h2 className="form-section-title">Notes</h2>
      
      <Form.Item name="notes">
        <TextArea
          placeholder="Type your notes here"
          onChange={handleNotesChange}
          rows={5}
          maxLength={1000}
        />
      </Form.Item>

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

export default Notes;
