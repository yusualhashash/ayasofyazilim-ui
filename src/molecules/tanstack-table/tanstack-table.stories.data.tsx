import { PersonIcon, TrashIcon } from '@radix-ui/react-icons';
import { Building2, Edit, EyeIcon, KeyIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createZodObject } from 'src/lib/create-zod-object';
import {
  TanstackTableRowActionsType,
  TanstackTableTableActionsType,
} from './types';
import { tanstackTableCreateColumnsByRowData } from './utils';

function Permission({ row }: { row: Merchant }) {
  const [permissions, setPermissions] = useState<string[] | null>(null);
  useEffect(() => {
    setTimeout(() => {
      if (row.typeCode === 'HEADQUARTER') {
        setPermissions(['View User', 'Edit User', 'Delete User']);
        return;
      }
      setPermissions([]);
    }, 2000);
  }, [row.id]);

  if (permissions === null) {
    return <div>Loading...</div>;
  }
  if (permissions.length === 0) {
    return <div>{row.name} does not have any permissions. </div>;
  }
  return (
    <ul>
      {permissions.map((permission) => (
        <li key={permission}>- {permission}</li>
      ))}
    </ul>
  );
}
const Custom = () => <div>Some custom dialog</div>;
export const $merchantSchema = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    typeCode: {
      enum: ['HEADQUARTER', 'STORE'],
      type: 'string',
    },
    name: {
      minLength: 1,
      type: 'string',
    },
    parentId: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
    entityInformationTypeCode: {
      enum: ['INDIVIDUAL', 'ORGANIZATION'],
      type: 'string',
    },
    organizationId: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
    individualId: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
  },
} as const;

export const $editMerchantDto = {
  required: ['taxOfficeId', 'typeCode'],
  type: 'object',
  properties: {
    name: {
      minLength: 1,
      type: 'string',
    },
    typeCode: {
      enum: ['HEADQUARTER', 'STORE'],
      type: 'string',
    },
    taxOfficeId: {
      type: 'string',
      format: 'uuid',
    },
    parentId: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
  },
  additionalProperties: false,
} as const;

