import Form from "../components/Form";
import TodoListCard from "../components/TodoListCard";
import * as St from "../styled-component/StHome";

function Home() {
  return (
    <div>
      <St.Header>To do List</St.Header>
      <Form />
      <TodoListCard />
    </div>
  );
}

export default Home;
