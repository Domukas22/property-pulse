//
//
//

import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos/1";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then((response) => {
  const todo = response.data as Todo;

  const id = todo.id;
  const title = todo.title;
  const completed = todo.completed;

  LOG_todo(id, title, completed);
});

const LOG_todo = (id: number, title: string, completed: boolean) => {
  console.log(`id: ${id}, title: ${title}, finished: ${completed}`);
};


