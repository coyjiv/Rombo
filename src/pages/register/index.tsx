import { Formik, Form, Field, ErrorMessage } from "formik";
type Props = {};

const RegistrationPage = (props: Props) => {
  return (
    <div>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={(values) => {
          // Функция, которая будет вызвана при отправке формы
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="fieldName">Поле:</label>
              <Field type="text" id="fieldName" name="fieldName" />
              <ErrorMessage name="fieldName" component="div" />
            </div>
            <button type="submit">Отправить</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegistrationPage;
