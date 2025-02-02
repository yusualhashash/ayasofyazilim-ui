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
  {
    id: 'u9tv2kw3',
    amount: 550,
    status: 'success',
    email: 'robert.johnson@gmail.com',
    date: '2022-01-15',
    isActive: true,
  },
  {
    id: 'v4yt9ds7',
    amount: 150,
    status: 'failed',
    email: 'lucy.bell@hotmail.com',
    date: '2023-02-10',
    isActive: false,
  },
  {
    id: 't6fgh9pl',
    amount: 430,
    status: 'processing',
    email: 'mariah.hicks@gmail.com',
    date: '2022-04-14',
    isActive: true,
  },
  {
    id: 'b7ejr6as',
    amount: 890,
    status: 'success',
    email: 'rick.bates@yahoo.com',
    date: '2023-07-19',
    isActive: true,
  },
  {
    id: 'd9krf2qp',
    amount: 365,
    status: 'processing',
    email: 'ellen.morris@gmail.com',
    date: '2024-05-28',
    isActive: false,
  },
  {
    id: 'y8cpw5zx',
    amount: 220,
    status: 'failed',
    email: 'caleb.lopez@gmail.com',
    date: '2022-11-06',
    isActive: false,
  },
  {
    id: 'x3gvd8ay',
    amount: 990,
    status: 'success',
    email: 'julia.roberts@gmail.com',
    date: '2023-08-21',
    isActive: true,
  },
  {
    id: 'w2ahj3pz',
    amount: 780,
    status: 'success',
    email: 'emma.green@hotmail.com',
    date: '2023-09-14',
    isActive: true,
  },
  {
    id: 'c1bvu7oe',
    amount: 540,
    status: 'processing',
    email: 'jack.miller@gmail.com',
    date: '2024-02-16',
    isActive: false,
  },
  {
    id: 'n5rfk2wy',
    amount: 450,
    status: 'failed',
    email: 'nina.jones@yahoo.com',
    date: '2022-12-05',
    isActive: false,
  },
  {
    id: 'z7fpq3hr',
    amount: 250,
    status: 'success',
    email: 'simon.gray@gmail.com',
    date: '2021-11-18',
    isActive: true,
  },
  {
    id: 'l8fbq4td',
    amount: 610,
    status: 'success',
    email: 'sarah.white@hotmail.com',
    date: '2023-10-25',
    isActive: true,
  },
  {
    id: 'o6gyw7xl',
    amount: 410,
    status: 'failed',
    email: 'adam.smith@gmail.com',
    date: '2024-03-13',
    isActive: false,
  },
  {
    id: 'r2bnj9vk',
    amount: 375,
    status: 'processing',
    email: 'diana.ross@yahoo.com',
    date: '2023-06-01',
    isActive: false,
  },
  {
    id: 'k9hdq6el',
    amount: 560,
    status: 'success',
    email: 'nancy.brown@gmail.com',
    date: '2022-08-24',
    isActive: true,
  },
  {
    id: 'a1ptv5zm',
    amount: 320,
    status: 'failed',
    email: 'chris.baker@hotmail.com',
    date: '2021-12-12',
    isActive: false,
  },
  {
    id: 'q3evy2xl',
    amount: 430,
    status: 'success',
    email: 'alice.davis@gmail.com',
    date: '2024-04-19',
    isActive: true,
  },
  {
    id: 'h4ltw9zx',
    amount: 710,
    status: 'processing',
    email: 'kevin.lee@yahoo.com',
    date: '2023-05-04',
    isActive: false,
  },
  {
    id: 'f2rxj5uk',
    amount: 615,
    status: 'success',
    email: 'rachel.walker@gmail.com',
    date: '2023-03-08',
    isActive: true,
  },
  {
    id: 'm3knq8ob',
    amount: 785,
    status: 'failed',
    email: 'michael.brown@hotmail.com',
    date: '2024-06-11',
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
