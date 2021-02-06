import React, { useState } from 'react';
import axios from 'axios';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleTextChange = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!isValidateEmail(email)) {
      setSuccess(false);
      setError(true);
    } else {
      setError(false);
      setSubmitting(true);
      fetch('https://us-central1-test-database-200da.cloudfunctions.net/subscribeToBlog', {
        method: 'post',
        body: JSON.stringify({ email })
      }).then(() => {
        setSuccess(true);
        setEmail('');
      }).catch(() => {
        console.log('Error posting email')
      }).finally(() => {
        setSubmitting(false);
      });
    }
  }

  const isValidateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="subscribe">
      <h2>Join the newsletter</h2>
      <p>Subscribe to get my latest content by email.</p>
      <p>No spam, ever.</p>
      <form>
        <input
          type="text"
          placeholder="fergusfrl@gmail.com"
          value={email}
          onChange={handleTextChange}
        />
        <button disabled={submitting} onClick={handleSubmit}>
          <span className="button-box">Subscribe</span>
        </button>
      </form>
      {error && <p className="error">Please enter a valid email address</p>}
        {success && (
          <p className="success">
            Thank you for subscribing!
            Please <span>check your inbox</span> to confirm your subscription.
          </p>
        )}
    </div>
  );
};

export default Subscribe;
