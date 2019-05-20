process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-sorted'));

const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe('/', () => {
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
            expect(res.body.user.username).to.equal('butter_bridge');
            expect(res.body.user.name).to.equal('jonny');
            expect(res.body.user).to.contain.keys(
              'name',
              'username',
              'avatar_url'
            );
          });
      });
      it('get request responds with status 200 and a user data object', () => {
        return request(app)
          .get('/api/users/rogersop')
          .expect(200)
          .then((res) => {
            expect(res.body.user).to.be.an('object');
            expect(res.body.user.username).to.equal('rogersop');
            expect(res.body.user.name).to.equal('paul');
            expect(res.body.user).to.contain.keys(
              'name',
              'username',
              'avatar_url'
            );
          });
      });
      it('get request responds with status 200 and a user data object', () => {
        return request(app)
          .get('/api/users/icellusedkars')
          .expect(200)
          .then((res) => {
            expect(res.body.user).to.be.an('object');
            expect(res.body.user.username).to.equal('icellusedkars');
            expect(res.body.user.name).to.equal('sam');
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
      it('get request responds with status 200 and an array of article data in ascending order of date', () => {
        return request(app)
          .get('/api/articles?order=asc')
          .expect(200)
          .then((res) => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles).to.be.ascendingBy('created_at');
          });
      });
      it('get request responds with status 200 and an array of article data in descending order of author', () => {
        return request(app)
          .get('/api/articles?sort_by=author')
          .expect(200)
          .then((res) => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles).to.be.descendingBy('author');
            expect(res.body.articles[0].author).to.equal('rogersop');
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
              'author',
              'comment_count',
              'votes',
              'created_at',
              'title'
            );
            expect(res.body.article.article_id).to.equal(1);
            expect(res.body.article.body).to.be.a('string');
            expect(res.body.article.comment_count).to.equal('13');
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
            expect(res.body.comments).to.be.descendingBy('created_at');
          });
      });
      it('get request responds with status 200 and an array of comments related to specified article ID in ascending order of created_at', () => {
        return request(app)
          .get('/api/articles/1/comments?order=ascending')
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
            expect(res.body.comments).to.be.ascendingBy('created_at');
          });
      });
      it('get request responds with status 200 and an array of comments related to specified article ID in ascending order of created_at', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=comment_id')
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
            expect(res.body.comments).to.be.descendingBy('comment_id');
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
      it('patch request to upvote article by ID, responds with status 200 and patched article', () => {
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
    describe('/comments/:comment_id', () => {
      it('patch request to upvote comment by ID, responds with status 200 and patched comment', () => {
        return request(app)
          .patch('/api/comments/2')
          .send({ inc_votes: 7 })
          .expect(200)
          .then((res) => {
            expect(res.body.comment).to.contain.keys(
              'article_id',
              'body',
              'created_at',
              'votes',
              'comment_id',
              'author'
            );
            expect(res.body.comment.body).to.be.an('string');
            expect(res.body.comment.votes).to.equal(21);
            expect(res.body.comment.comment_id).to.equal(2);
          });
      });
      it('delete request responds with status 204 and no content', () => {
        return request(app)
          .delete('/api/comments/1')
          .expect(204);
      });
    });
  });
});

describe('error handling', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
    describe('', () => {
      it('patch request responds with status 405 and a method not allowed error', () => {
        return request(app)
          .patch('/api/topics/')
          .send({ something: 'something' })
          .expect(405)
          .then((res) => {
            expect(res.body.msg).to.equal('Method Not Allowed');
          });
      });
      it('get request for non-existant route responds with status 404 and a route not found error', () => {
        return request(app)
          .get('/api/articles/1000')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal('Article Not Found');
          });
      });
      it('get request for non-existant route responds with status 404 and a route not found error', () => {
        return request(app)
          .get('/api/articles/1000/comments')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal('Article Not Found');
          });
      });
      it('delete request for non-existant route responds with status 404 and a route not found error', () => {
        return request(app)
          .delete('/api/articles/1000')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal('Article Not Found');
          });
      });
      it('get request for articles by non-existant author responds with status 404 and an error', () => {
        return request(app)
          .get('/api/articles?author=not-an-author')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal('Not Found');
          });
      });
      it('get request for articles sorted by non-existant column responds with status 400 and a bad request error', () => {
        return request(app)
          .get('/api/articles?sort_by=not-a-column')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('Bad Request');
          });
      });
      it('get request for with non-integer parameter responds with status 400 and a bad request error', () => {
        return request(app)
          .get('/api/articles/dog')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('Bad Request');
          });
      });
      it('patch request responds with status 405 and a bad request error', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ author: 'Bort' })
          .expect(405)
          .then((res) => {
            expect(res.body.msg).to.equal('Method Not Allowed');
          });
      });
    });
    it('post request from invalid user responds with status 404 and error message', () => {
      return request(app)
        .post('/api/articles/1/comments')
        .send({
          body: 'this is the comment body',
          author: 'not-an-author'
        })
        .expect(404);
    });
    describe('405 - Method Not Allowed', () => {
      it('patch request responds with status 405 and a method not allowed error message.', () => {
        return request(app)
          .patch('/api/topics')
          .send({
            slug: 'mySlug'
          })
          .expect(405)
          .then((res) => {
            expect(res.body.msg).to.equal('Method Not Allowed');
          });
      });
      it('patch request responds with status 405 and a method not allowed error message.', () => {
        return request(app)
          .patch('/api/users/butter_bridge')
          .send({
            username: 'butter_bean'
          })
          .expect(405)
          .then((res) => {
            expect(res.body.msg).to.equal('Method Not Allowed');
          });
      });
      it('get request responds with status 405 and a method not allowed error message.', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({
            author: 'butter_bean',
            title: 'i made this!'
          })
          .expect(405)
          .then((res) => {
            expect(res.body.msg).to.equal('Method Not Allowed');
          });
      });
      it.only('get request responds with status 404 and a not found error message.', () => {
        return request(app)
          .get('/api/users/butter_bean')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal('User Not Found');
          });
      });
    });
  });
});

describe('', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it('get request responds with status 200 and an array of article data sorted by votes', () => {
    return request(app)
      .get('/api/articles/?sort_by=votes')
      .expect(200)
      .then((res) => {
        expect(res.body.articles).to.be.an('array');
        expect(res.body.articles[0]).to.contain.keys('article_id', 'body');
      });
  });
  it('get request responds with status 200 and an array of article data sorted by comment count', () => {
    return request(app)
      .get('/api/articles/?sort_by=comment_count')
      .expect(200)
      .then((res) => {
        expect(res.body.articles).to.be.an('array');
        expect(res.body.articles[0]).to.contain.keys('article_id', 'body');
      });
  });
});
