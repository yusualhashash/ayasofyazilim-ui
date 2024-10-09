import React from 'react';
import { DefaultValues } from 'react-hook-form';
import { z } from 'zod';
import { FieldConfig } from './types';
import { FieldConfigType } from '.';

// TODO: This should support recursive ZodEffects but TypeScript doesn't allow circular type definitions.
export type ZodObjectOrWrapped =
  | z.ZodObject<any, any>
  | z.ZodEffects<z.ZodObject<any, any>>;

/**
 * Beautify a camelCase string.
 * e.g. "myString" -> "My String"
 */
export function beautifyObjectName(string: string) {
  // if numbers only return the string
  let output = string.replace(/([A-Z])/g, ' $1');
  output = output.charAt(0).toUpperCase() + output.slice(1);
  return output;
}

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseSchema<
  ChildType extends z.ZodAny | z.AnyZodObject = z.ZodAny,
>(schema: ChildType | z.ZodEffects<ChildType>): ChildType | null {
  if (!schema) return null;
  if ('innerType' in schema._def) {
    return getBaseSchema(schema._def.innerType as ChildType);
  }
  if ('schema' in schema._def) {
    return getBaseSchema(schema._def.schema as ChildType);
  }

  return schema as ChildType;
}

/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseType(schema: z.ZodAny): string {
  const baseSchema = getBaseSchema(schema);
  return baseSchema ? baseSchema._def.typeName : '';
}

/**
 * Search for a "ZodDefult" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema: z.ZodAny): any {
  const typedSchema = schema as unknown as z.ZodDefault<
    z.ZodNumber | z.ZodString | z.ZodBoolean | z.ZodOptional<z.ZodAny>
  >;
  if (typedSchema._def.typeName === 'ZodDefault') {
    return typedSchema._def.defaultValue();
  }
  if (typedSchema._def.typeName === 'ZodBoolean') {
    return false;
  }
  if ('innerType' in typedSchema._def) {
    return getDefaultValueInZodStack(
      typedSchema._def.innerType as unknown as z.ZodAny
    );
  }
  if ('schema' in typedSchema._def) {
    return getDefaultValueInZodStack(
      (typedSchema._def as any).schema as z.ZodAny
    );
  }

  return undefined;
}

/**
 * Get all default values from a Zod schema.
 */
export function getDefaultValues<Schema extends z.ZodObject<any, any>>(
  schema: Schema,
  fieldConfig?: FieldConfig<z.infer<Schema>>
) {
  if (!schema) return null;
  const { shape } = schema;
  type DefaultValuesType = DefaultValues<Partial<z.infer<Schema>>>;
  const defaultValues = {} as DefaultValuesType;
  if (!shape) return defaultValues;

  for (const key of Object.keys(shape)) {
    const item = shape[key] as z.ZodAny;
    if (getBaseType(item) === 'ZodObject') {
      const defaultItems = getDefaultValues(
        getBaseSchema(item) as unknown as z.ZodObject<any, any>,
        fieldConfig?.[key] as FieldConfig<z.infer<Schema>>
      );

      if (defaultItems !== null) {
        for (const defaultItemKey of Object.keys(defaultItems)) {
          const pathKey = `${key}.${defaultItemKey}` as keyof DefaultValuesType;
          defaultValues[pathKey] = defaultItems[defaultItemKey];
        }
      }
    } else {
      let defaultValue = getDefaultValueInZodStack(item);
      if (
        (defaultValue === null || defaultValue === '') &&
        fieldConfig?.[key]?.inputProps
      ) {
        defaultValue = (fieldConfig?.[key]?.inputProps as unknown as any)
          .defaultValue;
      }
      if (defaultValue !== undefined) {
        defaultValues[key as keyof DefaultValuesType] = defaultValue;
      }
    }
  }

  return defaultValues;
}

export function getObjectFormSchema(
  schema: ZodObjectOrWrapped
): z.ZodObject<any, any> {
  if (schema?._def.typeName === 'ZodEffects') {
    const typedSchema = schema as z.ZodEffects<z.ZodObject<any, any>>;
    return getObjectFormSchema(typedSchema._def.schema);
  }
  return schema as z.ZodObject<any, any>;
}

/**
 * Convert a Zod schema to HTML input props to give direct feedback to the user.
 * Once submitted, the schema will be validated completely.
 */
