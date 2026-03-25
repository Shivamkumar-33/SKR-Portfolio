import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    html{
    scroll-behavior: smooth;
    overflow-x: clip;
    width: 100%;
    }

    body {
    font-size: 100%;
    font-family: ${({ theme }) => theme.fonts.montserrat};
    background-color: ${({ theme }) => theme.backgroundColor.dark};
    color: ${({ theme }) => theme.color.light};
    transition: background-color 0.4s ease, color 0.4s ease;
    overflow-x: clip;
    width: 100%;
    }

    #root {
    width: 100%;
    overflow-x: clip;
    }

    img {
    object-fit: cover;
    max-width: 100%;
    height: auto;
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

    /* Tablet and mobile share compact spacing to avoid horizontal overflow */
    @media all and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 6.25rem 2rem 5rem 2rem;
    }

    @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
        padding: 7.6125rem 2.5rem 7.6125rem 2.5rem;
    }

    @media all and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 5rem 1rem 4rem 1rem;
    }
    }
`;

export default GlobalStyles;
