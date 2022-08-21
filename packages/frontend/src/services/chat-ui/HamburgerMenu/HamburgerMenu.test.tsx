import { Box } from '@chakra-ui/react';
import { mount, ReactWrapper } from 'enzyme';
import HamburgerMenu from 'services/chat-ui/HamburgerMenu/HamburgerMenu';

const componentProps = {
  toggleHamburger: jest.fn(),
  style: { background: 'lime' },
  chakraProps: { h: '20%' },
};

const baseProps = {
  background: 'lime',
  h: '20%',
};

const setupMount = () => {
  return mount(<HamburgerMenu {...componentProps} />);
};

describe('testing correct behaviour of <HamburgerMenu />', () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = setupMount();
  });
  it('component <HamburgerMenu /> should render', () => {
    expect(wrapper.find(HamburgerMenu).length).toBe(1);
  });
  Object.entries(baseProps).forEach(([key, value]) => {
    it(`component <HamburgerMenu /> should have prop ${key}:${value}`, () => {
      expect(wrapper.find(Box).prop(key)).toBe(value);
    });
  });
  it('component <HamburgerMenu /> should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