export function zodToHtmlInputProps(
  schema:
    | z.ZodNumber
    | z.ZodString
    | z.ZodOptional<z.ZodNumber | z.ZodString>
    | any
): React.InputHTMLAttributes<HTMLInputElement> {
  if (['ZodOptional', 'ZodNullable'].includes(schema._def.typeName)) {
    const typedSchema = schema as z.ZodOptional<z.ZodNumber | z.ZodString>;
    return {
      ...zodToHtmlInputProps(typedSchema._def.innerType),
      required: false,
    };
  }
  const typedSchema = schema as z.ZodNumber | z.ZodString;

  if (!('checks' in typedSchema._def))
    return {
      required: true,
    };

  const { checks } = typedSchema._def;
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    required: true,
  };
  const type = getBaseType(schema);

  for (const check of checks) {
    if (check.kind === 'min') {
      if (type === 'ZodString') {
        inputProps.minLength = check.value;
      } else {
        inputProps.min = check.value;
      }
    }
    if (check.kind === 'max') {
      if (type === 'ZodString') {
        inputProps.maxLength = check.value;
      } else {
        inputProps.max = check.value;
      }
    }
  }

  return inputProps;
}

export interface JsonSchema {
  additionalProperties?: boolean;
  default?: any;
  description?: string | undefined;
  displayName: string;
  enum?: any;
  format?: 'date-time' | 'email' | 'uuid';
  isReadOnly?: boolean;
  isRequired?: boolean;
  items?: SchemaType;
  maxLength?: number;
  minLength?: number;
  nullable?: boolean;
  pattern?: RegExp;
  properties?: Record<string, JsonSchema>;
  refine?: { callback: (_value: any) => boolean; params?: object };
  type:
    | 'string'
    | 'boolean'
    | 'object'
    | 'integer'
    | 'number'
    | 'array'
    | 'toggle'
    | 'select'
    | 'phone';
}
// group
export interface SchemaType {
  additionalProperties?: boolean | {};
  displayName?: string;
  items?: SchemaType;
  properties?: Record<string, JsonSchema | SchemaType>;
  required?: readonly string[];
  type: string;
}

export const isJsonSchema = (object: any): object is JsonSchema =>
  'type' in object;
export const isSchemaType = (object: any): object is SchemaType =>
  'required' in object;

export type CreateFieldConfigWithResourceProps = {
  constantKey: string;
  extend?: FieldConfig<z.infer<ZodObjectOrWrapped>>;
  resources: Record<string, any>;
  schema: SchemaType;
};
export function createFieldConfigWithResource({
  constantKey,
  resources,
  schema,
  extend,
}: CreateFieldConfigWithResourceProps): FieldConfig<
  z.infer<ZodObjectOrWrapped>
> {
  const fieldConfig = resourcesFromObject({
    object: schema,
    resources,
    constantKey,
  });
  if (extend) {
    Object.keys(fieldConfig).forEach((key) => {
      const _extend = extend[key];
      if (!_extend) return;
      fieldConfig[key] = {
        ...fieldConfig[key],
        ..._extend,
      };
    });
  }
  return filterUndefinedAndEmpty(fieldConfig);
}

export function resourcesFromObject({
  name,
  object,
  resources,
  constantKey,
}: {
  constantKey: string;
  name?: string;
  object: any;
  resources: any;
}) {
  let _temp: Record<string, object> = {};
  if (name) _temp = { [name]: {} };
  Object.entries(object.properties || {}).forEach(([key, field]) => {
    if (key === 'extraProperties') return;
    if (!isJsonSchema(field)) return;
    if (field.type === 'object') {
      if (name) {
        Object.assign(_temp[name], {
          displayName: 'This was not controlled please report to @ecbakas',
          ...resourcesFromObject({
            name: key,
            object: field,
            resources,
            constantKey: `${constantKey}.${name}`,
          }),
        });
      } else {
        Object.assign(
          _temp,
          resourcesFromObject({
            name: key,
            object: field,
            resources,
            constantKey,
          })
        );
      }
    } else if (field.type === 'array') {
      if (name) {
        Object.assign(
          _temp[name],
          resourcesFromArray({
            name: key,
            array: field,
            resources,
            constantKey: `${constantKey}.${name}`,
          })
        );
      } else {
        Object.assign(
          _temp,
          resourcesFromArray({
            name: key,
            array: field,
            resources,
            constantKey,
          })
        );
      }
    } else if (name) {
      Object.assign(_temp[name], {
        displayName: createValue(name, resources, constantKey),
        [key]: {
          displayName: createValue(key, resources, `${constantKey}.${name}`),
        },
      });
    } else {
      Object.assign(_temp, {
        [key]: { displayName: createValue(key, resources, constantKey) },
      });
    }
  });
  if (name) {
    Object.assign(_temp[name], {
      displayName: createValue(name, resources, constantKey),
    });
  }
  return _temp;
}

