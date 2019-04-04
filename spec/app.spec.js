process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
    describe('/users', () => {
      it('get request responds with status 200 and an array', () => {
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
      it('get request responds with status 200 and an array', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then((res) => {
            expect(res.body.topics).to.be.an('array');
            expect(res.body.topics[0]).to.contain.keys('slug', 'description');
          });
      });
    });
    describe.only('/articles', () => {
      it('get request responds with status 200 and an array of article data', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then((res) => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0]).to.contain.keys('article_id', 'body');
          });
      });
      it('get request responds with status 200 and an article data object', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then((res) => {
            expect(res.body.article).to.contain.keys(
              'article_id',
              'body',
              'topic',
              'author'
            );
          });
      });
    });
    describe('/comments', () => {
      it('get request responds with status 200 and an array of comment data', () => {
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
