import { ZodSchema, ZodType, z } from 'zod';

//item & sub item
export type JsonSchema = {
  type:
    | 'string'
    | 'boolean'
    | 'object'
    | 'integer'
    | 'number'
    | 'array'
    | 'toggle'
    | 'select';
  isRequired?: boolean;
  isReadOnly?: boolean;
  maxLength?: number;
  pattern?: RegExp;
  format?: 'date-time' | 'email' | 'uuid';
  description?: string | undefined;
  nullable?: boolean;
  enum?: any;
  default?: any;
  properties?: Record<string, JsonSchema>;
  displayName: string;
};
//group
export type SchemaType = {
  required: ReadonlyArray<string>;
  type: String;
  displayName: string;
  properties: Record<string, JsonSchema | SchemaType>;
  additionalProperties: Boolean;
};

export function isJsonSchema(object: any): object is JsonSchema {
  return 'type' in object;
}
export function isSchemaType(object: any): object is SchemaType {
  return 'required' in object;
}

export function createZodObject(
  schema: SchemaType,
  positions: Array<any>,
  convertors?: Record<string, any>
): ZodType {
  const zodSchema: Record<string, ZodSchema> = {};
  positions.forEach((element: string) => {
    const props = schema.properties[element];
    const isRequired = schema.required.includes(element);
    if (isSchemaType(props)) {
      Object.keys(props.properties).map((key) => {
        zodSchema[element] = createZodObject(
          props,
          Object.keys(props.properties)
        );
      });
    } else if (isJsonSchema(props)) {
      let zodType;
      if (convertors && Object.keys(convertors).includes(element)) {
        const newProps = props;
        newProps.enum = convertors[element];
        zodType = createZodType(newProps, isRequired);
      } else {
        zodType = createZodType(props, isRequired);
      }
      zodSchema[element] = zodType;
    }
  });
  return z.object(zodSchema, {
    description: schema.displayName,
  });
}

// TODO: Handle object case and add related data and example is
// $Volo_Abp_Identity_IdentityRoleCreateDto
// const formSchema = z.object({
//     name: z.string().max(256).min(0), // Assuming `name` is optional as it's not in the required list
//     isDefault: z.boolean().optional(),
//     isPublic: z.boolean().optional(),
//     extraProperties: z.object({
//         // Assuming any additional properties are of type `unknown`
//         additionalProperties: z.unknown().optional(),
//         nullable: z.boolean().optional(),
//         readOnly: z.boolean().optional()
//     }).optional().nullable()
// })
function createZodType(
  schema: JsonSchema,
  isRequired: boolean
): ZodSchema<any> {
  let zodType;
  switch (schema?.type) {
    case 'string':
      zodType = z.string({ description: schema.displayName });
      if (schema.maxLength) zodType = zodType.max(schema.maxLength);
      if (schema.pattern) zodType = zodType.regex(schema.pattern);
      if (schema.format === 'email') zodType = zodType.email();
      if (schema.default) zodType = zodType.default(schema.default);
      if (schema.format === 'date-time') zodType = z.coerce.date();
      break;
    case 'select':
      zodType = z.enum(schema.enum);
      if (schema.default) zodType = zodType.default(schema.default);
      break;
    case 'boolean':
      zodType = z.boolean();
      if (schema.default) zodType = zodType.default(schema.default == 'true');
      break;
    case 'integer':
      if (schema.enum) {
        let stringEnums = schema.enum.map((e: any) => e.toString());
        zodType = z.enum(stringEnums as [string, ...string[]]);
        break;
      }
      zodType = z.number().int();
      break;
    case 'integer':
      if (schema.enum) {
        let stringEnums = schema.enum.map((e: any) => e.toString());
        zodType = z.enum(stringEnums as [string, ...string[]]);
        break;
      }
      zodType = z.number().int();
      break;
    default:
      zodType = z.unknown({ description: schema.displayName });
  }
  if (!isRequired) zodType = zodType.optional();
  if (schema.nullable) zodType = zodType.nullable();
  return zodType;
}
