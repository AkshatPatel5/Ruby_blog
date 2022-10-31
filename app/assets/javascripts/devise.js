document.addEventListener('DOMContentLoaded', () => {
  if (document.URL == 'http://localhost:3000/users/sign_up') {
    const signup = document.getElementById('new_user');
    const email_pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
        signup_validations();
        if (only_alphabet_pattern.test(signup.user_first_name.value)) {
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
      signup_validations();
      if (only_alphabet_pattern.test(signup.user_last_name.value)) {
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
      signup_validations();
      if (email_pattern.test(signup.user_email.value)) {
        if (
          document.getElementById('user_email').parentElement
            .childElementCount > 3
        )
          document.getElementById('user_email').parentElement.removeChild(p3);
      }
    });

    const signup_validations = () => {
      let i = 0;
      if (
        !(
          only_alphabet_pattern.test(signup.user_first_name.value) &&
          signup.user_first_name.value.length != 0
        )
      ) {
        p.innerHTML = 'First name contains only alphabets';
        document.getElementById('user_first_name').parentElement.prepend(p);
        i++;
      }
      if (
        !(
          only_alphabet_pattern.test(signup.user_last_name.value) &&
          signup.user_last_name.value.length != 0
        )
      ) {
        p2.innerHTML = 'Last name contains only alphabets';
        document.getElementById('user_last_name').parentElement.prepend(p2);
        i++;
      }
      if (!email_pattern.test(signup.user_email.value)) {
        p3.innerHTML = 'Email is in wrong format';
        document.getElementById('user_email').parentElement.prepend(p3);
        i++;
      }
      if (i > 0) {
        document.getElementsByClassName(
          'actions',
        )[0].children[0].disabled = true;
      } else {
        document.getElementsByClassName(
          'actions',
        )[0].children[0].disabled = false;
      }
    };
  }
});
