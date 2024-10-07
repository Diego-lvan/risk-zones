import { API_URL } from "@/common/constants/api";

export const NewsApi = {
  createNews: async (newsData: any) => {
    const response = await fetch(`${API_URL}/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsData),
    });
    return response.json();
  },
};
