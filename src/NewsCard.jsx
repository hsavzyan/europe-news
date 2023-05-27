import { MdSchedule } from "react-icons/md";
import "./NewsCard.css";

export default function NewsCard({ newsItem }) {
  const time = new Date(newsItem.webPublicationDate).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="news-card">
      <div>
        <img
          src={newsItem.fields.thumbnail}
          alt={newsItem.webTitle}
          className="news-image"
        />
        <h2 className="news-title">
          <a href={newsItem.webUrl} target="_blank" rel="noopener noreferrer">
            {newsItem.webTitle}
          </a>
        </h2>
        <p className="news-text">{newsItem.fields.trailText}</p>
      </div>
      <div className="time-container">
        <MdSchedule size={20} className="time-icon" />
        <p>{time}</p>
      </div>
    </div>
  );
}
