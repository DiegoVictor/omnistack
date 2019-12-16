import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';
import factory from '../utils/factories';
import Developer from '../../src/app/models/Developer';
import { connect, emit, to } from '../../__mocks__/socket.io';

jest.mock('socket.io');

describe('Like', () => {
  beforeEach(async () => {
    await Developer.deleteMany();
  });

  it('should be able to like an user', async () => {
    const [user, like_user] = await factory.createMany('Developer', 2);
    const response = await request(app)
      .post(`/developers/${like_user._id}/like`)
      .set('user_id', user._id)
      .send();

    expect(response.body.likes).toContain(like_user._id.toString());
  });

  it('should not be able to like an user', async () => {
    const [user, like_user] = await factory.createMany('Developer', 2);
    await user.delete();

    const response = await request(app)
      .post(`/developers/${like_user._id}/like`)
      .set('user_id', user._id)
      .send();

    expect(response.body).toStrictEqual({
      error: 'Developer not exists!',
    });
  });

  it('should not be able to like an user that not exists', async () => {
    const [user, like_user] = await factory.createMany('Developer', 2);
    like_user.remove();

    const response = await request(app)
      .post(`/developers/${like_user._id}/like`)
      .set('user_id', user._id)
      .send();

    expect(response.body).toStrictEqual({
      error: 'Developer not exists!',
    });
  });

  it('should be able to emit a match to liking user', async () => {
    const user = await factory.create('Developer');
    const match_user = await factory.create('Developer', {
      likes: [user._id.toString()],
    });

    const user_socket_id = faker.random.number();
    const match_user_socket_id = faker.random.number();

    connect({
      id: user_socket_id,
      handshake: {
        query: {
          developer_id: user._id,
        },
      },
    });

    connect({
      id: match_user_socket_id,
      handshake: {
        query: {
          developer_id: match_user._id,
        },
      },
    });

    await request(app)
      .post(`/developers/${match_user._id}/like`)
      .set('user_id', user._id)
      .send();

    expect(to).toHaveBeenNthCalledWith(1, user_socket_id);
    expect(emit).toHaveBeenNthCalledWith(1, 'match', match_user.toObject());

    expect(to).toHaveBeenNthCalledWith(2, match_user_socket_id);
    expect(emit).toHaveBeenNthCalledWith(2, 'match', user.toObject());
  });
});