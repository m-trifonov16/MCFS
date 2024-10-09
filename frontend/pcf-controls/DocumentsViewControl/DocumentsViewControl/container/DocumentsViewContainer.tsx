import React from 'react';
import { IDocumentsViewFetcher } from '@fsi/document-intelligence/interfaces/IDocumentsFetcher';
import { DocumentsView } from '@fsi/document-intelligence/DocumentsView';
import { DocumentIntelligenceWrapper } from '@fsi/document-intelligence/DocumentIntelligenceWrapper';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { extractContextualFlags } from '@fsi/pcf-common/utilities/extractContextualConfig';
import { DOCUMENT_INTELLIGENCE_FLAGS, DOCUMENT_INTELLIGENCE_FLAGS_DEFAULTS } from '@fsi/document-intelligence/constants/DocumentIntelligence.const';

export const extractEntityDocumentConfig = context => ({
    flags: extractContextualFlags(context, Object.values(DOCUMENT_INTELLIGENCE_FLAGS), DOCUMENT_INTELLIGENCE_FLAGS_DEFAULTS),
});
export interface DocumentsViewProps extends PCFContainerProps {
    fetcher: IDocumentsViewFetcher;
}

export const DocumentsViewContainer: React.FC<DocumentsViewProps> = (props: DocumentsViewProps) => {
    console.log("container start")
    const { context, fetcher } = props;
    const contactId = extractEntityId(context.parameters?.contactId);
    const config = extractEntityDocumentConfig(context);
    return (
        context && (
            <PCFContainer context={context} config={config} withCurrencies={false}>
                <DocumentIntelligenceWrapper>
                    <DocumentsView fetcher={fetcher} contactId={contactId}></DocumentsView>
                </DocumentIntelligenceWrapper>
            </PCFContainer>
        )
    );
};
export default DocumentsViewContainer;
