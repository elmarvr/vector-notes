import {
  useForm as useVeeForm,
  type FormOptions as VeeFormOptions,
  Field,
  type Path,
  type FieldSlotProps,
  type PathValue,
  type FormContext,
  FieldContextKey,
  useFieldError,
} from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { type Schema } from "zod";
import type { SetupContext, SlotsType } from "vue";

export interface FormOptions<TSchema extends Schema>
  extends Omit<
    VeeFormOptions<TSchema["_input"], TSchema["_output"]>,
    "validationSchema"
  > {
  schema: TSchema;
}

export interface FormReturn<TSchema extends Schema>
  extends FormContext<TSchema["_input"], TSchema["_output"]> {
  Field: FieldComponent<TSchema>;
}

export function useForm<TSchema extends Schema>({
  schema,
  ...opts
}: FormOptions<TSchema>): FormReturn<TSchema> {
  const form = useVeeForm({
    validationSchema: toTypedSchema(schema),
    ...opts,
  }) as any;

  form.Field = Field;

  return form;
}

type FieldProps<TName extends string> = InstanceType<typeof Field>["$props"] & {
  name: TName;
};

interface FieldComponent<TSchema extends Schema> {
  <TName extends Path<TSchema["_input"]>>(
    props: FieldProps<TName>,
    context: SetupContext<
      {},
      SlotsType<{
        default: FieldSlotProps<PathValue<TSchema["_input"], TName>>;
      }>
    >
  ): any;
  _: true;
}

export function useField() {
  const ctx = inject(FieldContextKey);

  if (!ctx) {
    throw new Error("useField must be used within a Field component");
  }

  const { name } = ctx;
  const error = useFieldError(name);

  return {
    name,
    error,
  };
}

export { useFormContext } from "vee-validate";
