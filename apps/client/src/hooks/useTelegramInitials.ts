import { useEffect, useState } from "react";

interface TelegramInitials {
  telegramId: number | null;
  name: string | null;
}

export const useTelegramInitials = (): TelegramInitials => {
  const [telegramInitials, setTelegramInitials] = useState<TelegramInitials>({
    telegramId: null,
    name: null,
  });

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();

      const initData = tg.initDataUnsafe;
      setTelegramInitials({
        telegramId: (initData.user?.id as unknown as number) || null,
        name:
          `${initData.user?.first_name || ""} ${initData.user?.last_name || ""}`.trim() ||
          null,
      });
    }
  }, []);

  return telegramInitials;
};
