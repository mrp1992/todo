var controller = require('../todoListController');
var dbUtil = require('../../todoDao/dbUtil');
var jest = require('jest');

jest.mock('../../todoDao/dbUtil');

describe('todoListController', () => {
  it('should add task to DB', () => {
    dbUtil.pushToDb.mockResolvedValue(true);
    var data = controller.addTodo({taskName: "name", taskStatus: "Active"});
    expect(data.taskAdded).toBeTruthy();
  });

});
