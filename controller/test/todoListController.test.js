var controller = require('../todoListController');
var dbUtil = require('../../todoDao/dbUtil');

jest.mock('../../todoDao/dbUtil');

describe('todoListController', () => {
  it('should add task to DB', () => {
    dbUtil.pushToDb.mockResolvedValue(true);
    const data = controller.addTodo({ taskName: 'name',
taskStatus: 'Active' });

    expect(data.taskAdded).toBeTruthy();
  });
});
