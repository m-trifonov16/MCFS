import React, { useEffect, useState } from 'react';
import { Form, Select, Spin } from 'antd';
import config from '../../config';

const { Option } = Select;

interface CountriesSelectProps {
  onChange: (country: string) => void;
  label?: string;
  formItemName: string;
  selectMultiple?: boolean
}

const CountriesSelect: React.FC<CountriesSelectProps> = ({
  onChange,
  label = 'Country',
  formItemName,
  selectMultiple
}) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await fetch(config.contriesUrl);
        const data = await response.json();
        const countryNames = data.map((country: any) => country.name.common);
        
        const sortedCountries = countryNames.sort((a: string, b: string) => a.localeCompare(b));

        setCountries(sortedCountries);
      } catch (error) {
        console.error('Failed to fetch countries', error);
      }
      setLoadingCountries(false);
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (value: string) => {
    onChange(value);
  };

  return (
      <Form.Item name={formItemName} label={label}>
        {loadingCountries ? (
          <Spin />
        ) : (
          <Select onChange={handleCountryChange} placeholder="Select a country" mode={selectMultiple ? 'multiple' : undefined}>
            {countries.map((country) => (
              <Option key={country} value={country}>
                {country}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
  );
};

export default CountriesSelect;
