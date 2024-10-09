import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { IDocumentsViewFetcher } from '@fsi/document-intelligence/interfaces/IDocumentsFetcher';
import { IDocumentDefinition, IDocumentRequest } from '@fsi/document-intelligence/interfaces';
import { parseDocumentDefinition, parseSingleDocument } from './DocumentIntelligence.parser';
import { DOCUMENT_TABLES } from './DocumentIntelligence.const';
import { ILoggerService } from '@fsi/core-components/dist/context/telemetry';
import { getDocumentDefinitionQuery, getDocumentRequestsByContactIdQuery } from './DocumentIntelligence.query';
import { DocumentIntelligenceBaseFetcher } from './DocumentIntelligenceBase.fetcher';

export class DocumentsViewFetcher extends DocumentIntelligenceBaseFetcher implements IDocumentsViewFetcher {
    public regardingEntity: string;
    public constructor(context: CommonPCFContext, protected loggerService: ILoggerService) {
        super(context, loggerService);
    }

    public async getDocumentsByContact(id: string): Promise<IDocumentRequest[]> {
        const encodedFetchXml = encodeURIComponent(getDocumentRequestsByContactIdQuery(id));
        console.log('fetch request', encodedFetchXml);
        const { entities } = await this.webAPI.retrieveMultipleRecords(DOCUMENT_TABLES.DOCUMENT_REQUEST, `?fetchXml=${encodedFetchXml}`);

        if (!entities || entities.length === 0) {
            return [];
        }

        console.log('fetch', entities);

        return entities.map(entity => parseSingleDocument(entity));
    }

    async getDocumentDefinitions(): Promise<IDocumentDefinition[]> {
        try {
            const encodedFetchXml = encodeURIComponent(getDocumentDefinitionQuery());
            const result = await this.context.webAPI.retrieveMultipleRecords(DOCUMENT_TABLES.DOC_DEFINITION, `?fetchXml=${encodedFetchXml}`);

            console.log('definitions');
            return result.entities.map(entity => parseDocumentDefinition(entity));
        } catch (e) {
            throw e;
        }
    }
}
