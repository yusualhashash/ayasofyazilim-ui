import {
  TanstackTableLanguageDataType,
  TanstackTableLanguageDataTypeWithConstantKey,
} from '../types';

const isTypeLanguageDataTypeWithConstantKey = (
  value: any
): value is TanstackTableLanguageDataTypeWithConstantKey =>
  'constantKey' in value && typeof value === 'object';
export function tanstackTableCreateTitleWithLanguageData({
  languageData,
  accessorKey,
}: {
  accessorKey: string;
  languageData?:
    | TanstackTableLanguageDataType
    | TanstackTableLanguageDataTypeWithConstantKey;
}): string {
  if (isTypeLanguageDataTypeWithConstantKey(languageData)) {
    const { constantKey, languageData: res } = languageData;
    return res[`${constantKey}.${accessorKey}`] || accessorKey;
  }
  return languageData?.[accessorKey] || accessorKey;
}
