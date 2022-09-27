import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom/extend-expect';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// if react-dnd is used uncomment the mocks
// jest.mock('react-dnd', () => ({
//   useDrag: jest.fn().mockImplementation(() => [jest.fn(), jest.fn(), jest.fn()]),
//   useDrop: jest.fn().mockImplementation(() => [jest.fn(), jest.fn()]),
// }));
// jest.mock('react-dnd-html5-backend', () => ({}));

configure({ adapter: new Adapter() });
