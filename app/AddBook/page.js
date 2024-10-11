'use client';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Add_Book } from '../graphql/Mutation'; 
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBookOpen } from 'react-icons/fa'; 

const Page = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    publisher: '',
    edition: '',
    reviews: [{ rating: '', comment: '' }], 
  });

  const [createBook, { loading, error }] = useMutation(Add_Book, {
    onCompleted: (data) => {
      toast.success('Book created successfully!');
      setBookData({
        title: '',
        author: '',
        description: '',
        price: '',
        publisher: '',
        edition: '',
        reviews: [{ rating: '', comment: '' }],
      });
    },
    onError: (error) => {
      toast.error(`Error creating book: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleReviewChange = (index, e) => {
    const { name, value } = e.target;
    const newReviews = [...bookData.reviews];
    newReviews[index][name] = name === 'rating' ? parseFloat(value) : value;
    setBookData((prevData) => ({
      ...prevData,
      reviews: newReviews,
    }));
  };

  const addReview = () => {
    setBookData((prevData) => ({
      ...prevData,
      reviews: [...prevData.reviews, { rating: '', comment: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedInput = {
      ...bookData,
      price: parseFloat(bookData.price),
      reviews: bookData.reviews.map(review => ({
        ...review,
        rating: parseFloat(review.rating), 
      })), 
    };
    createBook({ variables: { input: formattedInput } });
  };

  return (
    <>
      <Container className={`mt-4 ${styles.classicBackground}`}>
        <h1 className={`${styles.heading} text-center`}><FaBookOpen /> Create a Book 📚</h1>
        <Form onSubmit={handleSubmit} className={styles.form}>
          <Form.Group controlId="formTitle">
            <Form.Label className={styles.funLabel}>Title 🎉</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter book title"
              value={bookData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAuthor">
            <Form.Label className={styles.funLabel}>Author 🖊️</Form.Label>
            <Form.Control
              type="text"
              name="author"
              placeholder="Enter author name"
              value={bookData.author}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label className={styles.funLabel}>Description ✏️</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter book description"
              value={bookData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label className={styles.funLabel}>Price 💲</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              value={bookData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPublisher">
            <Form.Label className={styles.funLabel}>Publisher 🏢</Form.Label>
            <Form.Control
              type="text"
              name="publisher"
              placeholder="Enter publisher name"
              value={bookData.publisher}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEdition">
            <Form.Label className={styles.funLabel}>Edition 📖</Form.Label>
            <Form.Control
              type="text"
              name="edition"
              placeholder="Enter edition"
              value={bookData.edition}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <h3 className={`${styles.heading} text-center`}>Reviews 🌟</h3>
          {bookData.reviews.map((review, index) => (
            <Row key={index} className="mb-3">
              <Col>
                <Form.Group controlId={`formReviewRating${index}`}>
                  <Form.Label className={styles.funLabel}>Rating ⭐</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    placeholder="Enter rating / 10"
                    value={review.rating}
                    onChange={(e) => handleReviewChange(index, e)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`formReviewComment${index}`}>
                  <Form.Label className={styles.funLabel}>Comment 💬</Form.Label>
                  <Form.Control
                    type="text"
                    name="comment"
                    placeholder="Enter comment"
                    value={review.comment}
                    onChange={(e) => handleReviewChange(index, e)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          ))}

          <div className={styles.buttonContainer}>
            <Button type="submit" className={`${styles.button} btn btn-teal`} disabled={loading}>
              {loading ? 'Creating...' : 'Create Book 🎉'}
            </Button>
            <Button variant="success" onClick={addReview} className={`${styles.button} btn btn-teal`}>
              Add Review 🎈
            </Button>
          </div>
        </Form>
        {error && <Alert variant="danger" className="mt-3">Error creating book: {error.message}</Alert>}
      </Container>
      <ToastContainer /> {/* ToastContainer for toasts */}
    </>
  );
};

export default Page;





































