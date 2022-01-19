import { useQuery } from "react-query";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

// jogando toda a lógica do react-query para um hook
export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    users,
    totalCount,
  };
}

export function useUsers(page: number) {
  return useQuery(
    // nome da chave da informação que será armazenada em cache
    ["users", page],
    () => getUsers(page),
    // tempo que o estado dos dados ficará como fresh (após isso ele será considerado stale e irá fazer uma nova requisição)
    {
      staleTime: 1000 * 60 * 10, // 10 minutos
    }
  );
}
