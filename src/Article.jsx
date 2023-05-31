import { useEffect, useState } from "react";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";

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
    <div>
      <button onClick={onBack}>
        <MdArrowBack /> Back
      </button>
      <h2>{articleData.webTitle}</h2>
      <p>{articleData.fields.trailText}</p>
      <img src={articleData.fields.thumbnail} alt={articleData.webTitle} />
      <p>Image text and photographer's name not available</p>
      <p>By {articleData.fields.byline}</p>
      <p>
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
      <div dangerouslySetInnerHTML={{ __html: articleData.fields.body }} />
    </div>
  );
}

export default Article;
