import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    html{
    scroll-behavior: smooth;
    }

    body {
    font-size: 100%;
    font-family: ${({ theme }) => theme.fonts.montserrat};
    background-color: ${({ theme }) => theme.backgroundColor.dark};
    color: ${({ theme }) => theme.color.light};
    transition: background-color 0.4s ease, color 0.4s ease;
    }

    img {
    object-fit: cover;
    }

    li {
    list-style: none;
    }

    a {
    text-decoration: none;
    color: inherit;
    }

    /* Focus-visible for keyboard accessibility */
    a:focus-visible,
    button:focus-visible,
    [role="button"]:focus-visible,
    [tabindex]:focus-visible {
      outline: 2px solid ${({ theme }) => theme.CTA.primary};
      outline-offset: 3px;
      border-radius: 2px;
    }

    /* Better text selection */
    ::selection {
      background: rgba(252, 41, 4, 0.3);
      color: #fff;
    }

    /* Smooth scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.backgroundColor.dark};
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    section,
    footer{
    padding: 4.32875rem 5rem 7.6125rem 5rem;
    background-color: ${({ theme }) => theme.backgroundColor.dark};
    transition: background-color 0.4s ease;

    @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
        padding: 7.6125rem 2.5rem 7.6125rem 2.5rem;
    }
    }
`;

export default GlobalStyles;
