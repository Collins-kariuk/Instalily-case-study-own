import axios from 'axios';

export const getAIMessage = async (userQuery) => {
  try {
    // Make a POST request to your backend with the user query
    const response = await axios.post('http://localhost:5001/query', {query: userQuery});

    // Assuming the backend returns an object with a "message" property
    const message = {
      role: "assistant",
      content: response.data.message
    };

    return message;
  } catch (error) {
    console.error("Error fetching AI message: ", error.response ? error.response.data : error.message);
    return {
      role: "assistant",
      content: "Sorry, something went awry. Please try again."
    };
  }
};
