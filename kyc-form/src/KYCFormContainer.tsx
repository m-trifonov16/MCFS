import React, { useRef, useState } from 'react';
import { Layout } from 'antd';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import PersonalData from './sections/PersonalData';
import ContactData from './sections/ContactData';
import HouseholdData from './sections/HouseholdData';
import EmploymentIncome from './sections/EmploymentIncome';
import AssetsAndInvestments from './sections/AssetsAndInvestment';
import Liabilities from './sections/Liabilities';
import SourceOfWealth from './sections/SourceOfWealth';
import Notes from './sections/Notes';
import Consents from './sections/Consents';
import Documents from './sections/Documents';
import { SubmitForm } from './api/SubmitForm';
import Success from './sections/Success';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const KYCFormContainer: React.FC = () => {
  const navigationRef = useRef<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    citizenship: '',
    passportId: '',
    passportValidity: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    zipCode: '',
    country: '',
    state: '',
    email: '',
    mobilePhone: '',
    businessPhone: '',
    fax: '',
    preferredContactMethod: '',
    addressChangeDate: '',
    maritalStatus: '',
    dependentAdults: 0,
    dependentChildren: 0,
    employmentStatus: '',
    companyName: '',
    occupation: '',
    yearsEmployed: 0,
    employerCountry: '',
    sourcesOfIncome: [],
    annualIncome: 0,
    incomeCurrency: 'USD',
    assets: [],
    liabilities: [],
    sourceOfWealth: [],
    currentFundingSources: [],
    expectedFundingSources: [],
    initialFundingCountries: [],
    ongoingFundingCountries: [],
    notes: '',
    consents: [],
    documents: {}
  });

  const handleFormChange = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const onContinue = () => {
    if (navigationRef.current) {
      navigationRef.current.incrementStep();
    }
  };

  const onGoBack = () => {
    if (navigationRef.current) {
      navigationRef.current.decrementStep();
    }
  };

  const onFinish = async () => {
    await SubmitForm(formData);
    navigate("/success");
  };

  const isSuccessPage = location.pathname === '/success';

  return (
    <div className="form-container">
      {!isSuccessPage && (
        <div className="form-navigation">
          <Navigation ref={navigationRef} />
        </div>
      )}
      <Content className="layout__content">
        <div className="layout__content-wrapper">
          <Routes>
            <Route 
              path="/personal-data" 
              element={
                <PersonalData 
                  formData={formData} 
                  onFormChange={handleFormChange} 
                  onContinue={onContinue}
                />
              } 
            />
            <Route 
              path="/contact-data" 
              element={
                <ContactData 
                  formData={formData} 
                  onFormChange={handleFormChange} 
                  onContinue={onContinue}
                  onGoBack={onGoBack}
                />
              } 
            />
            <Route 
              path="/household-data" 
              element={
                <HouseholdData 
                  formData={formData} 
                  onFormChange={handleFormChange} 
                  onContinue={onContinue}
                  onGoBack={onGoBack}
                />
              } 
            />
            <Route 
              path="/employment-income" 
              element={
                <EmploymentIncome 
                  formData={formData} 
                  onFormChange={handleFormChange} 
                  onContinue={onContinue}
                  onGoBack={onGoBack}
                />
              } 
            />
            <Route 
              path="/assets" 
              element={
                <AssetsAndInvestments 
                  assets={formData.assets}
                  onFormChange={handleFormChange} 
                  onContinue={onContinue}
                  onGoBack={onGoBack}
                />
              } 
            />
            <Route 
              path="/liabilities" 
              element={
                <Liabilities 
                  assets={formData.liabilities}
                  onFormChange={handleFormChange} 
                  onContinue={onContinue}
                  onGoBack={onGoBack}
                />
              } 
            />
            <Route 
              path="/source-of-wealth" 
              element={
                <SourceOfWealth 
                  formData={formData}
                  onFormChange={handleFormChange} 
                  onContinue={onContinue}
                  onGoBack={onGoBack}
                />
              } 
            />
            <Route 
              path="/notes" 
              element={
                <Notes 
                  formData={formData}
                  onFormChange={handleFormChange} 
                  onContinue={onContinue}
                  onGoBack={onGoBack}
                />
              } 
            />
            <Route 
              path="/documents" 
              element={
                <Documents 
                  documents={formData.documents}
                  onFormChange={handleFormChange}
                  onContinue={onContinue}
                  onGoBack={onGoBack}  
                />
              } 
            />
            <Route 
              path="/consents" 
              element={
                <Consents 
                  formData={formData}
                  onFormChange={handleFormChange} 
                  onFinish={onFinish}
                  onGoBack={onGoBack}
                />
              } 
            />
            <Route 
              path="/success" 
              element={<Success/>} 
            />
          </Routes>
        </div>
      </Content>
    </div>
  );
};

export default KYCFormContainer;
