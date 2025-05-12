import { useState } from "react";
import { CREATE_SUBSCRIPTION_API_URL, ERROR_MESSAGE } from "./consts";

interface CreateSubscriptionPayload {
  userId: string;
  name: string;
  price: number;
  nextPayment: string;
}

export const useCreateSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createSubscription = async (payload: CreateSubscriptionPayload) => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(CREATE_SUBSCRIPTION_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create subscription.");
      }

      const result = await response.json();
      setIsSuccess(true);
      return result;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGE);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createSubscription,
    loading,
    error,
    isSuccess,
    setError,
    setIsSuccess,
  };
};
