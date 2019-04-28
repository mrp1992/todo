var controller = require('../todoListController');
var dbUtil = require('../../todoDao/dbUtil');

jest.mock('../../todoDao/dbUtil');

describe('todoListController', () => {
  it('should add task to DB', () => {
    dbUtil.pushToDb = jest.fn().mockReturnValue(true);
    const data = controller.addTodo({ taskName: 'name',
taskStatus: 'Active' });

    expect(data.taskAdded).toBeTruthy();
  });

  it('should update Status of task in DB', () => {
    dbUtil.updateTodoStatus = jest.fn().mockReturnValue(false);
    const data = controller.updateStatus({ taskName: 'name',
taskStatus: 'Active' });

    expect(data.taskUpdated).toBeFalsy();
  });

  it('should fetch todo task by status from DB', () => {
    const mockedTasks = [
    {
      id: 1,
      taskName: 'taskName1',
      taskStatus: 'status1',
      user: 'user1'
    },
    {
      id: 2,
      taskName: 'taskName2',
      taskStatus: 'status2',
      user: 'user2'
    }
];

    dbUtil.getFilteredTodo = jest.fn().mockReturnValue(mockedTasks);
    const data = controller.fetchTodoTask('Active', 'user1');

    expect(data.length).toBe(mockedTasks.length);
  });

  it('should fetch empty tasklist by status from DB if no such task exists', () => {
    const mockedTasks = [];

    dbUtil.getFilteredTodo = jest.fn().mockReturnValue(mockedTasks);
    const data = controller.fetchTodoTask('Active', 'user1');

    expect(data.length).toBe(mockedTasks.length);
  });
});
