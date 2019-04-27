var dbUtil = require('../dbUtil');
var db = require('../db');

jest.mock('../db', () => jest.fn());

describe('dbUtil', () => {
  it('should get all Tasks from DB', () => {
    db.get = jest.fn().mockReturnValue({value: 1});  
    let data = dbUtil.getAllTodo();
    expect(data).toBe(1);
  })
})
