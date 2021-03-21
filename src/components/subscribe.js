import React, { useState } from 'react';
import { ERROR_MESSAGES } from '../constants';

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [errorCode, setErrorCode] = useState(0);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleTextChange = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setSuccess(false);
      setErrorCode(400);
    } else {
      setSubmitting(true);
      setErrorCode(0);
      setSuccess(false);
  
      fetch('https://us-central1-test-database-200da.cloudfunctions.net/subscribeToBlog', {
        method: 'post',
        body: JSON.stringify({ email }),
      }).then(res => {
        if (res.status === 409) {
          setErrorCode(409);
        }
        if (res.status === 200) {
          setEmail('');
          setSuccess(true);
        }
      }).catch(() => {
        setErrorCode(500);
      }).finally(() => {
        setSubmitting(false);
      });
    }
  };

  return (
    <div
      className="subscribe"
      data-sal="slide-left"
      data-sal-delay="100"
      data-sal-duration="500"
      data-sal-easing="ease"
    >
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
          <h3>Subscribe</h3>
        </button>
      </form>
      { errorCode > 0 && (
        <p className="email-response error">{ERROR_MESSAGES[errorCode]}</p>
      ) }
      { success && (
        <p className="email-response success">
          <strong>Welcome aboard!</strong> You'll be the first to know when I release a new blog post.
        </p>
      ) }
    </div>
  );
};

export default Subscribe;