export type Merchant = {
  entityInformationTypeCode: 'INDIVIDUAL' | 'ORGANIZATION';
  id: string;
  individualId?: string | null;
  name: string;
  organizationId?: string | null;
  parentId?: string | null;
  typeCode?: 'HEADQUARTER' | 'STORE';
};
export const merchants: Merchant[] = [
  {
    id: 'a42aadda-aec1-ed40-0947-3a14ca0cc2fd',
    typeCode: 'HEADQUARTER',
    name: 'Advanced Global Technologies and Innovations Ltd.',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: 'a818149b-12e7-c48f-0f7b-3a14ca0cc2fd',
    individualId: null,
  },
  {
    id: '47dbd936-cb87-7b53-f13b-3a14ca0d0bbd',
    typeCode: 'STORE',
    name: 'United Industrial Services and Manufacturing Co.',
    parentId: 'c8909caa-775d-f757-aadb-3a1559e60015',
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: 'e36ec652-f3da-cba2-1509-3a14ca0d0bbd',
    individualId: null,
  },
  {
    id: '6817dc23-7c82-f1e1-dd87-3a14ca0d4435',
    typeCode: 'HEADQUARTER',
    name: 'Global Health and Wellness Solutions Incorporated',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '69ecde4d-54d0-b1d1-ac8e-3a14ca0d4435',
    individualId: null,
  },
  {
    id: '16eae37f-d07c-308d-b223-3a1559e2c194',
    typeCode: 'HEADQUARTER',
    name: 'ayasofyazilim',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: 'b49f9f70-07c9-d699-72f5-3a1559e2c195',
    individualId: null,
  },
  {
    id: 'c8909caa-775d-f757-aadb-3a1559e60015',
    typeCode: 'HEADQUARTER',
    name: 'Burak Test A.Ş.',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: 'e78d770e-35ae-6319-32fa-3a1559e60015',
    individualId: null,
  },
  {
    id: '349b9d4f-73c8-1cee-d6b6-3a15684277b3',
    typeCode: 'STORE',
    name: 'test',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: 'cf3ab09f-0549-9d5a-778b-3a15684277b4',
    individualId: null,
  },
  {
    id: 'bb0d28d5-6ac6-607e-5e8b-3a15795ecbfb',
    typeCode: 'HEADQUARTER',
    name: 'a0099989',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: 'b3654b88-77dc-b767-1a29-3a15795ecbfb',
    individualId: null,
  },
  {
    id: 'c44bde19-c2e0-a919-7f9f-3a158268c61d',
    typeCode: 'STORE',
    name: 'test2',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: 'e31815d4-0fe8-1b0a-8f07-3a158268c61d',
    individualId: null,
  },
  {
    id: '6d03d81c-082b-9414-0f43-3a15826b80c9',
    typeCode: 'STORE',
    name: 'test236',
    parentId: 'c8909caa-775d-f757-aadb-3a1559e60015',
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '99a4a912-373d-604e-8b5c-3a15826b80c9',
    individualId: null,
  },
  {
    id: '241ccefe-8186-638b-2f06-3a1582ab48b5',
    typeCode: 'STORE',
    name: 'subbb',
    parentId: '16eae37f-d07c-308d-b223-3a1559e2c194',
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '0b47fc72-78b9-9fb4-0e19-3a1582ab48b5',
    individualId: null,
  },
  {
    id: '061690ad-8cb6-ed6c-9702-3a158376d61a',
    typeCode: 'STORE',
    name: ' 2ppp',
    parentId: 'c8909caa-775d-f757-aadb-3a1559e60015',
    entityInformationTypeCode: 'INDIVIDUAL',
    organizationId: null,
    individualId: '6682772d-2214-b96a-740e-3a158376d61a',
  },
  {
    id: '035b48dd-cfb4-1302-a548-3a1588d8d2a0',
    typeCode: 'STORE',
    name: 'MerchantOrg',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '3bb0031f-4682-8031-fc30-3a1588d8d2a0',
    individualId: null,
  },
  {
    id: 'dcfe3c09-14d1-1881-5e22-3a158c4abb22',
    typeCode: 'HEADQUARTER',
    name: ' Eren',
    parentId: null,
    entityInformationTypeCode: 'INDIVIDUAL',
    organizationId: null,
    individualId: '5c09c77d-cc16-da3e-ce47-3a158c4abb22',
  },
  {
    id: 'b434a4b8-5ffe-cc10-2553-3a158c897711',
    typeCode: 'STORE',
    name: 'Sub Merchant',
    parentId: '035b48dd-cfb4-1302-a548-3a1588d8d2a0',
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '88401fc5-c69d-4bc4-7aac-3a158c897712',
    individualId: null,
  },
  {
    id: 'b258daa6-897b-23af-d37a-3a158c8adc7b',
    typeCode: 'STORE',
    name: ' Sub Individual',
    parentId: '035b48dd-cfb4-1302-a548-3a1588d8d2a0',
    entityInformationTypeCode: 'INDIVIDUAL',
    organizationId: null,
    individualId: 'e8e51a50-bd41-5575-9a37-3a158c8adc7b',
  },
  {
    id: 'ee414be2-98e3-585d-545a-3a158d92a031',
    typeCode: 'STORE',
    name: 'test',
    parentId: 'bb0d28d5-6ac6-607e-5e8b-3a15795ecbfb',
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '9fc6705b-aa59-309c-0108-3a158d92a032',
    individualId: null,
  },
  {
    id: '0393e2b8-be36-f90a-b0a9-3a15a2993d46',
    typeCode: 'STORE',
    name: ' test',
    parentId: 'a42aadda-aec1-ed40-0947-3a14ca0cc2fd',
    entityInformationTypeCode: 'INDIVIDUAL',
    organizationId: null,
    individualId: 'dd440133-64ad-7d8e-cb7b-3a15a2993d46',
  },
  {
    id: 'a82205c0-8c69-eb5e-7b5a-3a15ab81a3c1',
    typeCode: 'HEADQUARTER',
    name: 'test',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '0fbe3bad-da41-0232-488f-3a15ab81a3c1',
    individualId: null,
  },
  {
    id: '2c855fd3-f926-6a29-9aed-3a15ab82c06a',
    typeCode: 'STORE',
    name: 'test1',
    parentId: 'a82205c0-8c69-eb5e-7b5a-3a15ab81a3c1',
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '16d8f75a-169b-f813-f91c-3a15ab82c06a',
    individualId: null,
  },
  {
    id: '02d2706f-85ee-6bd9-9e6d-3a15d5927268',
    typeCode: 'STORE',
    name: 'deneme orgü',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '8715f892-9e20-436d-4057-3a15d5927269',
    individualId: null,
  },
  {
    id: '5a3745f0-cff3-4226-5567-3a15d59340af',
    typeCode: 'HEADQUARTER',
    name: 'deneme ind deneme ind',
    parentId: null,
    entityInformationTypeCode: 'INDIVIDUAL',
    organizationId: null,
    individualId: '02a48e8b-d976-2647-e6eb-3a15d59340af',
  },
  {
    id: '240e5306-6b58-29d0-2237-3a15ee1bc894',
    typeCode: 'HEADQUARTER',
    name: 'İdris deneme',
    parentId: null,
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '1e888d7c-899c-8a9a-7f42-3a15ee1bc895',
    individualId: null,
  },
  {
    id: '21a135bb-76a2-9c4e-2c9e-3a15ee206da5',
    typeCode: 'STORE',
    name: '111111',
    parentId: '240e5306-6b58-29d0-2237-3a15ee1bc894',
    entityInformationTypeCode: 'ORGANIZATION',
    organizationId: '82962d74-127e-fd3c-3b2b-3a15ee206da5',
    individualId: null,
  },
];

