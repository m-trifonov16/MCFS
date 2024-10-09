import { CommunicationColors } from '@fluentui/react/lib/Theme';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { IPieChartData } from '@fsi/core-components/dist/components/containers/DataPieChart';
import { COLORS } from '@fsi/core-components/dist/constants';
import { IFHFetcher } from '../../interfaces/IFHFetcher';
import { useFHMetadata } from './useFHMetadata';
import { FH_NAME_TO_CATEGORY_MAP, MARKET_PRODUCT_TYPE_TO_CATEGORY_MAP } from '../../constants/FHValueMaps';

interface IUseFinancialHoldingById {
    fetcher: IFHFetcher;
    financialHoldingId: string;
}

const chartColors = [COLORS.tint10, COLORS.blueSky, COLORS.darkBlue1, COLORS.darkBlue2, ...Object.values(CommunicationColors)];

const useFinancialHoldingById = ({ fetcher, financialHoldingId }: IUseFinancialHoldingById) => {
    const {
        data: metadata,
        isError: isErrorMetadata,
        isLoading: isLoadingMetadata,
        isFetched: isFetchedMetadata,
    } = useFHMetadata(() => fetcher.fetchFHMetadata());

    const {
        data: financialHolding,
        isError: isErrorFH,
        isLoading: isLoadingFH,
        isFetched: isFetchedFH,
    } = useQuery(['financialHolding', financialHoldingId], () => fetcher.fetchFHById?.(financialHoldingId));

    const {
        data: financialHoldingProducts,
        isLoading: isLoadingFinancialHoldingProducts,
        isError: isErrorFinancialHoldingProducts,
    } = useQuery(['financialHoldingProducts', financialHoldingId], () => fetcher.fetchFinancialProducts?.(financialHoldingId), {
        enabled: financialHolding?.category === FH_NAME_TO_CATEGORY_MAP.Investments,
    });

    const colorsByType = useMemo(() => {
        if (!financialHoldingProducts || !metadata?.fiPositionType?.optionSet) {
            return undefined;
        }

        const fiPositionTypes = Object.values(metadata.fiPositionType.optionSet);

        const colorsOfFiPositionTypes = fiPositionTypes.reduce(
            (prevValue, currValue, index) => ({ ...prevValue, [currValue.value]: chartColors[index] }),
            {}
        );

        return colorsOfFiPositionTypes;
    }, [financialHoldingProducts, metadata]);

    const portfolioChartData: IPieChartData[] | undefined = useMemo(() => {

        console.log('finanicalHoldingProducts', financialHoldingProducts);
        console.log('metadata', metadata);
        if (!financialHoldingProducts || !metadata?.fiPositionType?.optionSet || !colorsByType) {
            return undefined;
        }

        const defaultCategory = metadata.fiPositionType.optionSet[104800000];

        const groupedByFinancialProducts = financialHoldingProducts.reduce(
            (prevValue, { fipPositionType, fmpCurrentPrice, fipPositionCount }) => ({
                ...prevValue,
                [fipPositionType]: {
                    category: metadata.fiPositionType?.optionSet[fipPositionType]?.text || defaultCategory.text,
                    value: (prevValue[fipPositionType]?.value || 0) + (fmpCurrentPrice * fipPositionCount),
                    color: fipPositionType ? colorsByType[fipPositionType] : colorsByType[defaultCategory.value],
                },
            }),
            {}
        );

        return Object.values(groupedByFinancialProducts);
    }, [colorsByType, financialHoldingProducts, metadata]);

    const {
        data: relatedCustomers,
        isLoading: isLoadingRelatedCustomers,
        isFetched: isFetchedRelatedCustomers,
        isError: isErrorRelatedCustomers,
    } = useQuery(['relatedCustomersFinancialHoldings', financialHoldingId], () => fetcher.fetchFHRelatedCustomers?.(financialHoldingId));

    const isLoading =
        isLoadingMetadata ||
        isLoadingFH ||
        isLoadingRelatedCustomers ||
        !isFetchedMetadata ||
        !isFetchedFH ||
        !isFetchedRelatedCustomers ||
        isLoadingFinancialHoldingProducts;

    const isError = isErrorMetadata || isErrorFH || isErrorRelatedCustomers || isErrorFinancialHoldingProducts;

    return { metadata, financialHolding, relatedCustomers, isLoading, isError, portfolioChartData };
};

export default useFinancialHoldingById;
