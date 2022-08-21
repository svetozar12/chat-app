import { Box, Heading, ScaleFade } from '@chakra-ui/react';
import { mount, ReactWrapper } from 'enzyme';
import RadioCard from 'services/chat-ui/RadioCards/RadioCards';
const componentProps = {
  closeRadioCard: () => console.log('test func'),
  heading: 'RadioCard Heading',
  children: <h1>test text</h1>,
  style: { background: 'lime' },
  chakraProps: { h: '20%' },
};

const baseProps = {
  background: 'lime',
  h: '20%',
};

const setupMount = () => {
  return mount(<RadioCard {...componentProps} />);
};

describe('testing correct behaviour of <RadioCard />', () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = setupMount();
  });
  it('component <RadioCard /> should render', () => {
    expect(wrapper.find(RadioCard).length).toBe(1);
  });
  Object.entries(baseProps).forEach(([key, value]) => {
    it(`component <RadioCard /> should have prop ${key}:${value}`, () => {
      expect(wrapper.find(RadioCard).children().prop(key)).toBe(value);
    });
  });
  it('component <RadioCard /> should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
