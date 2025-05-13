import {
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  chakra,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import {
  SubscriptionFormValues,
  subscriptionValidationSchema,
} from "./schemas";
import { addDays, format, set } from "date-fns";
import Select from "react-select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ERROR_MESSAGE } from "../../hooks/queries/consts";

interface Props {
  initialValues?: SubscriptionFormValues;
  onSubmit: (values: SubscriptionFormValues) => void;
  isSubmitting?: boolean;
  subscription?: Partial<SubscriptionFormValues>;
}

const ChakraReactSelect = chakra(Select);

type BrandsResponse = {
  name: string;
  domain: string;
  icon: string;
};

type Option = {
  value: string;
  label: string;
  icon: string;
};

export const SubscriptionForm = ({
  initialValues = { name: "", price: undefined, nextPayment: "" },
  onSubmit,
  isSubmitting = false,
  subscription,
}: Props) => {
  const [queries, setQueries] = useState<BrandsResponse[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const formattedSubscription = subscription
    ? {
        ...subscription,
        nextPayment: subscription.nextPayment
          ? new Date(subscription.nextPayment).toISOString().split("T")[0]
          : "",
      }
    : undefined;

  const formattedQueries = useMemo(() => {
    return queries.map((query) => ({
      value: query.name,
      label: query.name,
      icon: query.icon,
    }));
  }, [queries]);

  const mergedInitialValues = formattedSubscription
    ? { ...initialValues, ...formattedSubscription }
    : {
        ...initialValues,
        nextPayment: format(addDays(new Date(), 2), "yyyy-MM-dd"),
      };

  const getQueries = useCallback(async (searchValue: string) => {
    if (searchValue !== "") {
      try {
        const url = `https://api.brandfetch.io/v2/search/${searchValue}?c=1idB8NGPQxJv0lYj8Ps`;
        setIsLoading(true);
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setQueries(data);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : ERROR_MESSAGE,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setQueries([]);
  }, []);

  useEffect(() => {
    if (formattedSubscription && formattedSubscription.name) {
      getQueries(formattedSubscription.name);
      setQuery(formattedSubscription.name);
    }
  }, []);

  const selectedValue = useMemo(() => {
    const selected = formattedQueries.find((item) => item.value === query);
    return selected
      ? { value: selected.value, label: selected.label, icon: selected.icon }
      : null;
  }, [query, formattedQueries]);

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
                <ChakraReactSelect
                  {...field}
                  value={selectedValue}
                  isSearchable
                  isLoading={isLoading}
                  options={formattedQueries}
                  placeholder="Search for service name"
                  onInputChange={(inputValue: string) => {
                    if (inputValue) {
                      getQueries(inputValue);
                      setQuery(inputValue);
                    }
                  }}
                  onChange={(option: Option) => {
                    setQuery(option?.value);
                    form.setFieldValue(field.name, option?.value);
                  }}
                  onBlur={() => form.setFieldTouched(field.name, true)}
                  formatOptionLabel={(option: {
                    icon: string;
                    label: string;
                  }) => {
                    return (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={option.icon}
                          style={{ width: 20, height: 20, marginRight: 10 }}
                        />
                        {option.label}
                      </div>
                    );
                  }}
                  styles={{
                    input: (base) => ({
                      ...base,
                      color: "white",
                      borderColor: "white",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#241A3F",
                      borderColor: "#805AD5",
                      color: "white",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#805AD5" : "#241A3F",
                      color: "white",
                      cursor: "pointer",
                    }),
                    control: (base) => ({
                      ...base,
                      backgroundColor: "#2A1D4E",
                      borderColor: "white",
                      color: "white",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "white",
                    }),
                  }}
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
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (
                      !/[0-9.]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }

                    if (e.key === "." && field.value.includes(".")) {
                      e.preventDefault();
                    }
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
                  defaultValue={format(addDays(new Date(), 2), "yyyy-MM-dd")}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const minDate = addDays(new Date(), 2);

                    if (selectedDate < minDate) {
                      form.setFieldValue(
                        field.name,
                        format(minDate, "yyyy-MM-dd")
                      );
                    } else {
                      form.setFieldValue(field.name, e.target.value);
                    }
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
