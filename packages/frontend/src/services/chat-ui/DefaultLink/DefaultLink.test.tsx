import { mount, ReactWrapper } from 'enzyme';
import DefaultLink from 'services/chat-ui/DefaultLink/DefaultLink';
import Link from 'next/link';
import { Link as ArchorLink } from '@chakra-ui/react';

const componentProps = { text: 'HomePage', href: 'http://go_to_home_page' };
const baseProps = { textAlign: 'center', w: 'full', color: 'blue.500', fontWeight: 'bold', href: '#' };
const setupMount = () => {
  return mount(<DefaultLink {...componentProps} />);
};

describe(`testing correct behaviour of <DefaultLink />`, () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = setupMount();
  });
  it('component <DefaultLink /> should render', () => {
    expect(wrapper.find(DefaultLink).length).toBe(1);
  });
  it(`component <DefaultLink /> should have href with value ${componentProps.href}`, () => {
    expect(wrapper.find(Link).prop('href')).toBe(componentProps.href);
  });
  it(`component <DefaultLink /> should have text with value ${componentProps.text}`, () => {
    expect(wrapper.find(ArchorLink).text()).toBe(componentProps.text);
  });
  Object.entries(baseProps).forEach(([key, value]) => {
    it(`component <DefaultLink /> should have prop ${key}:${value}`, () => {
      expect(wrapper.find(ArchorLink).prop(key)).toBe(value);
    });
  });
  it('component <DefaultLink /> should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
