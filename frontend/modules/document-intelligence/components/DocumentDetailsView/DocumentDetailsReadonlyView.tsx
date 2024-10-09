import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Text } from '@fluentui/react/lib/components/Text/Text';
import {
    documentDetailsHeaderIconProps,
    documentDetailsHeaderStyles,
    documentDetailsHeaderTextStyles,
    documentDetailsViewInnerStyles,
    documentDetailsViewStyles,
    documentFileContentStyles,
} from './DocumentDetailsView.style';
import { IDocumentDetailsReadOnlyViewProps } from './DocumentDetailsView.interface';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useDocumentFile } from '../../hooks/useDocumentFile';
import DocumentFileContent from '../DocumentFileContent/DocumentFileContent';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import DocumentEmptyFileState from '../DocumentEmptyFileState/DocumentEmptyFileState';

export const DocumentDetailsReadOnlyView: FC<IDocumentDetailsReadOnlyViewProps> = ({
    document,
    onCancel,
    fetcher,
    isModal,
}) => {
    const translate = useTranslation(DI_NAMESPACE);
    const commonTranslate = useTranslation();

    const { file, isError, isLoading } = useDocumentFile(fetcher, document.documentId);
    const { name } = document;

    return (
        <Stack styles={documentDetailsViewStyles}>
            {isModal && (
                <Stack horizontal horizontalAlign="space-between" styles={documentDetailsHeaderStyles}>
                    <Stack horizontal verticalAlign="center">
                        <Text styles={documentDetailsHeaderTextStyles}>{name}</Text>
                    </Stack>
                    <IconButton
                        aria-label={translate('CLOSE')}
                        iconProps={documentDetailsHeaderIconProps}
                        data-testid="cancel-button"
                        onClick={onCancel}
                    />
                </Stack>
            )}

            <Stack horizontal styles={documentDetailsViewInnerStyles} verticalAlign="start">
                <Stack grow={1} verticalAlign="center" verticalFill horizontalAlign="center" styles={documentFileContentStyles}>
                    {document.documentId ? (
                        <DocumentFileContent label={translate('DOCUMENT_FILE_CONTENT_LABEL')} file={file} isError={isError} isLoading={isLoading} />
                    ) : (
                        <DocumentEmptyFileState disabled={true} onUpload={() => {}} />
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default DocumentDetailsReadOnlyView;
