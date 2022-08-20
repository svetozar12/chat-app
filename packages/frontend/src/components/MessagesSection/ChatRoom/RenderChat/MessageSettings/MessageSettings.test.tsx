import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import MessageSettings from './MessageSettings';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
const store = mockStore({});
const mockFunc: any = jest.fn();

const setupRender = () => {
  const component = render(
    <Provider store={store}>
      <MessageSettings id="3123123123" translateX="250px" setEditing={mockFunc} setSettings={mockFunc} />
    </Provider>,
  );
  return component;
};

describe('Render connected React-redux page', () => {
  beforeEach(() => {
    setupRender();
  });
  it('should create snapshot for <MessageSettings/>', () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <MessageSettings id="3123123123" translateX="250px" setEditing={mockFunc} setSettings={mockFunc} />
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it('should render <MessageSettings/>', () => {
    const renderedComponent = screen.getByTitle('message_settings');
    expect(renderedComponent).toBeInTheDocument();
  });
});
