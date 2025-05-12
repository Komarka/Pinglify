import { useState } from "react";
import { EDIT_SUBSCRIPTION_API_URL, ERROR_MESSAGE } from "./consts";
import { Subscription } from "./useFetchSubscriptions";

export const useEditSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const editSubscription = async ({
    id,
    ...payload
  }: Partial<Subscription>) => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(`${EDIT_SUBSCRIPTION_API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || ERROR_MESSAGE);
      }

      const result = await response.json();
      setIsSuccess(true);
      return result;
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    editSubscription,
    loading,
    error,
    isSuccess,
    setError,
    setIsSuccess,
  };
};
