import api from ".";

export const getMetrics = async () => {
  const { data } = await api.get(
    `${import.meta.env.VITE_BASE_URL}/metrics/landing-page`,
  );

  return data.content;
};
