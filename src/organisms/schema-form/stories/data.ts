export const simple = {
  type: 'object',
  required: ['loginAs', 'userName', 'password'],
  properties: {
    loginAs: {
      type: 'string',
      enum: ['Yönetici', 'Kullanıcı'],
    },
    userName: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};
export const ContactInformationTypeDto = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    creationTime: {
      type: 'string',
      format: 'date-time',
    },
    creatorId: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
    lastModificationTime: {
      type: 'string',
      format: 'date-time',
      nullable: true,
    },
    lastModifierId: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
    isDeleted: {
      type: 'boolean',
    },
    deleterId: {
      type: 'string',
      format: 'uuid',
      nullable: true,
    },
    deletionTime: {
      type: 'string',
      format: 'date-time',
      nullable: true,
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
    startDate: {
      type: 'string',
      format: 'date-time',
    },
    endDate: {
      type: 'string',
      format: 'date-time',
    },
    telephones: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          creationTime: {
            type: 'string',
            format: 'date-time',
          },
          creatorId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          lastModificationTime: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          lastModifierId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          isDeleted: {
            type: 'boolean',
          },
          deleterId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          deletionTime: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          areaCode: {
            type: 'string',
            nullable: true,
          },
          localNumber: {
            type: 'string',
            nullable: true,
          },
          ituCountryCode: {
            type: 'string',
            nullable: true,
          },
          primaryFlag: {
            type: 'boolean',
          },
          typeCode: {
            enum: [0, 1, 2, 3],
            type: 'integer',
            format: 'int32',
          },
          contactInformationTypeId: {
            type: 'string',
            format: 'uuid',
          },
        },
        additionalProperties: false,
      },
      nullable: true,
    },
    addresses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          creationTime: {
            type: 'string',
            format: 'date-time',
          },
          creatorId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          lastModificationTime: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          lastModifierId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          isDeleted: {
            type: 'boolean',
          },
          deleterId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          deletionTime: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          addressLine: {
            type: 'string',
            nullable: true,
          },
          city: {
            type: 'string',
            nullable: true,
          },
          terriority: {
            type: 'string',
            nullable: true,
          },
          postalCode: {
            type: 'string',
            nullable: true,
          },
          country: {
            type: 'string',
            nullable: true,
          },
          fullAddress: {
            type: 'string',
            nullable: true,
          },
          typeCode: {
            enum: [0, 1],
            type: 'integer',
            format: 'int32',
          },
          primaryFlag: {
            type: 'boolean',
          },
          contactInformationTypeId: {
            type: 'string',
            format: 'uuid',
          },
        },
        additionalProperties: false,
      },
      nullable: true,
    },
    emails: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          creationTime: {
            type: 'string',
            format: 'date-time',
          },
          creatorId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          lastModificationTime: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          lastModifierId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          isDeleted: {
            type: 'boolean',
          },
          deleterId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          deletionTime: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          primaryFlag: {
            type: 'boolean',
          },
          typeCode: {
            enum: [0, 1],
            type: 'integer',
            format: 'int32',
          },
          emailAddress: {
            type: 'string',
            nullable: true,
          },
          contactInformationTypeId: {
            type: 'string',
            format: 'uuid',
          },
        },
        additionalProperties: false,
      },
      nullable: true,
    },
  },
  additionalProperties: false,
};
