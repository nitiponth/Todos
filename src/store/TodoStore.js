import { observable, computed, makeAutoObservable, action } from "mobx";
import { v4 as uuidv4 } from "uuid";

// todos {
//     id,
//     task,
//     completed,
// }

// lists {
//     id,
//     name,
//     todos
// }

class TodoStoreImpl {
  todos = [];
  lists = [];
  currentWatch = null;

  constructor() {
    makeAutoObservable(this, {
      todos: observable,
      addTask: action,
      addList: action,
      setCurrentWatch: action,
      toggle: action,
      remove: action,
      clearCompleted: action,
      deleteList: action,
      currentWatchName: computed,
      remainingCount: computed,
    });
  }

  addTask(listId, task) {
    this.todos.push({
      id: uuidv4(),
      task,
      completed: false,
      list: listId,
    });
  }

  addList(name) {
    this.lists.push({
      id: uuidv4(),
      name,
    });
  }

  setCurrentWatch(listId) {
    this.currentWatch = listId;
  }

  get currentWatchName() {
    const index = this.lists.findIndex((list) => list.id === this.currentWatch);
    if (index === -1) {
      return null;
    }
    return this.lists[index].name;
  }

  get currentWatchRemaining() {
    const amount = this.todos.filter(
      (item) => item.list === this.currentWatch && !item.completed
    );
    return amount.length;
  }

  toggle(id) {
    const index = this.todos.findIndex((item) => item.id === id);
    this.todos[index].completed = !this.todos[index].completed;
  }

  remove(id) {
    this.todos = this.todos.filter((item) => item.id !== id);
  }

  clearCompleted() {
    this.todos = this.todos.filter(
      (item) => !item.completed || item.list !== this.currentWatch
    );
  }

  deleteList() {
    this.todos = this.todos.filter((item) => item.list !== this.currentWatch);
    this.lists = this.lists.filter((list) => list.id !== this.currentWatch);
    this.currentWatch = null;
  }

  get remainingCount() {
    return this.todos.filter((todo) => !todo.completed).length;
  }
}

export default TodoStoreImpl;
