import {
  useForm as __useForm,
  Field,
  type FieldOptions,
  type Path,
  type PathValue,
  type FormContext as VeeFormContext,
  type FieldBindingObject,
  useFieldError,
  FieldContextKey,
} from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { z, ZodObject } from "zod";

import type { SetupContext, SlotsType } from "vue";

export const useForm = <TSchema extends z.ZodObject<any>>(
  schema: TSchema,
  opts?: Record<string, unknown>
): [FormContext<TSchema>, { Field: FieldComponent<TSchema> }] => {
  const form = __useForm({
    validationSchema: toTypedSchema(schema),
    ...opts,
  });

  return [form, { Field }] as never;
};

type FormContext<TSchema extends z.ZodObject<any>> = VeeFormContext<
  TSchema["_input"],
  TSchema["_output"]
>;

interface FieldComponent<TSchema extends ZodObject<any>> {
  <TPath extends Path<TSchema["_input"]>>(
    options: Partial<FieldOptions<PathValue<TSchema["_input"], TPath>>> & {
      name: TPath;
    },
    context: SetupContext<
      {},
      SlotsType<{
        default: (props: {
          field: FieldBindingObject<PathValue<TSchema["_input"], TPath>>;
        }) => any;
      }>
    >
  ): any;
  _: true;
}

export function useField() {
  const ctx = inject(FieldContextKey);

  if (!ctx) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { name } = ctx;

  const error = useFieldError(name);

  return {
    error,
    name,
  };
}
