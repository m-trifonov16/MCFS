import React, { useState } from 'react';
import { Form, Select, InputNumber, Button, Row, Col, Tooltip } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Asset {
  type: string;
  amount: number;
  currency: string;
  tooltipText: string;
}

interface AssetListProps {
  items: Asset[];
  types: { type: string; tooltipText: string }[];
  currencyOptions: string[];
  onChange: (assets: Asset[]) => void;
}

const AssetList: React.FC<AssetListProps> = ({ types, currencyOptions, onChange, items }) => {
  const [assets, setAssets] = useState<Asset[]>(items);

  const handleAddAsset = () => {
    setAssets([...assets, { type: '', amount: 0, currency: 'USD', tooltipText: '' }]);
  };

  const handleDeleteAsset = (index: number) => {
    const newAssets = assets.filter((_, i) => i !== index);
    setAssets(newAssets);
    onChange(newAssets);
  };

  const handleAssetChange = (index: number, field: keyof Asset, value: any) => {
    const newAssets = [...assets];

    if (field === 'type') {
      newAssets[index].type = value as string;
      const selectedItem = types.find((item) => item.type === value);
      if (selectedItem) {
        newAssets[index].tooltipText = selectedItem.tooltipText;
      }
    } else if (field === 'amount') {
      newAssets[index].amount = value as number;
    } else if (field === 'currency') {
      newAssets[index].currency = value as string;
    }

    setAssets(newAssets);
    onChange(newAssets);
  };

  return (
    <Form layout="vertical">
      {assets.map((asset, index) => (
        <Row gutter={16} key={index} style={{ marginBottom: '16px' }} align="middle">
          <Col span={8}>
            {asset.type ? (
              <Form.Item>
                <div>
                  <span>{asset.type}</span>
                  <Tooltip title={asset.tooltipText}>
                    <InfoCircleOutlined style={{ marginLeft: '8px' }} />
                  </Tooltip>
                </div>
              </Form.Item>
            ) : (
              <Form.Item>
                <Select
                  placeholder="Select type"
                  onChange={(value) => handleAssetChange(index, 'type', value)}
                >
                  {types.map((item) => (
                    <Option key={item.type} value={item.type}>
                      <Tooltip title={item.tooltipText}>
                        <span>
                          {item.type} <InfoCircleOutlined />
                        </span>
                      </Tooltip>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Col>

          <Col span={12}>
            <Form.Item>
              <InputNumber
                addonAfter={(
                  <Select
                    value={asset.currency}
                    onChange={(value) => handleAssetChange(index, 'currency', value)}
                  >
                    {currencyOptions.map((currency) => (
                      <Option key={currency} value={currency}>
                        {currency}
                      </Option>
                    ))}
                  </Select>
                )}
                min={0}
                style={{ width: '100%' }}
                onChange={(value) => handleAssetChange(index, 'amount', value)}
                value={asset.amount}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item>
                <Button
                    type="primary"
                    style={{ width: '100%' }}
                    ghost
                    onClick={() => handleDeleteAsset(index)}
                >
                    Delete
                </Button>
            </Form.Item>
          </Col>
        </Row>
      ))}

      <Form.Item>
        <Button type="dashed" onClick={handleAddAsset} icon={<PlusOutlined />} style={{ width: '100%' }}>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AssetList;
