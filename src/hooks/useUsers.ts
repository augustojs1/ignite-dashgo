import { useQuery } from "react-query";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

// jogando toda a lógica do react-query para um hook
export async function getUsers(): Promise<User[]> {
  const { data } = await api.get("users");

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

  console.log(users);

  return users;
}

export function useUsers() {
  return useQuery(
    "users",
    getUsers,
    // tempo que o estado dos dados ficará como fresh (após isso ele será considerado stale e irá fazer uma nova requisição)
    {
      staleTime: 1000 * 5, // 5 seconds
    }
  );
}
