import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';
import { STATES } from 'presenters/TaskPresenter';

const useTasks = () => {
  const board = useSelector((state) => state.TasksSlice.board);
  const { loadColumn, loadColumnMore, createTask, loadTask, updateTask, destroyTask, dragEndCard } = useTasksActions();
  const loadBoard = () => Promise.all(STATES.map(({ key }) => loadColumn(key)));

  return {
    board,
    loadBoard,
    loadColumnMore,
    createTask,
    loadTask,
    updateTask,
    destroyTask,
    dragEndCard,
  };
};

export default useTasks;
