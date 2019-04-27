var dbUtil = require('../../todoDao/dbUtil');
var jest = require('jest');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('../dataStore/test/db.json');
const db = jest.fn;

jest.mock(db);

describe('dbUtil', () => {
  it('should get all Tasks from DB', () => {
    db.get('posts').thenReturn
    let data = dbUtil.getAllTodo();
    expect(data.length).toBe(1);
  })
})
