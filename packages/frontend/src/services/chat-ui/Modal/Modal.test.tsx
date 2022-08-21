import { Heading, ScaleFade } from '@chakra-ui/react';
import { mount, ReactWrapper } from 'enzyme';
import Modal from 'services/chat-ui/Modal/Modal';

const componentProps = {
  closeModal: () => console.log('test func'),
  heading: 'Modal Heading',
  children: <h1>test text</h1>,
  style: { background: 'lime' },
  chakraProps: { h: '20%' },
};

const baseProps = {
  background: 'lime',
  h: '20%',
};

const setupMount = () => {
  return mount(<Modal {...componentProps} />);
};

describe('testing correct behaviour of <Modal />', () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = setupMount();
  });
  it('component <Modal /> should render', () => {
    expect(wrapper.find(Modal).length).toBe(1);
  });
  it(`component <Modal /> should have text with value test text`, () => {
    expect(wrapper.find('h1').text()).toBe('test text');
  });
  it(`component <Modal /> should have text with value ${componentProps.heading}`, () => {
    expect(wrapper.find(Heading).text()).toBe(componentProps.heading);
  });
  Object.entries(baseProps).forEach(([key, value]) => {
    it(`component <Alerts /> should have prop ${key}:${value}`, () => {
      expect(wrapper.find(ScaleFade).prop(key)).toBe(value);
    });
  });
  it('component <Modal /> should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
