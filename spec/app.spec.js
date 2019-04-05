process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-sorted'));

const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe.only('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
    describe('/users/:username', () => {
      it('get request responds with status 200 and a user data object', () => {
        return request(app)
          .get('/api/users/butter_bridge')
          .expect(200)
          .then((res) => {
            expect(res.body.user).to.be.an('object');
            expect(res.body.user).to.contain.keys(
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
    describe('/articles', () => {
      it('get request responds with status 200 and an array of article data', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then((res) => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0]).to.contain.keys('article_id', 'body');
          });
      });
      it('get request responds with status 200 and an array of article data matching author query', () => {
        return request(app)
          .get('/api/articles?author=rogersop')
          .expect(200)
          .then((res) => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0].author).to.equal('rogersop');
            expect(res.body.articles[1].author).to.equal('rogersop');
            expect(res.body.articles[2].author).to.equal('rogersop');
          });
      });
      it('get request responds with status 200 and an array of article data matching topic query', () => {
        return request(app)
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then((res) => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0].topic).to.equal('mitch');
            expect(res.body.articles[1].topic).to.equal('mitch');
            expect(res.body.articles[2].topic).to.equal('mitch');
          });
      });
      it('get request responds with status 200 and an array of article data in descending order of date', () => {
        return request(app)
          .get('/api/articles?order=asc')
          .expect(200)
          .then((res) => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles).to.be.ascendingBy('created_at');
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
      it('get request responds with status 200 and an array of comments related to specified article ID', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then((res) => {
            expect(res.body.comments).to.be.an('array');
            expect(res.body.comments[0]).to.contain.keys(
              'body',
              'comment_id',
              'created_at',
              'article_id',
              'votes',
              'author'
            );
          });
      });
      it('post request responds with status 201 and the comment data object that has been posted', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ body: 'this is the comment body', author: 'butter_bridge' })
          .expect(201)
          .then((res) => {
            expect(res.body.comment).to.contain.keys(
              'body',
              'comment_id',
              'created_at',
              'article_id',
              'votes',
              'author'
            );
            expect(res.body.comment.body).to.equal('this is the comment body');
            expect(res.body.comment.author).to.equal('butter_bridge');
          });
      });
      it('patch request to upvote article by ID responds with status 200 and patched article', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 13 })
          .expect(200)
          .then((res) => {
            expect(res.body.article.votes).to.equal(113);
          });
      });
    });
    it('delete request responds with status 204 and no content', () => {
      return request(app)
        .delete('/api/articles/1')
        .expect(204);
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
    xdescribe('/comments', () => {
      it('get request responds with status 200 and an array', () => {
        return request(app)
          .get('/api/comments')
          .expect(200)
          .then((res) => {
            expect(res.body.topics).to.be.an('array');
            expect(res.body.topics[0]).to.contain.keys('slug', 'description');
          });
      });
    });
  });
});
