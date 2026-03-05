import api from ".";

export const getQuests = async ({
  limit = 10,
  offset = 1,
  searchValue,
} = {}) => {
  console.log({ searchValue });
  const { data } = await api.get(
    `${import.meta.env.VITE_BASE_URL}/quests?limit=${limit}&offset=${offset}&${searchValue !== "" ? `questTitle=${searchValue}` : ""}`,
  );

  return data.content;
};
