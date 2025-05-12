import { useState } from "react";
import { DELETE_SUBSCRIPTION_API_URL } from "./consts";

export const useDeleteSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const deleteSubscription = async (subscriptionId: string) => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(
        `${DELETE_SUBSCRIPTION_API_URL}/${subscriptionId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || "Failed to delete subscription.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteSubscription, loading, error, isSuccess };
};
