import { useEffect, useState } from "react";
import { ERROR_MESSAGE, SUBSCRIPTIONS_API_URL } from "./consts";

export interface Subscription {
  id: string;
  name: string;
  price: number;
  nextPayment: string;
  isNotificationSent: boolean;
}

export const useFetchSubscriptions = (userId?: string) => {
  const [data, setData] = useState<Subscription[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = async (signal?: AbortSignal) => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${SUBSCRIPTIONS_API_URL}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });

      if (!response.ok) {
        setError(ERROR_MESSAGE);
        return;
      }

      const result = await response.json();
      setData(result);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        setError(err instanceof Error ? err.message : ERROR_MESSAGE);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    fetchSubscriptions(signal);

    return () => {
      controller.abort();
    };
  }, [userId]);

  return { data, loading, error, refetch: fetchSubscriptions };
};
