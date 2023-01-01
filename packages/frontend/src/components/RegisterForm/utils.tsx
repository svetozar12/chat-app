import { IFields } from 'components/FormWrapper/FormWrapper';
import { Gender } from 'services/generated';

interface IValues {
  username: string;
  email: string;
  password: string;
  gender: Gender;
}

export const renderInputs = (color: string): IFields[] => [
  {
    props: {
      type: 'text',
      name: 'username',
      placeholder: 'username ...',
      boxShadow: `0px 0px 2px 0px ${color}`,
      _placeholder: { color, opacity: 0.5 },
    },
  },
  {
    props: {
      type: 'password',
      name: 'password',
      placeholder: 'password ...',
      boxShadow: `0px 0px 2px 0px ${color}`,
      _placeholder: { color, opacity: 0.5 },
    },
  },
  {
    props: {
      type: 'email',
      name: 'email',
      placeholder: 'email ...',
      boxShadow: `0px 0px 2px 0px ${color}`,
      _placeholder: { color, opacity: 0.5 },
    },
  },
  {
    props: { type: 'radio' },
    radioButtons: [
      {
        value: Gender.Male,
        props: { name: 'gender', id: Gender.Male },
      },
      { value: Gender.Female, props: { name: 'gender', id: Gender.Female } },
    ],
  },
];
