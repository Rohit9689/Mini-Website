"use client";
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaQuoteLeft } from 'react-icons/fa'; 
import styles from './Home.module.css'; 

const quotes = [
  {
    text: "I'm on a whiskey diet. I've lost three days already!",
    author: "Tommy Cooper",
    bgColor: "#f0f0f0" 
  },
  {
    text: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    author: "Satish",
    bgColor: "#e6f7ff" 
  },
  {
    text: "Why don’t scientists trust atoms? Because they make up everything!",
    author: "ABhi",
    bgColor: "#fff3e6" 
  }
];

const Home = () => {
  return (
    <Container fluid className={`mt-4 ${styles.classicBackground}`}>
      <Container className={`bg-teal text-white text-center py-5 ${styles.mainHeader}`}>
        <h1 className={styles.heading}>Welcome to Our Humorous Haven!</h1>
        <p className={styles.subText}>Your journey to laughter and inspiration begins here.</p>
        <Button variant="light" href="#explore" className={styles.exploreButton}>Explore the Fun</Button>
      </Container>

      <Row className="mt-4">
        {quotes.map((quote, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card className={`text-center ${styles.card}`} style={{ backgroundColor: quote.bgColor }}>
              <Card.Body>
                <FaQuoteLeft className={styles.quoteIcon} />
                <blockquote className={`blockquote mb-0 ${styles.quoteText}`}>
                  <p className={`text-dark`}>{quote.text}</p>
                  <footer className={`blockquote-footer text-dark ${styles.footerText}`}>
                    {quote.author}
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <footer className={`text-center mt-5 ${styles.footer}`}>
        <p className="text-dark">&copy; {new Date().getFullYear()} Your Company. All rights reserved by Rohit Varma.</p>
        <Button variant="teal" href="#contact" className={styles.contactButton}>Contact Us</Button>
      </footer>
    </Container>
  );
};

export default Home;
