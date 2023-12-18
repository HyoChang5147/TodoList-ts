import styled from "styled-components";

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const TodoSection = styled.div`
  margin-bottom: 20px;
`;

export const TodoTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 10px;
`;

export const TodoItem = styled.div`
  border: 1px solid #006400;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const TodoHeader = styled.h3`
  font-size: 25px;
  margin-bottom: 5px;
`;

export const TodoContent = styled.p`
  font-size: 20px;
  color: #555;
`;

export const Button = styled.button`
  font-size: 20px;
  padding: 8px 15px;
  margin: 5px;
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

export const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 5px;
  margin: 10px;
`;
