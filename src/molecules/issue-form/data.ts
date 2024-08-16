import { Tag } from './type';

export const tagExample: Tag = {
  Id: '12345',
  Summary: {
    Tag: 'Sample Tag',
    Status: 1,
    RefundMethod: 2, // TODO
    IssuedDate: '2024-08-14',
    ExpireDate: '2024-12-31',
  },
  ExportValidation: {
    Id: 'EV12345', // TODO
    ExportDate: '2024-08-10',
    ExportLocation: 101,
    StampType: 3,
  },
  Refund: {
    Id: 'R12345', // TODO
    SubmissionDate: '2024-08-12',
    PaidDate: '2024-08-13',
    RefundLocation: {
      ID: 'RL001', // TODO
      Name: 'Refund Location Name',
    },
    Status: 1,
    RefundMethod: 2,
  },
  Invoicing: {
    Id: 'INV12345', // TODO
    InvoicingDate: '2024-08-09',
    InvoicingNumber: 'INV0001',
    InvoicingStatus: 1,
  },
  Merchant: {
    Id: 'M12345', // TODO
    Name: 'Merchant Name',
    ProductGroups: [
      {
        Id: 'PG001', // TODO
        Description: 'Product Group 1',
      },
      {
        Id: 'PG002', // TODO
        Description: 'Product Group 2',
      },
    ],
    Address: {
      Id: 'A001', // TODO
      FullText: '1234 Sample Street, City, Country',
    },
  },
  Traveller: {
    Id: 'T12345', // TODO
    TravelDocumentNumber: 'TN123456789', // TODO
    CountryOfResidenceCode: 100, // TODO
    CountryOfResidence: 'Country Name',
    NationalityCode: 200, // TODO
    Nationality: 'Nationality Name',
    Name: 'John',
    Surname: 'Doe',
  },
  Trip: {
    Id: 'TR12345', // TODO
    VisitingDate: '2024-08-01', // TODO
    DepartureDate: '2024-08-05', // TODO
    FlightNumber: 'FL1234',
    DepartingAirport: {
      Id: 'DA001', // TODO
      Name: 'Departing Airport Name',
    },
    DestinationAirport: {
      Id: 'DA002', // TODO
      Name: 'Destination Airport Name',
    },
  },
  Invoices: [
    {
      Id: 'I001',
      Number: 'INV001',
      Currency: {
        Id: 'CUR001',
        Currency: 'USD',
        CurrencySymbol: '$',
      },
      TotalAmount: 1000.0,
      InvoiceLines: [
        {
          Id: 'IL001',
          ProductGroup: {
            Id: 'PG001',
            Description: 'Product Group 1',
          },
          Amount: 500.0,
          Vat: {
            Id: 'VAT001',
            Rate: 5.0,
            Amount: 25.0,
            VatBase: 475.0,
          },
        },
        {
          Id: 'IL002',
          ProductGroup: {
            Id: 'PG002',
            Description: 'Product Group 2',
          },
          Amount: 500.0,
          Vat: {
            Id: 'VAT002',
            Rate: 10.0,
            Amount: 50.0,
            VatBase: 450.0,
          },
        },
      ],
    },
    {
      Id: 'I002',
      Number: 'INV001',
      Currency: {
        Id: 'CUR001',
        Currency: 'USD',
        CurrencySymbol: '$',
      },
      TotalAmount: 1000.0,
      InvoiceLines: [
        {
          Id: 'IL001',
          ProductGroup: {
            Id: 'PG001',
            Description: 'Product Group 1',
          },
          Amount: 500.0,
          Vat: {
            Id: 'VAT001',
            Rate: 5.0,
            Amount: 25.0,
            VatBase: 475.0,
          },
        },
        {
          Id: 'IL002',
          ProductGroup: {
            Id: 'PG002',
            Description: 'Product Group 2',
          },
          Amount: 500.0,
          Vat: {
            Id: 'VAT002',
            Rate: 10.0,
            Amount: 50.0,
            VatBase: 450.0,
          },
        },
      ],
    },
  ],
  Totals: [
    {
      Description: 'Amount',
      Amount: 1000.0,
    },
    {
      Description: 'Return',
      Amount: 240.0,
    },
    {
      Description: 'Refund',
      Amount: 250.0,
    },
    {
      Description: 'Income',
      Amount: 50.0,
    },
  ],
  Earnings: [
    {
      Description: 'Total Earnings',
      Amount: 24.0,
    },
    {
      Description: 'Customer Earnings',
      Amount: 40.0,
    },
    {
      Description: 'Refund point Earnings',
      Amount: 30.0,
    },
    {
      Description: 'Merchant Earnings',
      Amount: 20.0,
    },
  ],
};
