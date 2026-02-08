import api from ".";

export const getQuests = async ({
  limit = 10,
  offset = 1,
  sort = "DESC",
  searchValue,
} = {}) => {
  const { data } = await api.get(
    `${import.meta.env.VITE_BASE_URL}/quests?sortBy=createdAt:${sort}&limit=${limit}&offset=${offset}&searchValue=${searchValue}`,
  );

  return data.content;
};
