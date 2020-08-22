const request = require('supertest');
const assert = require('chai').assert;
const app = require('../server');

describe('Stories Endpost', () => {

  const story = {
    owner_id:"1",
    title:"Test 1",
    content:"Working",
    photo_url:"https://google.com"
  };
  
  
  it('should create a story', async() => {
    const res = await request(app)
      .post('/api/stories')
      .set('Accept', 'application/json')
      .send(story);

    assert.equal(res.statusCode, 200);
  });

});