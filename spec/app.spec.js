process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe.only('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
    describe('/users', () => {
      it('get requests responds with status 200 and an array', () => {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then((res) => {
            expect(res.body.users).to.be.an('array');
            expect(res.body.users[0]).to.contain.keys(
              'name',
              'username',
              'avatar_url'
            );
          });
      });
    });
    describe('/topics', () => {
      it('get requests responds with status 200 and an array', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then((res) => {
            expect(res.body.topics).to.be.an('array');
            expect(res.body.topics[0]).to.contain.keys('slug', 'description');
          });
      });
    });
    describe('/articles', () => {
      it('get requests responds with status 200 and an array', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then((res) => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0]).to.contain.keys('article_id', 'body');
          });
      });
      it.only('get requests responds with status 200 and an object', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then((res) => {
            expect(res.body.articles).to.contain.keys('article_id', 'body');
          });
      });
    });
    describe('/comments', () => {
      it('get requests responds with status 200 and an array', () => {
        return request(app)
          .get('/api/comments')
          .expect(200)
          .then((res) => {
            expect(res.body.comments).to.be.an('array');
            expect(res.body.comments[0]).to.contain.keys('article_id', 'body');
          });
      });
    });
  });
});
