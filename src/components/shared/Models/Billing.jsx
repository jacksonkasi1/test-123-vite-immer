import React, { useEffect } from 'react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react';

// ** import ui components
import Button from '@ui/Buttons';
import Input from '@ui/Input';
import FormItem from '@ui/FormItem';
import Tooltip from '@ui/Tooltip';
import Checkbox from '@ui/Checkbox';

// ** import third party library
import { Field, Form, Formik } from 'formik';
import NumberFormat from 'react-number-format';
import * as Yup from 'yup';
import { HiCreditCard, HiCalendar, HiInformationCircle } from 'react-icons/hi';

export default function EditCard({ openModal }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (openModal !== null) {
      onOpen();
    }
  }, [openModal]);

  const CreditCardInput = (props) => {
    return (
      <Input
        {...props}
        suffix={
          <HiCreditCard className="text-lg text-text_light dark:text-text_dark absolute" />
        }
      />
    );
  };

  const CardExpiryInput = (props) => {
    return (
      <Input
        {...props}
        suffix={
          <HiCalendar className="text-lg text-text_light dark:text-text_dark" />
        }
      />
    );
  };

  const CvvInput = (props) => {
    return (
      <Input
        {...props}
        suffix={
          <Tooltip title="The CVV/CVC code is located on the back of your credit/debit card on the right side of the white signature strip">
            <HiInformationCircle className="cursor-pointer text-lg text-text_light dark:text-text_dark" />
          </Tooltip>
        }
      />
    );
  };

  const NumberFormatInput = ({ onValueChange, ...rest }) => {
    return (
      <NumberFormat
        customInput={Input}
        type="text"
        onValueChange={onValueChange}
        autoComplete="off"
        {...rest}
      />
    );
  };

  const validationSchema = Yup.object().shape({
    cardHolderName: Yup.string().required('Card holder name required'),
    ccNumber: Yup.string()
      .required('Credit card number required')
      .matches(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
        'Invalid credit card number',
      ),
    cardExpiry: Yup.string()
      .required('Card holder name required')
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Invalid Date'),
    code: Yup.string()
      .required()
      .matches(/^[0-9]{3}$/, 'Invalid CVV'),
    primary: Yup.bool(),
  });

  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = '0' + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = '01';
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  function cardExpiryFormat(val) {
    let month = limit(val.substring(0, 2), '12');
    let date = limit(val.substring(2, 4), '31');

    return month + (date.length ? '/' + date : '');
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={'dark:!bg-mid_light_dark p-3'}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 !text-[21px] text-light_dark_ dark:text-white_">
                Edit Credit Card
              </ModalHeader>
              <ModalBody>
      
                <Formik
                  initialValues={{
                    cardHolderName: '',
                    ccNumber: '',
                    cardExpiry: '',
                    code: '',
                    primary: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                  }}
                >
                  {({ touched, errors }) => (
                    <Form>
                      <FormItem
                        label="Card holder name"
                        invalid={
                          errors.cardHolderName && touched.cardHolderName
                        }
                        errorMessage={errors.cardHolderName}
                      >
                        <Field
                          type="text"
                          autoComplete="off"
                          name="cardHolderName"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem
                        label="Credit Card Number"
                        invalid={errors.ccNumber && touched.ccNumber}
                        errorMessage={errors.ccNumber}
                      >
                        <Field name="ccNumber">
                          {({ field, form }) => {
                            return (
                              <NumberFormatInput
                                form={form}
                                field={field}
                                placeholder="•••• •••• •••• ••••"
                                customInput={CreditCardInput}
                                format="#### #### #### ####"
                                onValueChange={(e) => {
                                  form.setFieldValue(field.name, e.value);
                                }}
                                className="card-number-input"
                              />
                            );
                          }}
                        </Field>
                      </FormItem>
                      <div className="grid grid-cols-2 gap-4">
                        <FormItem
                          label="Expiration date"
                          invalid={errors.cardExpiry && touched.cardExpiry}
                          errorMessage={errors.cardExpiry}
                        >
                          <Field name="cardExpiry">
                            {({ field, form }) => {
                              return (
                                <NumberFormatInput
                                  form={form}
                                  field={field}
                                  placeholder="••/••"
                                  format={cardExpiryFormat}
                                  customInput={CardExpiryInput}
                                  defaultValue={form.values.cardExpiry}
                                  onValueChange={(e) => {
                                    form.setFieldValue(field.name, e.value);
                                  }}
                                  className="left-class"
                                />
                              );
                            }}
                          </Field>
                        </FormItem>
                        <FormItem
                          label="CVV"
                          invalid={errors.code && touched.code}
                          errorMessage={errors.code}
                        >
                          <Field name="code">
                            {({ field, form }) => {
                              return (
                                <NumberFormatInput
                                  form={form}
                                  field={field}
                                  placeholder="•••"
                                  customInput={CvvInput}
                                  format="###"
                                  onValueChange={(e) => {
                                    form.setFieldValue(field.name, e.value);
                                  }}
                                  className="left-class"
                                />
                              );
                            }}
                          </Field>
                        </FormItem>
                      </div>
                      <FormItem>
                        <Field
                          name="primary"
                          component={Checkbox}
                          children="Set this card as primary"
                          className="text-light_dark_ dark:text-text_dark gap-x-3"
                        />
                      </FormItem>
                      <FormItem className="mb-0 text-right">
                        <Button
                          onClick={onClose}
                          block
                          variant="solid"
                          type="submit"
                        >
                          Update
                        </Button>
                      </FormItem>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
