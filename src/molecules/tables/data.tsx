export const data: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
    date: '2024-08-13',
    isActive: true,
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
    date: '2021-09-02',
    isActive: true,
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
    date: '2021-09-01',
    isActive: false,
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
    date: '2021-09-03',
    isActive: true,
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
    date: '2021-09-05',
    isActive: false,
  },
];

export type Payment = {
  amount: number;
  date?: string;
  email: string;
  id: string;
  isActive: boolean;
  status: 'pending' | 'processing' | 'success' | 'failed';
};
