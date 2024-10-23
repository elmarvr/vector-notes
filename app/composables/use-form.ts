import {
  useForm as __useForm,
  Field,
  type FieldOptions,
  type Path,
  type PathValue,
  type FormContext,
  type FieldBindingObject,
} from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { z, ZodObject } from "zod";

import type { SetupContext, SlotsType } from "vue";

export const useForm = <TSchema extends z.ZodObject<any>>(
  schema: TSchema,
  opts?: Record<string, unknown>
): ExtendedFormContext<TSchema> => {
  const form = __useForm({
    validationSchema: toTypedSchema(schema),
    ...opts,
  });

  const extendedForm = form as unknown as ExtendedFormContext<TSchema>;

  extendedForm.Field = defineComponent(
    (props, context) => {
      return () => {
        return h(
          Field as never,
          {
            ...props,
            ...context.attrs,
          },
          context.slots
        );
      };
    },
    {
      name: "Form.Field",
      inheritAttrs: false,
    }
  ) as never;

  return extendedForm;
};

type ExtendedFormContext<TSchema extends z.ZodObject<any>> = FormContext<
  TSchema["_input"],
  TSchema["_output"]
> & {
  Field: FieldComponent<TSchema>;
};

type FieldComponent<TSchema extends ZodObject<any>> = <
  TPath extends Path<TSchema["_input"]>
>(
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
) => any;
