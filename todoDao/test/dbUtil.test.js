var dbUtil = require('../dbUtil');
var { db } = require('../db');

describe('dbUtil', () => {

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

  beforeAll(() => {
    db.defaults = jest.fn().mockReturnValue({ write: () => jest.fn() });
  });

  it('should get all Tasks from DB', () => {

    db.get = jest.fn().mockReturnValue({ value: () => mockedTasks });
    const data = dbUtil.getAllTodos();

    expect(data).toBe(mockedTasks);
  });

  it('should get filtered Tasks from DB', () => {
    const value = { value: () => mockedTasks };

    db.get = jest.fn().mockReturnValue({ filter: () => value });
    const data = dbUtil.getFilteredTodo('active', 'user1');

    expect(data).toBe(mockedTasks);
  });

  it('should getAllTodos from DB if task status is ALL', () => {
    dbUtil.getAllTodos = jest.fn();
    dbUtil.getFilteredTodo('all', 'user1');

      // eslint-disable-next-line no-magic-numbers
    expect(dbUtil.getAllTodos).toHaveBeenCalledTimes(1);
  });

  // it('should update Task\'s status in DB', () => {
  //   const value = { value: () => mockedTasks[0] };

  //   db.get = jest.fn().mockReturnValue({ find: () => value });

  //   const todoTask = {
  //     id: '1',
  //     taskName: 'taskName',
  //     taskStatus: 'status',
  //     user: 'user1'
  //   }

  //   const data = dbUtil.updateTodoStatus(todoTask);

  //   expect(data).toBe(mockedTasks);
  // });
});
