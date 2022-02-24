import styled from "@emotion/styled";

export const Label_container = styled.div`
  dispay: flex;
  flex-direction: collumn;
  width: 60%;
`;

export const Form_header = styled.h1`
  padding: 1rem;
  height: auto;
  text-align: center;
  margin: 0;
  width: 40%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: var(--main-white);
  background: var(--form-gray);
  @media (max-width: 1010px) {
    width: 90%;
  }
`;

export const Form = styled.form`
  width: 40%;
  height: 60vh;
  padding: 3rem;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1);
  @media (max-width: 1010px) {
    padding: 0rem;
    width: 90%;
  }
`;

export const Button = styled.button`
  margin-top: 1rem;
  border-radius: 5px;
  width: 60%;
  background-color: var(--button-blue);
  color: var(--main-white);
  border: 1px solid var(--input-border-color);
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;
  font-size: 1rem;
  &:hover {
    opacity: 0.7;
    transition: 0.2s;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 2rem;
  margin: 0.5rem 0;
  border: 1px solid var(--input-border-color);
  border-radius: 5px;
  transition: 0.3s;
  padding: 1.3rem 0.9rem;
`;
