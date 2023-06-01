// Import necessary dependencies and components
import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "./App.css";
import Header from "./Header";
import Article from "./Article";

// Define some constants
const TOTAL_PAGES = 10; // Define the total number of pages of news articles
const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY; // API key for the Guardian API
const API_ENDPOINT = "https://content.guardianapis.com/world/europe-news"; // API endpoint for fetching news data

// Define the main App component
function App() {
  // Initialize state variables
  const [newsData, setNewsData] = useState([]); // State variable for storing the news data
  const [currentPage, setCurrentPage] = useState(1); // State variable for the current page
  const [error, setError] = useState(null); // State variable for any errors during data fetch
  const [selectedNewsId, setSelectedNewsId] = useState(null); // State variable for the ID of the selected news article

  // Function to format the date
  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // This will return the date part of an ISO string (YYYY-MM-DD)
  };

  // Function to clear the selected news ID
  const clearSelectedNewsId = () => {
    setSelectedNewsId(null); // Set the selectedNewsId state to null
  };

  // Use the useEffect hook to fetch news data when the currentPage changes
  useEffect(() => {
    // Define an async function to fetch the news data
    const fetchNews = async () => {
      try {
        // Make the GET request to the API endpoint
        const res = await axios.get(
          `${API_ENDPOINT}?api-key=${API_KEY}&show-fields=all&page=${currentPage}&page-size=10`
        );

        // After the response is received, organize the data by date
        const newsByDate = {};
        for (const newsItem of res.data.response.results) {
          const date = formatDate(new Date(newsItem.webPublicationDate));
          if (!newsByDate[date]) {
            newsByDate[date] = [];
          }
          newsByDate[date].push(newsItem);
        }

        // Set the newsData state to the newly organized data
        setNewsData(newsByDate);
        window.scrollTo(0, 0); // Scroll to top of page after data is fetched
      } catch (error) {
        // If there is an error, set the error state to the error message
        setError(error.message);
      }
    };

    // Call the fetchNews function
    fetchNews();
  }, [currentPage]); // This hook runs whenever currentPage changes

  // Function to change the currentPage state
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to generate page numbers for pagination
  const generatePageNumbers = () => {
    let pages = [];
    for (let i = 0; i < TOTAL_PAGES; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i + 1)} // When a page number button is clicked, go to that page
          className={i + 1 === currentPage ? "font-bold" : ""}
        >
          {i + 1}
        </button>
      );
    }
    return pages; // Return the array of buttons
  };

  // If there's an error, render an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // The main render method of the App component
  return (
    <div className="container">
      <Header />
      {selectedNewsId ? (
        // If a news ID is selected, render the Article component
        <Article id={selectedNewsId} onBack={clearSelectedNewsId} />
      ) : (
        // If no news ID is selected, render the list of news articles
        Object.entries(newsData).map(([date, newsItems]) => (
          <div key={date} className="day-news grid grid-cols-news">
            <div className="date-container">
              <p className="date-title">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="news-grid">
              {newsItems.map((newsItem) => (
                <NewsCard
                  key={newsItem.id}
                  newsItem={newsItem}
                  onClick={setSelectedNewsId}
                />
              ))}
            </div>
          </div>
        ))
      )}
      {!selectedNewsId && ( // only show pagination when no article is selected
        <div className="page-controls">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>
          {generatePageNumbers()}
          {currentPage < TOTAL_PAGES && <p>...</p>}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === TOTAL_PAGES}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

// Export the App component
export default App;
