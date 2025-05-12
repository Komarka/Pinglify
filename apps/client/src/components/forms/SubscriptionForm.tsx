import {
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import {
  SubscriptionFormValues,
  subscriptionValidationSchema,
} from "./schemas";
import { addDays, format } from "date-fns";

interface Props {
  initialValues?: SubscriptionFormValues;
  onSubmit: (values: SubscriptionFormValues) => void;
  isSubmitting?: boolean;
  subscription?: Partial<SubscriptionFormValues>;
}

export const SubscriptionForm = ({
  initialValues = { name: "", price: undefined, nextPayment: "" },
  onSubmit,
  isSubmitting = false,
  subscription,
}: Props) => {
  const formattedSubscription = subscription
    ? {
        ...subscription,
        nextPayment: subscription.nextPayment
          ? new Date(subscription.nextPayment).toISOString().split("T")[0]
          : "",
      }
    : undefined;

  const mergedInitialValues = formattedSubscription
    ? { ...initialValues, ...formattedSubscription }
    : initialValues;

  return (
    <Formik
      initialValues={mergedInitialValues}
      validationSchema={subscriptionValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form>
        <VStack spacing={4}>
          <Field name="name">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={!!form.errors.name && !!form.touched.name}
              >
                <FormLabel color="white">
                  Service Name
                  <Text ml="2px" as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Netflix"
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="price">
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.price && form.touched.price}>
                <FormLabel color="white">
                  Price per month
                  <Text ml="2px" as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <Input
                  {...field}
                  placeholder="12.99"
                  type="number"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                  }}
                />
                <Text fontSize="x-small" color="gray.400" mt={1}>
                  In USD
                </Text>
                <FormErrorMessage>{form.errors.price}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="nextPayment">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.nextPayment && form.touched.nextPayment}
              >
                <FormLabel color="white">
                  Next Payment Date
                  <Text ml="2px" as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <Input
                  {...field}
                  type="date"
                  min={format(addDays(new Date(), 2), "yyyy-MM-dd")}
                  onChange={(e) => {
                    form.setFieldValue(field.name, e.target.value);
                  }}
                  onBlur={() => {
                    form.setFieldTouched(field.name, true);
                  }}
                />
                <FormErrorMessage>{form.errors.nextPayment}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            disabled={isSubmitting}
            colorScheme="purple"
            type="submit"
            width="100%"
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </VStack>
      </Form>
    </Formik>
  );
};
