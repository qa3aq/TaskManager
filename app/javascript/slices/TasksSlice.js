import { propEq } from 'ramda';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { changeColumn } from '@asseinfo/react-kanban';
import TaskForm from 'forms/TaskForm';
import TasksRepository from 'repositories/TasksRepository';
import { STATES } from 'presenters/TaskPresenter';

const initialState = {
  board: {
    columns: STATES.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: items,
        meta,
      });

      return state;
    },

    loadColumnMoreSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: column.cards.concat(items),
        meta,
      });

      return state;
    },
  },
});

const { loadColumnSuccess, loadColumnMoreSuccess } = tasksSlice.actions;

export default tasksSlice.reducer;

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const loadColumn = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: state }));
    });
  };

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnMoreSuccess({ ...data, columnId: state }));
    });
  };

  const loadBoard = () => STATES.map(({ key }) => loadColumn(key));

  const createTask = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return TasksRepository.create(attributes).then(() => {
      loadColumn('new_task');
    });
  };

  const updateTask = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(task.id, attributes).then(() => {
      loadColumn(task.state);
    });
  };

  const loadTask = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  const destroyTask = (task) => {
    TasksRepository.destroy(task.id).then(() => {
      loadColumn(task.state);
    });
  };

  return {
    loadBoard,
    loadColumn,
    loadColumnMore,
    createTask,
    loadTask,
    updateTask,
    destroyTask,
  };
};
