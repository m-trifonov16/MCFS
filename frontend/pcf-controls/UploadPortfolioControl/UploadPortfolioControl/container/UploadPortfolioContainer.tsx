import React, { useCallback, useState } from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';
import { ActionButton } from '@fluentui/react/lib/components/Button/ActionButton/ActionButton';
import { Dialog } from '@fsi/core-components/dist/components/containers/Dialog';
import { FileUploadField } from '@fsi/core-components/components/atoms/FileUploadField';
import { TextField } from '@fsi/core-components/components/atoms/TextField';

export interface UploadPortfolioContainerProps extends PCFContainerProps {
}

export const UploadPortfolioContainer: React.FC<UploadPortfolioContainerProps> = (
    props: UploadPortfolioContainerProps
) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [portfolioName, setPortfolioName] = useState<string | undefined>('');
    const { context, containerStyle } = props;

    const handleAddButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleUploadClick = async (file: File) => {
        const contactId = context.parameters.contactId.raw;
        const reader = new FileReader();

        reader.onload = async () => {
            const csvContent = reader.result;

            const data = {
                contactId: contactId,
                portfolioName: portfolioName,
                csv: csvContent,
            };

            try {
                const response = await fetch('https://prod-14.uksouth.logic.azure.com:443/workflows/face3a27d96641b9881759c04ee1d03c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-LTEfKAh7bRVeX04EZBTqmMGi1QGGYR17fB-wOk09jk', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                console.log('Upload successful');
                setIsModalOpen(false);
            } catch (error) {
                console.error('Upload failed', error);
            }
        };

        reader.readAsText(file);

    };

    return (
        context && (
            <PCFContainer context={context} containerStyle={containerStyle}>

                <ActionButton
                    iconProps={{ iconName: 'Add' }}
                    data-testid="add-portfolio-button"
                    onClick={handleAddButtonClick}
                >
                    Upload portfolio
                </ActionButton>

                <Dialog
                    hidden={!isModalOpen}
                    minWidth={800}
                    title={'Upload Portfolio'}
                    onDismiss={() => setIsModalOpen(false)}
                >
                    <TextField label='' placeholder='Portfolio Name' onChange={(value) => setPortfolioName(value)}/>

                    <FileUploadField id="id" onUpload={handleUploadClick} disabled={!portfolioName}>
                        Upload CSV
                    </FileUploadField>
                </Dialog>

            </PCFContainer>
        )
    );
};
export default UploadPortfolioContainer;
