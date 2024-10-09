import React from 'react';
import { Result } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const Success: React.FC = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
      <Result
        icon={<CheckCircleOutlined style={{ fontSize: '64px', color: '#52c41a' }} />}
        title="Success! Your submission has been received."
        subTitle="Thank you for providing the necessary information. Our team has received your submission and will review it promptly. If any further action is required, we will be in touch. Your input is greatly appreciated as we work towards our project's goals."
      />
    </div>
  );
};

export default Success;
