import { observable, computed, makeAutoObservable, action, toJS } from "mobx";
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
  showModal = false;

  constructor() {
    makeAutoObservable(this, {
      todos: observable,
      addTask: action,
      addList: action,
      setCurrentWatch: action,
      toggle: action,
      remove: action,
      toggleModal: action,
      clearCompleted: action,
      deleteList: action,
      currentWatchRemaining: computed,
      currentWatchName: computed,
      specialFnResult: computed,
      allRemainingCount: computed,
    });
  }

  addTask(listId, task) {
    this.todos.push({
      id: uuidv4(),
      task: task.trim(),
      completed: false,
      list: listId,
    });
  }

  addList(name) {
    const id = uuidv4();
    this.lists.push({
      id: id,
      name: name.trim(),
    });
    this.currentWatch = id;
  }

  setCurrentWatch(listId) {
    this.currentWatch = listId;
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

  toggleModal() {
    this.showModal = !this.showModal;
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

  get specialFnResult() {
    const todolists = toJS(this.todos).filter(
      (item) => item.list === this.currentWatch
    );

    if (todolists.every((item) => !isNaN(Number(item.task)))) {
      const sum = todolists.reduce((sum, item) => sum + Number(item.task), 0);
      return { message: "All item in todo is Number", result: sum };
    } else {
      const str = todolists.reduce((str, item) => str.concat(item.task), "");
      return { message: "Todos contains strings", result: str };
    }
  }

  get allRemainingCount() {
    return this.todos.filter((todo) => !todo.completed).length;
  }
}

export default TodoStoreImpl;
