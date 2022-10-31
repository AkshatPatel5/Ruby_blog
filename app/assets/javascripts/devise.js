const emailPattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const onlyAlphabetPattern = /^([^0-9]*)$/;
const passwordPattern =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('new_user');
  form.addEventListener('submit', (e) => {
    if (validateForm()) {
      return true;
    } else {
      e.preventDefault();
    }
  });

  const validateForm = () => {
    const errors = [];

    if (window.location.pathname != '/users/sign_in') {
      if (
        !(
          onlyAlphabetPattern.test(form.user_first_name.value) &&
          form.user_first_name.value.length != 0
        )
      ) {
        errors.push('First name contains only alphabets');
      }
      if (
        !(
          onlyAlphabetPattern.test(form.user_last_name.value) &&
          form.user_last_name.value.length != 0
        )
      ) {
        errors.push('Last name contains only alphabets');
      }
      if (form.user_password.value !== form.user_password_confirmation.value) {
        errors.push('Password must match');
      }
    }

    if (!emailPattern.test(form.user_email.value)) {
      errors.push('Email is in wrong format');
    }
    if (!passwordPattern.test(form.user_password.value)) {
      errors.push(
        "Password must contain a mix of uppercase, lowercase, numbers, and ! @ # $ % ^ & * ( ) _ + - = [ ] { } | ' and length should be minimum 8 characters",
      );
    }
    if (errors.length > 0) {
      try {
        let errors = document.getElementById('errors');
        if (errors !== null) {
          form.removeChild(errors);
        }
      } catch (error) {
        console.log(error);
      }
      let div = document.createElement('div');
      div.id = 'errors';
      for (let i = 0; i < errors.length; i++) {
        const p = document.createElement('p');
        p.innerHTML = i + 1 + '. ' + errors[i];
        div.appendChild(p);
      }
      form.prepend(div);
    } else {
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
