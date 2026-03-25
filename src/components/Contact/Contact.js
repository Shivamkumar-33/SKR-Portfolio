import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  ContactContainer,
  StyledForm,
  FormGroup,
  FormRow,
  Label,
  Input,
  TextArea,
  SubmitButton,
} from "../styles/Contact.styled";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_csaok98",
        "template_b7mmb7g",
        form.current,
        "JsTeXh1Asf50YS5xz"
      )
      .then((result) => {
        // Send auto-reply to the user
        return emailjs.sendForm(
          "service_csaok98",
          "template_zik9oqr",
          form.current,
          "JsTeXh1Asf50YS5xz"
        );
      })
      .then((result) => {
        alert("Thank you for your message! I will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error(error.text);
        alert("Something went wrong, please try again.");
      });
  };

  return (
    <ContactContainer id="contact">
      <StyledForm ref={form} as={motion.form} variants={itemVariants} onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <Label htmlFor="name">Name</Label>
          </FormGroup>

          <FormGroup>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <Label htmlFor="email">Email</Label>
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <Label htmlFor="subject">Subject</Label>
        </FormGroup>

        <FormGroup>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <Label htmlFor="message">Message</Label>
        </FormGroup>

        <SubmitButton type="submit">
          Send Message
        </SubmitButton>
      </StyledForm>
    </ContactContainer>
  );
};

export default Contact;
