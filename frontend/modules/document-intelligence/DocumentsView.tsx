import React, { FC, useMemo, useState } from 'react';
import { IDocumentRequest } from './interfaces/IDocument';
import { IDocumentsViewFetcher } from './interfaces/IDocumentsFetcher';
import DocumentList from './components/DocumentList/DocumentList';
import DocumentsSection from './components/DocumentsSection/DocumentsSection';
import { useDocumentsByContactId } from './hooks/useDocumentsByContactId';
import {
    modalOverlayProps,
    modalContentStyles,
    modalStyles,
    rootDIStyles,
    widgetDIStyles,
} from './DocumentIntelligence.style';
import { Widget } from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import { Modal } from '@fluentui/react/lib/components/Modal/Modal';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService/useNotificationService';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { DocumentDetailsReadOnlyView } from './components/DocumentDetailsView/DocumentDetailsReadonlyView';
import { ActionButton, DefaultButton, Dialog, IDropdownOption } from '@fluentui/react';
import { reviewButtonStyles } from './components/DocumentCardFooter';
import { useDeleteDocument } from './hooks/useDeleteDocument';
import { useDocumentDefinitions } from './hooks/useDocumentDefinitions';
import { Dropdown } from '@fsi/core-components/dist/components/atoms/Dropdown';
import FileUploadField from '@fsi/core-components/dist/components/atoms/FileUploadField/FileUploadField';
import { TextField } from '@fsi/core-components/components/atoms/TextField';
export interface IDocumentsViewProps {
    fetcher: IDocumentsViewFetcher;
    contactId: string;
}

export const DocumentsView: FC<IDocumentsViewProps> = ({ fetcher, contactId }) => {


    const onDeleted = () => {
        console.log('deleted');
        window.location.reload();
    }

    const { documents, isLoading, isError } = useDocumentsByContactId(contactId, fetcher);
    const {definitions, isLoading: isDefinitionsLoading} = useDocumentDefinitions(fetcher);

    const { mutate } = useDeleteDocument(fetcher, onDeleted);

    const { hide: hideNotification } = useNotificationService();

    const [viewingDocumentId, setViewingDocumentId] = useState<string | undefined>(undefined);
    const [definitionId, setDefinitionId] = useState<string | number | undefined>(undefined);
    const [documentName, setDocumentName] = useState<string | undefined>(undefined);
    const [isFileUpload, setIsFileUpload] = useState<boolean>(false);

    const onDocumentDelete = (document: IDocumentRequest, deleteRequest: boolean) => {
        console.log("onDelete", document, deleteRequest);
        mutate(
            { document, deleteRequest },
            {
                onError: () => {console.log('СМЭРТЬ')}
            }
        );
    };

    const onFileView = (document: IDocumentRequest) => {

        setViewingDocumentId(document.id);
        hideNotification();
    };

    const viewingDocument = useMemo(() => {
        if (!viewingDocumentId) {
            return undefined;
        }
        return documents.find(doc => doc.id === viewingDocumentId);
    }, [documents, viewingDocumentId]);

    const dropdownOptions: IDropdownOption[] = useMemo(
        () =>
            definitions?.map(doc => ({
                key: doc.id,
                text: doc.name,
                data: { },
            })) || [],
        [definitions]
    );    

    const handleUploadClick = async (file: File) => {
        const reader = new FileReader();

        reader.onload = async () => {
            const filecontent = reader.result;
            const base64Content = filecontent?.toString().split(',')[1];

            const data = {
                contactId: contactId,
                definitionId: definitionId,
                file: base64Content,
                filename: file.name,
                mimeType: file.type,
                name: documentName,
            };

            try {
                const response = await fetch('https://prod-06.uksouth.logic.azure.com:443/workflows/7b5aa6c434c54018b68bad577d4830b4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EQuQvwLK5-tIfqNE9sSVmMmgHoZ6top6uf_8MBqtOzA', {
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
                window.location.reload();
            } catch (error) {
                console.error('Upload failed', error);
            }
        };

        reader.readAsDataURL(file);

    };

    return (
        <Stack styles={rootDIStyles}>
            <Widget
                errorIconSize={200}
                isError={isError}
                isLoading={isLoading && isDefinitionsLoading}
                styles={widgetDIStyles}
                loadingLabel={undefined}
            >
                {!isDefinitionsLoading &&
                    <Stack>
                        <ActionButton
                            iconProps={{ iconName: 'Add' }}
                            data-testid="add-portfolio-button"
                            styles={{root: {marginLeft: 'auto',},}}
                            onClick={() => setIsFileUpload(true)}
                        >
                            Upload Document
                        </ActionButton>

                        <Dialog
                            hidden={!isFileUpload}
                            minWidth={800}
                            title={'Upload Document'}
                            onDismiss={() => setIsFileUpload(false)}
                        >
                            <Dropdown
                                options={dropdownOptions}
                                required
                                defaultValue={undefined}
                                onChange={(option: IDropdownOption) => {setDefinitionId(option?.key)}}
                                label={undefined}
                                placeholder={"Document Type"}
                            />
                            <TextField label='' placeholder='Document Name' onChange={(value) => setDocumentName(value)} styles={{root: {marginTop: '15px',},}}/>
                            <FileUploadField id="id" onUpload={handleUploadClick} disabled={!documentName && !definitionId}>
                                Upload File
                            </FileUploadField>
                        </Dialog>
                    </Stack>
                }
                <DocumentsSection key={'123'} count={documents.length} title={"Documents"}>
                    <DocumentList
                        documents={documents}
                        onFileView={onFileView}
                        onDocumentDelete={onDocumentDelete}
                        disableUpdate={!fetcher.hasDocumentPrivilege(PrivilegeType.Write)}
                        disableDelete={!fetcher.hasDocumentPrivilege(PrivilegeType.Delete)}
                        onFileUpload={() => {}}
                        showDescription={true}
                        isReadOnly={false}
                    />
                </DocumentsSection>
                <Modal
                    containerClassName={modalContentStyles.container}
                    styles={modalStyles}
                    overlay={modalOverlayProps}
                    isOpen={!!viewingDocument}
                    isBlocking={true}
                    data-testid="document-details-modal"
                    onDismiss={() => setViewingDocumentId(undefined)}
                >
                    {viewingDocument && (
                        <DocumentDetailsReadOnlyView
                            document={viewingDocument}
                            onCancel={() => setViewingDocumentId(undefined)}
                            fetcher={fetcher}
                            showDescription={true}
                            isModal
                        />
                    )}
                </Modal>
            </Widget>
        </Stack>
    );
};

export default DocumentsView;
