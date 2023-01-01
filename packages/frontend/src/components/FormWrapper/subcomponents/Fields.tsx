import { Checkbox, Flex, HStack, Input, Radio, VStack } from '@chakra-ui/react';
import { IFields } from 'components/FormWrapper/FormWrapper';
import { FC } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

const Fields: FC<{ fields: IFields[]; register: UseFormRegister<FieldValues> }> = ({ fields, register }) => {
  return (
    <>
      {fields.map(({ props, label, radioButtons }) => {
        switch (props?.type) {
          case 'checkbox':
            return (
              <>
                {label && <label>{label}</label>}
                <Checkbox key={props.name} {...register(props.name as string)} {...props} />
              </>
            );
          case 'radio':
            return (
              <Flex w="full" justifyContent="center">
                <HStack gap={10}>
                  {radioButtons?.map(({ value, props: radiosProps }) => (
                    <>
                      <label htmlFor={radiosProps?.id}>{radiosProps?.id}</label>
                      <input
                        type="radio"
                        id={radiosProps?.id}
                        value={value}
                        key={props.name}
                        {...register(radiosProps?.name as string)}
                        {...(radiosProps as any)}
                      />
                    </>
                  ))}
                </HStack>
              </Flex>
            );
          default:
            return (
              <>
                {label && <label>{label}</label>}
                <Input key={props?.name} {...register(props?.name as string)} {...props} />
              </>
            );
        }
      })}
    </>
  );
};

export default Fields;