export function resourcesFromArray({
  name,
  array,
  resources,
  constantKey,
}: {
  array: any;
  constantKey: string;
  name: string;
  resources: any;
}) {
  let _temp: Record<string, object> = {};
  if (name) _temp = { [name]: {} };

  Object.entries(array.items.properties || {}).forEach(([key, field]) => {
    if (key === 'extraProperties') return;
    if (!isJsonSchema(field)) return;
    if (field.type === 'object') {
      Object.assign(
        _temp[name],
        resourcesFromObject({
          name: key,
          object: field,
          resources,
          constantKey: `${constantKey}.${name}`,
        })
      );
    } else if (field.type === 'array') {
      Object.assign(_temp[name], {
        displayName: createValue(name, resources, constantKey),
        ...resourcesFromArray({
          name: key,
          array: field,
          resources,
          constantKey: `${constantKey}.${name}`,
        }),
      });
    } else {
      Object.assign(_temp[name], {
        displayName: createValue(name, resources, constantKey),
        [key]: {
          displayName: createValue(key, resources, `${constantKey}.${name}`),
        },
      });
    }
  });
  return _temp;
}

export function createValue(
  name: string,
  param: any,
  constantKey: string,
  log = false
) {
  if (log)
    console.log({
      name,
      constantKey,
      param,
    });
  const temp = name.split('.');
  if (!param) return undefined;
  if (temp.length === 1) {
    return param[`${constantKey}.${temp[0]}`];
  }
  return createValue(
    temp.slice(1).join('.'),
    param[constantKey + temp[0]],
    constantKey
  );
}

export function createFieldTypeFieldConfig({
  elements,
  fieldType,
}: {
  elements: string[];
  fieldType: string;
}): FieldConfigType {
  const fieldConfig = {};
  for (const element of elements) {
    Object.assign(fieldConfig, { [element]: { fieldType } });
  }
  return filterUndefinedAndEmpty(fieldConfig);
}
export function createReadonlyFieldConfig(elements: string[]): FieldConfigType {
  const fieldConfig = {};
  for (const element of elements) {
    Object.assign(fieldConfig, {
      [element]: { inputProps: { disabled: true } },
    });
  }
  return filterUndefinedAndEmpty(fieldConfig);
}
/**
 * Merges two FieldConfig objects recursively.
 * @param source - The first FieldConfig object to merge.
 * @param target - The second FieldConfig object to merge.
 * @returns A new merged FieldConfig object.
 */
export function mergeFieldConfigs<
  T extends FieldConfigType,
  U extends FieldConfigType,
>(source: T, target: U): T & U {
  const targetKeys = Object.keys(target);
  const sourceKeys = Object.keys(source);
  const matchedKeys = sourceKeys.filter((key) => targetKeys.includes(key));
  const uniqueKeys = sourceKeys.filter((key) => !targetKeys.includes(key));
  const mergedObject = {};
  for (const key of uniqueKeys) {
    Object.assign(mergedObject, { [key]: source[key] });
  }
  const mergedMatchedObject = {};
  for (const key of matchedKeys) {
    Object.assign(mergedMatchedObject, {
      [key]: {
        ...source[key],
        ...target[key],
      },
    });
  }
  const mergedResult: FieldConfigType = Object.assign(
    mergedObject,
    mergedMatchedObject
  );
  return mergedResult as T & U; // Return the merged result
}

type FilteredObject<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Array<any>
      ? T[K] // Keep arrays as they are
      : FilteredObject<T[K]>
    : T[K] extends undefined
      ? never
      : T[K];
};

function filterUndefinedAndEmpty<T>(obj: T): FilteredObject<T> {
  if (typeof obj !== 'object' || obj === null) {
    return obj as FilteredObject<T>;
  }

  const filtered: Partial<FilteredObject<T>> = {};

  for (const [key, value] of Object.entries(obj)) {
    const filteredValue = filterUndefinedAndEmpty(value);
    // Check if the value is not undefined and not an empty object
    if (
      filteredValue !== undefined &&
      !(
        typeof filteredValue === 'object' &&
        Object.keys(filteredValue).length === 0
      )
    ) {
      Object.assign(filtered, { [key]: filteredValue });
    }
  }

  return filtered as FilteredObject<T>;
}
