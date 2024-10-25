import {
  useForm as __useForm,
  FormApi,
  useField,
  type DeepKeys,
  type DeepValue,
  type FieldState,
  type FormState,
  type Validator,
  getBy,
} from "@tanstack/vue-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import type { InjectionKey, SetupContext, SlotsType } from "vue";
import { type Schema } from "zod";

export function useForm<TSchema extends Schema>(opts: {
  schema: TSchema;

  onSubmit: (
    data: TSchema["_output"],
    api: FormApi<TSchema["_output"], Validator<unknown, Schema>>
  ) => void;
}) {
  const {
    Field: _,
    handleSubmit: _handleSubmit,
    ...form
  } = __useForm<TSchema["_output"], Validator<unknown, Schema>>({
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: opts.schema,
      onChange: opts.schema,
    },
    onSubmit: ({ value, formApi }) => opts.onSubmit(value, formApi),
  });

  const formState = form.useStore((state) => ({
    submissionAttempts: state.submissionAttempts,
  }));

  provide(FormStateKey, formState);

  const FieldComp = defineComponent((props, context) => {
    return () =>
      h(
        Field,
        {
          ...props,
          ...context.attrs,
          form: form,
        },
        context.slots
      );
  }) as unknown as FieldComponent<TSchema["_output"]>;

  return {
    ...form,
    Field: FieldComp,
    handleSubmit: (e: Event) => {
      e.preventDefault();
      return _handleSubmit();
    },
  };
}

type FieldComponent<TParentData> = {
  <TName extends DeepKeys<TParentData>>(
    props: {
      name: TName;
    },
    context: SetupContext<
      {},
      SlotsType<{
        default: {
          field: {
            name: TName;
            onBlur: () => void;
            value: DeepValue<TParentData, TName>;
            onInput: (e: any) => void;
            modelValue: DeepValue<TParentData, TName>;
            "onUpdate:modelValue": (
              value: DeepValue<TParentData, TName>
            ) => void;
          };
        };
      }>
    >
  ): any;
  _: true;
};

const Field = defineComponent(
  (_, context: SetupContext) => {
    const field = useField(context.attrs as never);

    const fieldBinding = {
      name: context.attrs.name,
      value: field.api.state.value,
      onChange: (e: any) => {
        field.api.handleChange(e.target.value);
      },
      onBlur: field.api.handleBlur,
      modelValue: field.api.state.value,
      "onUpdate:modelValue": field.api.handleChange,
    };

    provide(
      FieldMetaKey,
      computed(() => field.state.value.meta)
    );

    return () =>
      context.slots.default!({
        field: fieldBinding,
      });
  },
  { name: "Field", inheritAttrs: false }
);

const FormStateKey: InjectionKey<
  Ref<Pick<FormState<unknown>, "submissionAttempts">>
> = Symbol("FormState");

export function useFormState() {
  const ctx = inject(FormStateKey);

  if (!ctx) {
    throw new Error("useFormState must be used within a Form component");
  }

  return ctx;
}

const FieldMetaKey: InjectionKey<Ref<FieldState<unknown>["meta"]>> =
  Symbol("FieldMeta");

export function useFieldMeta() {
  const ctx = inject(FieldMetaKey);

  if (!ctx) {
    throw new Error("useFieldMeta must be used within a Field component");
  }

  return ctx;
}
