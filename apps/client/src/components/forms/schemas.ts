import * as Yup from "yup";

export interface SubscriptionFormValues {
  name: string;
  price: number | undefined;
  nextPayment: string;
}

export const subscriptionValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  nextPayment: Yup.date().required("Next payment date is required"),
});