export const col = tanstackTableCreateColumnsByRowData<Merchant>({
  rows: $merchantSchema.properties,
  languageData: { name: 'Kullanıcı Adı' },
  links: {
    name: {
      targetAccessorKey: 'id',
      prefix: 'http://192.168.1.105:1453/tr/app/admin',
      suffix: '/edit',
    },
    id: {
      prefix: 'http://192.168.1.105:1453/tr/app/',
    },
  },
  faceted: {
    entityInformationTypeCode: {
      options: [
        { value: 'inactive', label: 'Inactive', icon: Building2 },
        { value: 'active', label: 'Active', icon: PersonIcon },
      ],
    },
  },
  selectableRows: true,
});
const $schema = {
  required: ['displayName'],
  type: 'object',
  properties: {
    extraProperties: {
      type: 'object',
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    displayName: {
      maxLength: 128,
      minLength: 0,
      type: 'string',
    },
    concurrencyStamp: {
      type: 'string',
      nullable: true,
    },
  },
  additionalProperties: false,
} as const;
export const tableAction: TanstackTableTableActionsType[] = [
  {
    type: 'autoform-dialog',
    actionLocation: 'table',
    cta: 'New',
    icon: PlusIcon,
    submitText: 'Save',
    title: 'Create',
    values: { concurrencyStamp: new Date().toISOString() },
    onSubmit(row) {
      alert(JSON.stringify(row));
    },

    schema: createZodObject($schema, ['displayName', 'concurrencyStamp']),
  },
  {
    actionLocation: 'table',
    cta: 'Other Page',
    icon: EyeIcon,
    type: 'simple',
    onClick: () => {
      alert('Redirecting...');
      window.location.href = `/app/admin/users/`;
    },
  },
  {
    actionLocation: 'table',
    type: 'custom-dialog',
    cta: 'Permissions',
    content: <Custom />,
    cancelText: 'Close',
    icon: KeyIcon,
    title: 'Permission',
    onCancel: () => {
      console.log('Perrr');
    },
  },
];

export const rowActions: TanstackTableRowActionsType<Merchant>[] = [
  {
    actionLocation: 'row',
    cta: 'View User',
    icon: EyeIcon,
    type: 'simple',
    onClick: (row) => {
      alert('Redirecting...');
      window.location.href = `/app/admin/users/${row.id}`;
    },
  },
  {
    actionLocation: 'row',
    type: 'autoform-dialog',
    cta: 'Edit',
    icon: Edit,
    submitText: 'Save',
    title: (row) => `Edit ${row.name}`,
    values: (row) => ({ displayName: row.name }),
    onSubmit(row, values) {
      alert(`${JSON.stringify(row)} ${JSON.stringify(values)}`);
    },
    schema: createZodObject($schema, ['displayName']),
  },
  {
    actionLocation: 'row',
    type: 'custom-dialog',
    cta: 'Permissions',
    content: (row) => <Permission row={row} />,
    cancelText: 'Close',
    icon: KeyIcon,
    title: (row) => row.name,
    onCancel: (row) => {
      console.log(row.name);
    },
  },
  {
    actionLocation: 'row',
    cancelText: 'Cancel',
    confirmationText: 'Yes, Delete',
    cta: 'Delete User',
    icon: TrashIcon,
    type: 'confirmation-dialog',
    description: 'Are you sure you want to delete this user?',
    title: (row) => row.name,
    onConfirm: (row) => {
      console.log(row.name);
    },
    onCancel: (row) => {
      console.log(row.name);
    },
  },
];
