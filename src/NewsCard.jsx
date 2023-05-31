import { MdSchedule } from "react-icons/md";
import "./NewsCard.css";

export default function NewsCard({ newsItem, onClick }) {
  const time = new Date(newsItem.webPublicationDate).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="news-card" onClick={() => onClick(newsItem.id)}>
      <div>
        <img
          src={newsItem.fields.thumbnail}
          alt={newsItem.webTitle}
          className="news-image"
        />
        <h2 className="news-title" onClick={() => onClick(newsItem.id)}>
          {newsItem.webTitle}
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
