import { IFinancialProduct } from '../../interfaces/FHEntity/IFinancialProduct';

export const createFinancialProduct = (entity: any): IFinancialProduct => {
    return {
        currentValue: entity['FIP.msfsi_currentvalue'],
        fipStatecode: entity['FIP.statecode'],
        fipPositionType: entity['FIP.msfsi_positiontype'],
        fmpStatecode: entity['FMP.statecode'],
        fipPositionCount: entity['FIP.msfsi_positioncount'],
        fmpCurrentPrice: entity['FMP.msfsi_currentprice']
    };
};
