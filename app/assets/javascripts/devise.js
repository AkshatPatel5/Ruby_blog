const emailPattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const onlyAlphabetPattern = /^([^0-9]*)$/;
const passwordPattern =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('new_user');
  const firstName = document.querySelector('#user_first_name');
  const lastName = document.querySelector('#user_last_name');
  const email = document.querySelector('#user_email');
  const password = document.querySelector('#user_password');
  const passwordConfirmation = document.querySelector(
    '#user_password_confirmation',
  );
  const firstNameError = document.createElement('p');
  firstNameError.innerHTML = 'First name should be alphabetical only';
  const lastNameError = document.createElement('p');
  lastNameError.innerHTML = 'Last name should be alphabetical only';
  const emailError = document.createElement('p');
  emailError.innerHTML = 'Email should be in correct format';
  emailError.className = 'form-text';
  const passwordError = document.createElement('p');
  passwordError.className = 'form-text';
  passwordError.innerHTML =
    "Password must contain a mix of uppercase, lowercase, numbers, and ! @ # $ % ^ & * ( ) _ + - = [ ] { } | ' and length should be minimum 8 characters";
  const passwordConfirmationError = document.createElement('p');
  passwordConfirmationError.innerHTML = 'Password should match';

  form.addEventListener('submit', (e) => {
    if (validateForm()) {
      console.log('true');
      return true;
    } else {
      e.preventDefault();
    }
  });

  const validateForm = () => {
    let errors = 0;

    if (window.location.pathname != '/users/sign_in') {
      if (
        !(
          onlyAlphabetPattern.test(firstName.value) &&
          firstName.value.length != 0
        )
      ) {
        firstName.parentElement.appendChild(firstNameError);
        errors = 1;
      } else {
        if (firstName.parentElement.childElementCount > 3) {
          firstName.parentElement.removeChild(firstNameError);
        }
      }
      if (
        !(
          onlyAlphabetPattern.test(lastName.value) && lastName.value.length != 0
        )
      ) {
        lastName.parentElement.appendChild(lastNameError);
        errors = 1;
      } else {
        if (lastName.parentElement.childElementCount > 3) {
          lastName.parentElement.removeChild(lastNameError);
        }
      }
      if (password.value !== passwordConfirmation.value) {
        passwordConfirmation.parentElement.appendChild(
          passwordConfirmationError,
        );
        errors = 1;
      } else {
        if (passwordConfirmation.parentElement.childElementCount > 3) {
          passwordConfirmation.parentElement.removeChild(
            passwordConfirmationError,
          );
        }
      }
    }

    if (!emailPattern.test(email.value)) {
      email.parentElement.appendChild(emailError);
      errors = 1;
    } else {
      if (email.parentElement.childElementCount > 3) {
        email.parentElement.removeChild(emailError);
      }
    }
    if (!passwordPattern.test(password.value)) {
      password.parentElement.appendChild(passwordError);
      errors = 1;
    } else {
      if (password.parentElement.childElementCount > 4) {
        password.parentElement.removeChild(passwordError);
      }
    }
    if (errors == 0) {
      return true;
    }
  };
});

//***************************************on-key validations***********************************************8 */
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('new_user');
//   const firstName = document.querySelector('#user_first_name');
//   const lastName = document.querySelector('#user_last_name');
//   const email = document.querySelector('#user_email');
//   const password = document.querySelector('#user_password');
//   const passwordConfirmation = document.querySelector(
//     '#user_password_confirmation',
//   );
//   const firstNameError = document.createElement('p');
//   firstNameError.innerHTML = 'First name should be alphabetical only';
//   const lastNameError = document.createElement('p');
//   lastNameError.innerHTML = 'Last name should be alphabetical only';
//   const emailError = document.createElement('p');
//   emailError.innerHTML = 'Email should be in correct format';
//   const passwordError = document.createElement('p');
//   passwordError.innerHTML =
//     "Password must contain a mix of uppercase, lowercase, numbers, and ! @ # $ % ^ & * ( ) _ + - = [ ] { } | ' and length should be minimum 8 characters";
//   const passwordConfirmationError = document.createElement('p');
//   passwordConfirmationError.innerHTML = 'Password should match';

//   document.getElementsByClassName('actions')[0].children[0].disabled = true;
//   const valid = {
//     firstName: false,
//     lastName: false,
//     email: false,
//     password: false,
//     passwordConfirmation: false,
//   };

//   const validations = () => {
//     if (window.location.pathname == '/users/sign_in') {
//       console.log(valid);
//       if (valid.email == true && valid.password == true) {
//         document.getElementsByClassName(
//           'actions',
//         )[0].children[0].disabled = false;
//       } else {
//         document.getElementsByClassName(
//           'actions',
//         )[0].children[0].disabled = true;
//       }
//     } else {
//       if (
//         valid.firstName == true &&
//         valid.lastName == true &&
//         valid.email == true &&
//         valid.password == true &&
//         valid.passwordConfirmation == true
//       ) {
//         document.getElementsByClassName(
//           'actions',
//         )[0].children[0].disabled = false;
//       } else {
//         document.getElementsByClassName(
//           'actions',
//         )[0].children[0].disabled = true;
//       }
//     }
//   };
//   const only_alphabet = (field, error_id) => {
//     field.addEventListener('keyup', (e) => {
//       if (onlyAlphabetPattern.test(field.value) && field.value.length > 0) {
//         if (field == firstName) {
//           valid.firstName = true;
//         } else {
//           valid.lastName = true;
//         }
//         if (field.parentElement.childElementCount > 3)
//           field.parentElement.removeChild(error_id);
//       } else {
//         field.parentElement.appendChild(error_id);
//         if (field == firstName) {
//           valid.firstName = false;
//         } else {
//           valid.lastName = false;
//         }
//       }
//       validations();
//     });
//   };

//   if (
//     window.location.pathname == '/users/sign_up' ||
//     window.location.pathname == '/users'
//   ) {
//     document
//       .getElementById('new_user')
//       .prepend(
//         (document.createElement('p').innerHTML =
//           'All the fields are mandatory'),
//       );

//     only_alphabet(firstName, firstNameError);
//     only_alphabet(lastName, lastNameError);

//     passwordConfirmation.addEventListener('keyup', (e) => {
//       if (form.user_password.value === form.user_password_confirmation.value) {
//         valid.passwordConfirmation = true;
//         if (passwordConfirmation.parentElement.childElementCount > 3)
//           passwordConfirmation.parentElement.removeChild(
//             passwordConfirmationError,
//           );
//       } else {
//         passwordConfirmation.parentElement.appendChild(
//           passwordConfirmationError,
//         );
//         valid.passwordConfirmation = false;
//       }
//       validations();
//     });
//   }
//   email.addEventListener('keyup', (e) => {
//     if (emailPattern.test(email.value)) {
//       valid.email = true;
//       if (email.parentElement.childElementCount > 3)
//         email.parentElement.removeChild(emailError);
//     } else {
//       email.parentElement.appendChild(emailError);
//       valid.email = false;
//     }
//     validations();
//   });
//   password.addEventListener('keyup', (e) => {
//     if (passwordPattern.test(password.value)) {
//       valid.password = true;
//       if (password.parentElement.childElementCount > 4)
//         password.parentElement.removeChild(passwordError);
//     } else {
//       password.parentElement.appendChild(passwordError);
//       valid.password = false;
//     }
//     validations();
//   });
// });
