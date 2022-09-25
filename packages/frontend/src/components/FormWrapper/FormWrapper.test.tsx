import { Flex, Heading, VStack } from '@chakra-ui/react';
import { mount, ReactWrapper } from 'enzyme';
import FormWrapper, { IFormWrapper } from 'services/chat-ui/FormWrapper/FormWrapper';

const componentProps: IFormWrapper = {
  children: <input />,
  type: 'Register',
  handleSubmit: () => 'test func',
  chakraProps: { color: 'red' },
  style: { paddingBlock: '0.5rem' },
};

const baseProps = {
  h: '100vh',
  flexDir: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  pos: 'relative',
  zIndex: '101',
  color: 'red',
  paddingBlock: '0.5rem',
};

const FormTypes: Array<'Register' | 'Login'> = ['Register', 'Login'];

const setupMount = () => {
  return mount(<FormWrapper {...componentProps} />);
};

describe('', () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = setupMount();
  });
  it('component <FormWrapper /> should render', () => {
    expect(wrapper.find(FormWrapper).length).toBe(1);
  });
  it('component <FormWrapper /> children should render', () => {
    expect(wrapper.find(VStack).children().length).toBe(1);
  });
  FormTypes.forEach((type) => {
    const innerWrapper = mount(<FormWrapper {...{ ...componentProps, type }} />);
    it(`component <FormWrapper /> heading value should be ${type}`, () => {
      expect(innerWrapper.find(Heading).text()).toBe(type);
    });
  });
  Object.entries(baseProps).forEach(([key, value]) => {
    it(`component <FormWrapper /> should have prop ${key}:${value}`, () => {
      expect(wrapper.find(Flex).prop(key)).toBe(value);
    });
  });
  it('component <FormWrapper /> should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
