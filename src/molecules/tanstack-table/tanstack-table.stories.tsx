import { Meta, StoryFn } from '@storybook/react';
import { CheckCircle2, Trash2, XCircleIcon } from 'lucide-react';
import TanstackTable from '.';
import {
  rowActions,
  col,
  tableAction,
  users,
  faceted,
  User,
} from './tanstack-table.stories.data';
import { tanstackTableCreateColumnsByRowData } from './utils';

export default {
  component: TanstackTable,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TanstackTable>;

const template: StoryFn<typeof TanstackTable> = (args) => (
  <div className="max-w-[1400px]">
    <TanstackTable
      {...args}
      data={users}
      columns={col}
      rowActions={rowActions}
      tableActions={tableAction}
    />
  </div>
);

export const Default = template.bind({});
Default.args = {
  filters: {
    textFilters: ['userName'],
    facetedFilters: faceted,
  },
  excludeColumns: ['id', 'rtn'],
  selectedRowAction: {
    icon: Trash2,
    actionLocation: 'table',
    cta: `Delete`,
    onClick: (selectedIds) => {
      alert(`deleted rows:\n${selectedIds}`);
    },
  },
};

const linkStory: StoryFn<typeof TanstackTable> = (args) => (
  <div className="max-w-[1400px]">
    <TanstackTable {...args} data={users} columns={linkCol} />
  </div>
);
const linkCol = tanstackTableCreateColumnsByRowData<User>({
  row: users[0],
  links: {
    userName: {
      targetAccessorKey: 'id',
      prefix: 'http://192.168.1.105:1453/tr/app/admin',
      suffix: '/edit',
    },
    email: {
      prefix: 'http://192.168.1.105:1453/tr/app/',
    },
  },
});
export const LinkColumns = linkStory.bind({});
LinkColumns.args = {
  excludeColumns: [
    'id',
    'rtn',
    'phone',
    'location',
    'image',
    'otherInformation',
    'createdAt',
    'updatedAt',
  ],
};

const badgeStory: StoryFn<typeof TanstackTable> = (args) => (
  <div className="max-w-[1400px]">
    <TanstackTable {...args} data={users} columns={badgeCol} />
  </div>
);
const badgeCol = tanstackTableCreateColumnsByRowData<User>({
  row: users[0],
  badges: {
    userName: {
      targetAccessorKey: 'status',
      values: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
      ],
    },
    role: {
      targetAccessorKey: 'role',
      values: [
        { label: 'Provider', value: 'provider' },
        { label: 'Client', value: 'client' },
      ],
      hideColumnValue: true,
    },
  },
});
export const BadgeColumns = badgeStory.bind({});
BadgeColumns.args = {
  excludeColumns: [
    'id',
    'rtn',
    'phone',
    'location',
    'image',
    'otherInformation',
    'createdAt',
    'updatedAt',
    'status',
  ],
};

const facetedStory: StoryFn<typeof TanstackTable> = (args) => (
  <div className="max-w-[1400px]">
    <TanstackTable {...args} data={users} columns={facetedCol} />
  </div>
);
const facetedCol = tanstackTableCreateColumnsByRowData<User>({
  row: users[0],
  faceted: {
    status: [
      {
        value: 'active',
        label: 'Active',
        icon: CheckCircle2,
        iconClassName: 'text-green-700',
        className: 'text-green-700',
      },
      {
        value: 'inactive',
        label: 'Inactive',
        icon: XCircleIcon,
        iconClassName: 'text-red-700',
        className: 'text-red-700',
      },
    ],
  },
});
export const FacetedColumns = facetedStory.bind({});
FacetedColumns.args = {
  excludeColumns: [
    'id',
    'rtn',
    'phone',
    'location',
    'image',
    'otherInformation',
    'createdAt',
    'updatedAt',
    'role',
  ],
};

const translatedStory: StoryFn<typeof TanstackTable> = (args) => (
  <div className="max-w-[1400px]">
    <TanstackTable {...args} data={users} columns={translatedCol} />
  </div>
);
const translatedCol = tanstackTableCreateColumnsByRowData<User>({
  row: users[0],
  languageData: {
    userName: 'Kullanicı Adı',
    email: 'E-posta',
    phone: 'Telefon',
    createdAt: 'Oluşturulma Tarihi',
  },
});
export const TranslatedColumns = translatedStory.bind({});
TranslatedColumns.args = {
  excludeColumns: [
    'id',
    'rtn',
    'location',
    'image',
    'otherInformation',
    'updatedAt',
    'role',
    'status',
  ],
};
