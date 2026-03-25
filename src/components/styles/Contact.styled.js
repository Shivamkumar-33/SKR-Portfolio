import styled from "styled-components";

export const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.backgroundColor.card};
  padding: 3rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1rem 0.8rem;
  background: ${({ theme }) => theme.backgroundColor.dark};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: ${({ theme }) => theme.color.light};
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;

  ::placeholder {
    color: transparent;
  }

  &:focus,
  &:not(:placeholder-shown) {
    outline: none;
    border-color: ${({ theme }) => theme.backgroundColor.orange};
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 15px rgba(252, 41, 4, 0.15);
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    top: -0.6rem;
    left: 0.8rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.backgroundColor.orange};
    opacity: 1;
    background: ${({ theme }) => theme.backgroundColor.card};
    padding: 0 0.5rem;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem 1rem 0.8rem;
  background: ${({ theme }) => theme.backgroundColor.dark};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: ${({ theme }) => theme.color.light};
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 180px;
  transition: all 0.3s ease;

  ::placeholder {
    color: transparent;
  }

  &:focus,
  &:not(:placeholder-shown) {
    outline: none;
    border-color: ${({ theme }) => theme.backgroundColor.orange};
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 15px rgba(252, 41, 4, 0.15);
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    top: -0.6rem;
    left: 0.8rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.backgroundColor.orange};
    opacity: 1;
    background: ${({ theme }) => theme.backgroundColor.card};
    padding: 0 0.5rem;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.light};
  opacity: 0.6;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.backgroundColor.orange};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 1.2rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(252, 41, 4, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(252, 41, 4, 0.4);
    background: #ff3c17; /* a slightly brighter shade of orange */
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(252, 41, 4, 0.3);
  }
`;
