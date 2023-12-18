import styled from "styled-components";

export const FormContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 25px;
  color: #333;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
  font-size: 25px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }

  input {
    font-size: 20px;
    width: 500px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #006400;
  }

  textarea {
    font-size: 20px;
    width: 500px;
    height: 100px;
    border-radius: 5px;
    border: 1px solid #006400;
  }
`;

export const SubmitButton = styled.button`
  font-size: 20px;
  padding: 8px 15px;
  background-color: #517536;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #006400;
  }
`;
