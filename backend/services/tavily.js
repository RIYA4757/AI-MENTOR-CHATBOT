import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export async function searchTopic(query) {
  console.log("Searching:", query);

  try {
    const response = await tvly.search(query, {
      topic: "general",
      searchDepth: "advanced",
      maxResults: 5,
    });

    console.log(response);

    if (!response.results?.length) {
      return null;
    }

    return {
      title: response.results[0].title,
      url: response.results[0].url,
      content: response.results[0].content,
    };
  } catch (err) {
    console.error("Tavily Error:", err);
    return null;
  }
}