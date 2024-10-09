import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';

interface DocumentDescription {
  title: string;
  description: string;
}

interface DocumentSectionProps {
  title: string;
  name: string;
  documents: Record<string, any[]>;
  onChange: (newDocuments: Record<string, any[]>) => void;
  documentDescription?: DocumentDescription[];
}

const DocumentSection: React.FC<DocumentSectionProps> = ({
  title,
  name,
  documents,
  onChange,
  documentDescription = [],
}) => {

  const handleUploadChange = (info: any) => {
    if (info.file.status === 'removed') {
      const newDocuments = { ...documents };
      newDocuments[name] = newDocuments[name]?.filter((doc: any) => doc.name !== info.file.name);
      onChange(newDocuments);
    }
  };

  const beforeUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64Data = reader.result as string;
        const newFileObject = {
          base64Content: base64Data.split(',')[1],
          mimeType: file.type,
          name: file.name,
        };

        // Update documents state
        const newDocuments = { ...documents };
        newDocuments[name] = newDocuments[name] ? [...newDocuments[name], newFileObject] : [newFileObject];
        onChange(newDocuments);

        resolve(); // Resolve when done
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(error); // Reject if error occurs
      };
    });
  };

  return (
    <div className='documents-section-container'>
      <h2>{title}</h2>
      {documentDescription.length > 0 && (
        <>
          <p>Please upload the following documents:</p>
          <ol style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            {documentDescription.map((doc, index) => (
              <li key={index}>
                <strong>{doc.title}:</strong> {doc.description}
              </li>
            ))}
          </ol>
        </>
      )}

      <Dragger
        onChange={handleUploadChange}
        fileList={documents[name]}
        multiple
        maxCount={5}
        beforeUpload={beforeUpload}
        customRequest={() => {}}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">You can upload a maximum of 5 files</p>
      </Dragger>
    </div>
  );
};

export default DocumentSection;
