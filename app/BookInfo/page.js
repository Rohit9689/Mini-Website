"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Book_info } from "../graphql/Query";
import { Spinner, Alert, Card, ListGroup, Form, Button } from "react-bootstrap";
import styles from "./page.module.css";
import { Delete_Book } from "../graphql/Mutation";

const Page = () => {
  const { loading, error, data } = useQuery(Book_info);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteBook] = useMutation(Delete_Book);

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log("Search term:", term);
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteBook({ variables: { deleteBookId: bookId } });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h4 className="ms-3">Loading your data, please wait...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Alert variant="danger">
          <Alert.Heading>Oops! Something went wrong.</Alert.Heading>
          <p>{error.message}</p>
          <hr />
          <p className="mb-0">Please try again later.</p>
        </Alert>
      </div>
    );
  }

 

  const filteredBooks = data.getBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`container mt-4 ${styles.pageContainer}`}>
      <h1 className={styles.title}>Book List</h1>
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div className="col-md-4 mb-4" key={book.id}>
              <Card className={`shadow-sm ${styles.card}`}>
                <Card.Body>
                  <Card.Title className={styles.cardTitle}>
                    {index + 1}. {book.title}
                  </Card.Title>
                  <Card.Subtitle
                    className={`mb-2 text-muted ${styles.cardSubtitle}`}
                  >
                    by {book.author}
                  </Card.Subtitle>
                  <Card.Text className={styles.cardText}>
                    <strong>Description:</strong> {book.description}
                    <br />
                    <strong>Price:</strong> ${book.price}
                    <br />
                    <strong>Publisher:</strong> {book.publisher}
                    <br />
                    <strong>Edition:</strong> {book.edition}
                  </Card.Text>
                  {book.reviews.length > 0 && (
                    <Card.Title className={styles.reviewTitle}>
                      Reviews
                    </Card.Title>
                  )}
                  <ListGroup>
                    {book.reviews.map((review) => (
                      <ListGroup.Item
                        key={review.id}
                        className={styles.reviewItem}
                      >
                        <strong>Rating:</strong> {review.rating}/10
                        <br />
                        <strong>Comment:</strong> {review.comment}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(book.id)}
                    style={{
                      backgroundColor: "#008080",
                      borderColor: "#008080",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No books found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
