import React, { useState } from "react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      text: "This service is amazing! Highly recommend it.",
      author: "John Doe",
      email: "john.doe@example.com",
      rating: 5,
    },
    {
      text: "The team was professional and delivered beyond expectations.",
      author: "Jane Smith",
      email: "jane.smith@example.com",
      rating: 4,
    },
  ]);

  const [newTestimonial, setNewTestimonial] = useState({
    text: "",
    author: "",
    email: "",
    rating: 5,
  });

  const [showForm, setShowForm] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setNewTestimonial((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi email sederhana
    if (!/\S+@\S+\.\S+/.test(newTestimonial.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setTestimonials((prev) => [...prev, newTestimonial]);

    // Reset form setelah submit
    setNewTestimonial({
      text: "",
      author: "",
      email: "",
      rating: 5,
    });

    setShowForm(false);
  };

  const renderStars = (rating, onClick) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "filled" : ""}`}
        onClick={() => onClick(index + 1)}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="testimonial-section">
      <h2>Testimonials</h2>

      {/* Button to toggle testimonial list */}
      <button
        onClick={() => setShowTestimonials((prev) => !prev)}
        className="btn-toggle-testimonials"
      >
        {showTestimonials ? "Hide Testimonials" : "Show Testimonials"}
      </button>

      {/* Testimonial List */}
      {showTestimonials && (
        <div className="testimonial-list">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-rating">
                {renderStars(testimonial.rating, () => {})}
              </div>
              <div className="testimonial-author">
                <h4>{testimonial.author}</h4>
                <span className="author-email">{testimonial.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Button to toggle form */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="btn-toggle-form"
      >
        {showForm ? "Cancel Submission" : "Add Testimonial"}
      </button>

      {/* Form Input */}
      {showForm && (
        <form onSubmit={handleSubmit} className="testimonial-form">
          <div className="form-group">
            <label htmlFor="author">Name</label>
            <input
              type="text"
              id="author"
              name="author"
              value={newTestimonial.author}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newTestimonial.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">Testimonial</label>
            <textarea
              id="text"
              name="text"
              value={newTestimonial.text}
              onChange={handleInputChange}
              placeholder="Share your experience"
              required
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="star-rating">
              {renderStars(newTestimonial.rating, handleRatingChange)}
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Testimonials;
