import { useEffect, useState } from "react";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import "./Article.css";

const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const API_ENDPOINT = "https://content.guardianapis.com";

function Article({ id, onBack }) {
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await axios.get(
        `${API_ENDPOINT}/${id}?api-key=${API_KEY}&show-fields=all`
      );
      setArticleData(res.data.response.content);
    };

    fetchArticle();
  }, [id]);

  if (!articleData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-container">
      <button onClick={onBack}>
        <MdArrowBack /> Back
      </button>
      <h2>{articleData.webTitle}</h2>
      <p>{articleData.fields.trailText}</p>
      <img src={articleData.fields.thumbnail} alt={articleData.webTitle} />
      <p className="author-info">By {articleData.fields.byline}</p>
      <p className="publish-info">
        Published on{" "}
        {new Date(articleData.webPublicationDate).toLocaleDateString("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <div
        className="body-text"
        dangerouslySetInnerHTML={{ __html: articleData.fields.body }}
      />
    </div>
  );
}

export default Article;
