// Import the axios library for making HTTP requests
import axios from 'axios';

// Define an asynchronous function to get a message from the AI backend
export const getAIMessage = async (userQuery) => {
  try {
    // Make a POST request to the backend server with the user query
    const response = await axios.post('http://localhost:5001/query', { query: userQuery });

    // Assuming the backend returns an object with a "message" property,
    // create an object to represent the assistant's response
    const message = {
      role: "assistant",
      content: response.data.message
    };

    // Return the assistant's message
    return message;
    
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching AI message: ", error.response ? error.response.data : error.message);

    // Return an error message if the request fails
    return {
      role: "assistant",
      content: "Sorry, something went awry. Please try again."
    };
  }
};
