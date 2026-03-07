import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

export const ModalCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  border-radius: 12px;
  transform: translate(-50%, -50%);
  padding: 2.5rem;
  background-color: ${({ theme }) => theme.backgroundColor.card || '#1a1a1a'};
  color: ${({ theme }) => theme.color.light};
  border: 1px solid ${({ theme }) => theme.border.default || '#333'};
  z-index: 1001;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);

  @media all and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 90%;
    padding: 1.5rem;
  }
`;

export const ModalLink = styled.a`
  color: ${({ theme }) => theme.CTA.primary};
  text-decoration: underline;
  font-weight: 600;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;
