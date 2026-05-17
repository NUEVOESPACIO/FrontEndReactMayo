import { apiClient } from "../api/axiosClient";

import type { UserInfo } from "../types/userInfo";
import type { PageResponse } from "../types/pageTypes";

// ======================================
// GET ALL USERS (PAGINATED)
// ======================================
export async function fetchUsers(): Promise<UserInfo[]> {

  const response =
    await apiClient.get<PageResponse<UserInfo>>(
      "/user/list"
    );

  return response.data.content;
}

// Alias
export const listadousuarios = async () => {
  return fetchUsers();
};

// ======================================
// GET USER BY ID
// ======================================
export async function fetchUserById(
  id: number
): Promise<UserInfo> {

  const response =
    await apiClient.get<UserInfo>(
      `/user/${id}`
    );

  return response.data;
}

// Alias
export const listadousuariosById = async (
  idToShow: number
) => {
  return fetchUserById(idToShow);
};