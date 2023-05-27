import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "./App.css";
import Header from "./Header";

const TOTAL_PAGES = 10; // define your total pages
const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const API_ENDPOINT = "https://content.guardianapis.com/world/europe-news";

function App() {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  // Function to format the date
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT}?api-key=${API_KEY}&show-fields=all&page=${currentPage}&page-size=10`
        );

        const newsByDate = {};
        for (const newsItem of res.data.response.results) {
          const date = formatDate(new Date(newsItem.webPublicationDate));
          if (!newsByDate[date]) {
            newsByDate[date] = [];
          }
          newsByDate[date].push(newsItem);
        }

        setNewsData(newsByDate);
        window.scrollTo(0, 0); // scroll to top here
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNews();
  }, [currentPage]);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generatePageNumbers = () => {
    let pages = [];
    for (let i = 0; i < TOTAL_PAGES; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i + 1)}
          className={i + 1 === currentPage ? "font-bold" : ""}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <Header />
      {Object.entries(newsData).map(([date, newsItems]) => (
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
              <NewsCard key={newsItem.id} newsItem={newsItem} />
            ))}
          </div>
        </div>
      ))}
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
    </div>
  );
}

export default App;
