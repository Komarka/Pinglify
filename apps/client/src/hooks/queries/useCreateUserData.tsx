import { useEffect, useState } from "react";
import { ERROR_MESSAGE, USER_API_URL } from "./consts";

interface CreateUserData {
  telegramId: number | null;
  name: string | null;
}

interface UserResponse {
  id: string;
  telegramId: string;
  name: string | null;
  createdAt: Date;
}

const useCreateUserData = (data: CreateUserData | null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UserResponse | null>(null);

  useEffect(() => {
    if (!data?.telegramId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(USER_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          signal,
        });

        if (!response.ok) {
          setError(ERROR_MESSAGE);
        }

        const result = await response.json();
        setResult(result);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [data]);

  return { result, loading, error };
};

export default useCreateUserData;
