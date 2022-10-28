document.addEventListener('DOMContentLoaded', () => {
  if (document.URL == 'http://localhost:3000/users/sign_up') {
    const signup = document.getElementById('new_user');
    const email_pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    const only_alphabet_pattern = /^([^0-9]*)$/;
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    document.getElementsByClassName('actions')[0].children[0].disabled = true;

    document
      .getElementById('new_user')
      .prepend(
        (document.createElement('p').innerHTML =
          'All the fields are mandatory'),
      );

    document
      .querySelector('#user_first_name')
      .addEventListener('keyup', (e) => {
        if (!only_alphabet_pattern.test(signup.user_first_name.value)) {
          p.innerHTML = 'First name contains only alphabets';
          document.getElementById('user_first_name').parentElement.prepend(p);
        } else {
          if (
            document.getElementById('user_first_name').parentElement
              .childElementCount > 3
          )
            document
              .getElementById('user_first_name')
              .parentElement.removeChild(p);
        }
      });

    document.querySelector('#user_last_name').addEventListener('keyup', (e) => {
      if (!only_alphabet_pattern.test(signup.user_last_name.value)) {
        p2.innerHTML = 'Last name contains only alphabets';
        document.getElementById('user_last_name').parentElement.prepend(p2);
      } else {
        if (
          document.getElementById('user_last_name').parentElement
            .childElementCount > 3
        )
          document
            .getElementById('user_last_name')
            .parentElement.removeChild(p2);
      }
    });

    document.querySelector('#user_email').addEventListener('keyup', (e) => {
      if (!email_pattern.test(signup.user_email.value)) {
        p3.innerHTML = 'Email is in wrong format';
        document.getElementById('user_email').parentElement.prepend(p3);
      } else {
        if (
          document.getElementById('user_email').parentElement
            .childElementCount > 3
        )
          document.getElementById('user_email').parentElement.removeChild(p3);
      }
    });

    document.getElementById('user_password_confirmation').onkeyup = () => {
      if (signup_validations()) {
        console.log('true');
        document.getElementsByClassName(
          'actions',
        )[0].children[0].disabled = false;
      } else {
        document.getElementsByClassName(
          'actions',
        )[0].children[0].disabled = true;
      }
    };

    const signup_validations = () => {
      console.log(signup.user_first_name.value);
      if (
        only_alphabet_pattern.test(signup.user_first_name.value) &&
        only_alphabet_pattern.test(signup.user_last_name.value) &&
        email_pattern.test(signup.user_email.value)
      ) {
        return true;
      } else {
        return false;
      }
    };
  }
});
