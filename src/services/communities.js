import api from ".";

export const getCommunities = async ({
  limit = 10,
  offset = 1,
  searchValue = "",
} = {}) => {
  const { data } = await api.get(
    `${import.meta.env.VITE_BASE_URL}/communities?&limit=${limit}&offset=${offset}&${searchValue !== "" ? `communityName=${searchValue}` : ""}`,
  );

  return data.content;
};
