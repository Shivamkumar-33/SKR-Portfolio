import React from "react";
import { motion } from "framer-motion";
import {
  ArrowToTop,
  ContactHeader,
  ContactLink,
  Copyright,
  FooterArrowLine,
  FooterBigLink,
  FooterBigLinkContainer,
  FooterContact,
  FooterContacts,
  FooterLine,
  FooterSmallTitle,
  FooterSmallTitleWrapper,
  FooterSocials,
  Small,
  StyledFooter,
} from "../styles/Footer.styled";
import { animateScroll as scroll } from "react-scroll";
import Contact from "../Contact/Contact";

const toTop = () => {
  scroll.scrollToTop({ delay: 0, duration: 0 });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

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

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <StyledFooter
      as={motion.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <FooterSmallTitleWrapper as={motion.div} variants={itemVariants}>
        <FooterSmallTitle>get in touch</FooterSmallTitle>
      </FooterSmallTitleWrapper>

      <FooterBigLinkContainer as={motion.div} variants={itemVariants}>
        <FooterBigLink
          as={motion.a}
          whileHover={{ scale: 1.02 }}
          href="mailto:shivamjmp2@gmail.com"
          data-hover="Let's talk!"
        >
          Need a developer?
        </FooterBigLink>
      </FooterBigLinkContainer>
      
      <Contact />

      <FooterContacts as={motion.div} variants={containerVariants}>
        <FooterContact as={motion.div} variants={itemVariants}>
          <ContactHeader>Call me</ContactHeader>
          <ContactLink href="tel:+917362006858">+917362006858</ContactLink>
        </FooterContact>
        <FooterContact as={motion.div} variants={itemVariants}>
          <ContactHeader>Social</ContactHeader>{" "}
          <FooterSocials>
            <ContactLink
              as={motion.a}
              whileHover={{ x: 5 }}
              href="https://github.com/Shivamkumar-33"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              GitHub
            </ContactLink>
            <ContactLink
              as={motion.a}
              whileHover={{ x: 5 }}
              href="https://www.linkedin.com/in/shivam-kumar-34471224b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </ContactLink>
            <ContactLink
              as={motion.a}
              whileHover={{ x: 5 }}
              href="https://www.instagram.com/shivamkumar_rudra?igsh=MXFydXNlc2J4YzBleg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
            >
              Instagram
            </ContactLink>
          </FooterSocials>
        </FooterContact>
        <FooterContact as={motion.div} variants={itemVariants}>
          <ContactHeader>Let's grab a coffee.</ContactHeader>
          <ContactLink href="mailto:shivamjmp2@gmail.com">
            shivamjmp2@gmail.com
          </ContactLink>
        </FooterContact>
      </FooterContacts>

      <FooterArrowLine as={motion.div} variants={itemVariants}>
        <FooterLine as={motion.div} variants={lineVariants} style={{ originX: 0 }} />
        <ArrowToTop 
          as={motion.button}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          title="Back to Top" 
          onClick={toTop}
        />
      </FooterArrowLine>

      <Copyright as={motion.div} variants={itemVariants}>
        <small>
          &copy; Copyright {year},{" "}
          <Small
            href="https://github.com/Shivamkumar-33"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shivam Kumar
          </Small>
        </small>
      </Copyright>
    </StyledFooter>
  );
};

export default Footer;
