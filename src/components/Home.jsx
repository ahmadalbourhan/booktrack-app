import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBooks() {
      try {
        const { data, error } = await supabase
          .from("books")
          .select("id, title, author, status, current_page, total_pages");

        if (error) throw error;
        setBooks(data || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    }

    getBooks();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "status-completed";
      case "reading":
        return "status-reading";
      case "want-to-read":
        return "status-wanttoread";
      default:
        return "status-default";
    }
  };

  const getProgressPercentage = (current, total) => {
    return total > 0 ? Math.round((current / total) * 100) : 0;
  };

  if (loading) return <div className="loading">Loading your books...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>My Books</h1>
        <p>Track your reading progress</p>
      </div>

      {books.length === 0 ? (
        <div className="empty-state">
          <p>No books yet. Start adding your books!</p>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => {
            const progress = getProgressPercentage(
              book.current_page,
              book.total_pages,
            );
            return (
              <div key={book.id} className="book-card">
                <div className="book-header">
                  <h3 className="book-title">{book.title}</h3>
                  <span
                    className={`status-badge ${getStatusColor(book.status)}`}
                  >
                    {book.status}
                  </span>
                </div>
                <p className="book-author">
                  by {book.author || "Unknown Author"}
                </p>
                <div className="progress-section">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="progress-text">
                    {book.current_page} / {book.total_pages} pages
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
