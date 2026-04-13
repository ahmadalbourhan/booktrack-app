import React, { useState, useEffect } from 'react';
import './Home.css';

export default function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch books data
        const fetchBooks = async () => {
            try {
                // Replace with your API endpoint
                const response = await fetch('/api/books');
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="home">
            <h1>Welcome to BookTrack</h1>
            <p>Track and manage your reading collection</p>
            
            <div className="books-grid">
                {books.map((book) => (
                    <div key={book.id} className="book-card">
                        <img src={book.cover} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}