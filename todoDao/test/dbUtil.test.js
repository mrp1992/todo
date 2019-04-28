var dbUtil = require('../dbUtil');
var { db } = require('../db');

describe('dbUtil', () => {
  it('should get all Tasks from DB', () => {
    db.defaults = jest.fn().mockReturnValue({write: () => jest.fn()});
    db.get = jest.fn().mockReturnValue({value: () => 1});  
    const data = dbUtil.getAllTodo();
    expect(data).toBe(1);
  })
})
