// Hooks
import { useRequest } from "vue-hooks-plus";
// Utils
import { fetchInstance } from "@/utils/fetchInstance";

interface SettingsServiceProps {
  onSuccessLogin: (response: any) => void;
  onErrorLogin: (error: any) => void;
  onSuccessUpdate: (response: any) => void;
  onErrorUpdate: (error: any) => void;
}

export function useSettingsService({
  onSuccessLogin,
  onErrorLogin,
  onSuccessUpdate,
  onErrorUpdate,
}: SettingsServiceProps) {
  const { loading: loadingLogin, run: login } = useRequest(
    (username: string, avatarIndex: number = 1) => {
      return fetchInstance("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          avatarIndex,
        }),
      });
    },
    {
      manual: true,
      onSuccess(response: any) {
        onSuccessLogin(response);
      },
      onError(error: any) {
        onErrorLogin(error);
      },
    }
  );

  const { loading: loadingUpdate, run: update } = useRequest(
    ({
      playerId,
      username,
      avatarIndex,
    }: {
      playerId: string;
      username: string;
      avatarIndex: number;
    }) => {
      return fetchInstance(`/player/${playerId}`, {
        method: "PATCH",
        body: JSON.stringify({
          username,
          avatarIndex,
        }),
      });
    },
    {
      manual: true,
      onSuccess(response: any) {
        onSuccessUpdate(response);
      },
      onError(error: any) {
        onErrorUpdate(error);
      },
    }
  );

  return {
    loadingLogin,
    loadingUpdate,
    login,
    update,
  };
}
