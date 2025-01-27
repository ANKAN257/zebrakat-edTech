import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function EmailForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_ma2ewh5";
    const templatId = "template_ppwdu0w";
    const publickey = "SE2777XFVLrsQPFDA";

    // Create object that contains dynamic templates params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Ankank",
      message: message,
    };

    emailjs
      .send(serviceId, templatId, templateParams, publickey)
      .then((response) => {
        console.log("Email sent successfully", response);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.log("Error sending email", error);
      });
  };

  return (
    <section className=" py-12">
      <div className="max-w-screen-md mx-auto px-6 sm:px-12">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block p-3 w-full text-sm rounded-lg border border-gray-300 shadow-sm  bg-white"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block p-3 w-full text-sm rounded-lg border border-gray-300 shadow-sm  bg-white"
              placeholder="name@domain.com"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Your Message
            </label>
            <textarea
              id="message"
              rows="6"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-3 w-full text-sm rounded-lg border border-gray-300 shadow-sm  bg-white"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-custom-blue  transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default EmailForm;
