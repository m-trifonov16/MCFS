import { useQuery } from 'react-query';
import { IDocumentRequest } from '../interfaces';
import { IDocumentsViewFetcher } from '../interfaces/IDocumentsFetcher';

export interface IPipelineMessagesResponse {
    documents: IDocumentRequest[];
    isError: boolean;
    isLoading: boolean;
}

export const useDocumentsByContactId = (contactId: string, fetcher: IDocumentsViewFetcher): IPipelineMessagesResponse => {
    const { data, isLoading, isError, isFetched } = useQuery(`document-requests`, () => fetcher.getDocumentsByContact(contactId), {
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    return {
        documents: data ?? [],
        isError,
        isLoading: isLoading || !isFetched,
    };
};
