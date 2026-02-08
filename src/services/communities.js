import api from ".";

export const getCommunities = async ({
  limit = 10,
  offset = 1,
  sort = "DESC",
  communityOwnerId = "",
  searchValue = "",
} = {}) => {
  const { data } = await api.get(
    `${import.meta.env.VITE_BASE_URL}/communities?sortBy=createdAt:${sort}&limit=${limit}&offset=${offset}&searchValue=${searchValue}&${communityOwnerId !== "" && `communityOwnerId=${communityOwnerId}`}`,
  );

  return data.content;
};
