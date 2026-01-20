import axios from "axios";

const prompt = `You are an AI assistant that helps users by summarizing web page content. Given the content of a web page, provide a concise summary highlighting the main points and important information.
in a json format with the following structure:
{ 
"job title": "The title of the job or page.",
  "job location": "The location mentioned on the page.",
  "company name": "The name of the company or organization.",
  "job description": "A brief description of the job or page content.",
  "job requirements": "A list of key requirements or qualifications mentioned.",
  "benefits": "A list of benefits or perks associated with the job or page.",
  "
  "summary": "A brief summary of the page content.",
  "key_points": [
    "First key point.",
    "Second key point.",
    "Third key point."
  ]
}
Ensure the summary is clear and the key points are relevant to the main topics discussed on the page.`;

export const aiPageReader = async (pageContent: string, prompt: string) => {
  try {
    console.log("Sending request to local AI service...");
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "tinyllama:latest",
      prompt: `${prompt}\n\nPage Content:\n${pageContent}`,
      stream: false,
    });
    return response.data.response;
  } catch (error) {
    console.error("Error communicating with local AI service:", error);
    throw new Error("Failed to get response from AI service");
  }
};

aiPageReader("Sample page content", prompt)
  .then((response) => {
    console.log("AI Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
