"use client";
import React, { useState } from 'react';
import { Add_Review } from "../graphql/Mutation";
import { useMutation } from '@apollo/client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './page.module.css'; 

const Page = () => {
  const [review, setReview] = useState({
    rating: '',
    comment: '',
    bookId: '',
  });

  const [createReview, { loading, error }] = useMutation(Add_Review, {
    onCompleted: (data) => {
      console.log('Review created successfully', data.createReview);
      toast.success("Review Created Successfully");
      setReview({
        rating: '',
        comment: '',
        bookId: '',
      });
    },
    onError: (error) => {
      console.log('Error creating Review', error);
      toast.error("Error Creating Review");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: name === 'rating' || name === 'bookId' ? parseInt(value, 10) || '' : value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.rating || !review.comment || !review.bookId) {
      toast.error("All fields are required");
      return;
    }
    createReview({ variables: { input: review } });
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>Submit a Review 📝</h1>
        <div className={styles.inputGroup}>
          <input
            type="number"
            name="rating"
            placeholder="Rating ⭐ / 10"
            value={review.rating}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="comment"
            placeholder="Your Thoughts 💬"
            value={review.comment}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="number"
            name="bookId"
            placeholder="Book ID 📚"
            value={review.bookId}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>
        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Submitting...' : 'Submit Review 🚀'}
        </button>
        
        {error && <p style={{ color: '#d9534f' }}>Error submitting review</p>} 
      </form>
    </div>
  );
};

export default Page;
