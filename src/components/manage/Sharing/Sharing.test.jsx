import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import Sharing from './Sharing';

const mockStore = configureStore();

describe('Sharing', () => {
  it('renders a sharing component', () => {
    const store = mockStore({
      userSession: {
        token: jwt.sign({ sub: 'john-doe' }, 'secret'),
      },
      sharing: {
        data: {
          entries: [
            {
              id: 'john-doe',
              disabled: false,
              login: 'john-doe',
              roles: {
                Contributer: true,
              },
              title: 'John Doe',
              type: 'user',
            },
          ],
          inherit: true,
          available_roles: ['Contributer'],
        },
        edit: {
          loading: false,
          loaded: true,
        },
      },
      content: {
        data: {
          title: 'Blog',
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Sharing location={{ pathname: '/blog' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
