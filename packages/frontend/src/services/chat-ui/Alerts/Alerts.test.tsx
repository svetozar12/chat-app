import { mount, ReactWrapper } from 'enzyme';
import Alerts from 'services/chat-ui/Alerts';
import { AlertTitle, Alert, HStack } from '@chakra-ui/react';
import { IAlerts } from 'services/chat-ui';

const componentProps: IAlerts = {
  type: 'success',
  message: 'test message',
  closeAlert: () => console.log('test func'),
  style: { background: 'lime' },
  chakraProps: { h: '20%' },
};

const baseProps = {
  pos: 'absolute',
  w: '60%',
  transform: 'translate(50%,-600%)',
  top: '50%',
  right: '50%',
  h: '20%',
  background: 'lime',
};

const alertTypes: Array<'success' | 'info' | 'warning' | 'error'> = ['success', 'info', 'warning', 'error'];

const setupMount = () => {
  return mount(<Alerts {...componentProps} />);
};

describe(`testing correct behaviour of <Alerts />`, () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = setupMount();
  });
  alertTypes.forEach((type) => {
    const innerWrapper = mount(<Alerts {...{ ...componentProps, type }} />);
    it(`component <Alerts /> should have prop(status) with value ${type}`, () => {
      expect(innerWrapper.find(Alert).prop('status')).toBe(type);
    });
  });
  it('component <Alerts /> should render', () => {
    expect(wrapper.find(Alerts).length).toBe(1);
  });
  it(`component <Alerts /> should have prop(status) with value ${componentProps.type}`, () => {
    expect(wrapper.find(Alert).prop('status')).toBe(componentProps.type);
  });
  it(`component <Alerts /> should have text with value ${componentProps.message}`, () => {
    expect(wrapper.find(AlertTitle).text()).toBe('test message');
  });
  Object.entries(baseProps).forEach(([key, value]) => {
    it(`component <Alerts /> should have prop ${key}:${value}`, () => {
      expect(wrapper.find(HStack).prop(key)).toBe(value);
    });
  });
  it('component <Alerts /> should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
