import axios from "axios";

export const aiPageReader = async (
  pageContent: string,
  prompt: string,
): Promise<string> => {
  try {
    console.log("Sending request to local AI service...");
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "tinyllama:latest", // Specify your local model
      prompt: `${prompt}\n\nPage Content:\n${pageContent}`,
      stream: false, // Set to false for a single response
    });
    return response.data.response;
  } catch (error) {
    console.error("Error communicating with local AI service:", error);
    throw new Error("Failed to get response from AI service");
  }
};

aiPageReader("Sample page content", "Summarize the content of the page.");
