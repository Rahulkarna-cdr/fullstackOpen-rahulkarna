const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new error("something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("unable to fetch data from server");
  }
};

export default {getAll};
