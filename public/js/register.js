const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});



const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", 
  "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", 
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", 
  "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", 
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
  "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", 
  "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", 
  "Mozambique", "Myanmar ", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", 
  "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", 
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", 
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", 
  "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
  "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];


countries.sort();


const selectElement = document.getElementById('nationality');


countries.forEach(country => {
  const option = document.createElement('option');
  option.value = country;
  option.textContent = country;
  selectElement.appendChild(option);
});

function printError(elemId, hintMsg) {
  document.getElementById(elemId).innerHTML = hintMsg;
}

const form = document.getElementById('form1');
const namee = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password')
const country = document.getElementById('nationality');
const gender = document.getElementById('gender');
const birthday = document.getElementById('birthday');

// form1.addEventListener('submit', e => {
//     validateForm();
// });


  function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

async function checkUsernameExists(username) {
    const response = await fetch('/check-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });
    const data = await response.json();
    return data.exists;
}


//email real-time  validation 
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function checkEmailExists(email) {
    const response = await fetch('/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    const data = await response.json();
    return data.exists;
}


function validatePassword(password) {
  const minLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return minLength && hasUpperCase && hasSpecialChar;
}

function validateGender() {
    const genderInputs = document.querySelectorAll('input[name="sex"]');
    for (const input of genderInputs) {
        if (input.checked) {
            return true;
        }
    }
    return false;
}

function validateDateOfBirth(birthday) {
    const date = new Date(birthday);
    return !isNaN(date.getTime());
}

function validateNationality(nationality) {
    return nationality !== "";
}

document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const genderInputs = document.querySelectorAll('input[name="sex"]');
    const birthdayInput = document.getElementById("birthday");
    const nationalityInput = document.getElementById("nationality");

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("e");
    const passwordError = document.getElementById("p");
    const genderError = document.getElementById("genderErr");
    const birthdayError = document.getElementById("b");
    const nationalityError = document.getElementById("n");

    usernameInput.addEventListener("input", async function() {
        if (validateUsername(usernameInput.value)) {
            const exists = await checkUsernameExists(usernameInput.value);
            if (exists) {
                usernameError.textContent = "Username already exists";
            } else {
                usernameError.textContent = "";
            }
        } else {
            usernameError.textContent = "Invalid username format";
        }
    });

    emailInput.addEventListener("input", async function() {
        if (validateEmail(emailInput.value)) {
            const exists = await checkEmailExists(emailInput.value);
            if (exists) {
                emailError.textContent = "Email already in use";
            } else {
                emailError.textContent = "";
            }
        } else {
            emailError.textContent = "Invalid email format";
        }
    });

    passwordInput.addEventListener("input", function() {
        if (validatePassword(passwordInput.value)) {
            passwordError.style.visibility = "hidden";
        } else {
            passwordError.style.visibility = "visible";
            passwordError.textContent = "Password must be at least 6 characters, have a special charcter (@#$%^&!*), and at least one CAPITAL letter ";
        }
    });

    genderInputs.forEach(input => {
        input.addEventListener("change", function() {
            if (validateGender()) {
                genderError.style.display = "none";
            } else {
                genderError.style.display = "block";
                genderError.textContent = "Please select a gender";
            }
        });
    });

    birthdayInput.addEventListener("change", function() {
        if (validateDateOfBirth(birthdayInput.value)) {
            birthdayError.style.display = "none";
        } else {
            birthdayError.style.display = "block";
            birthdayError.textContent = "Invalid date of birth";
        }
    });

    nationalityInput.addEventListener("change", function() {
        if (validateNationality(nationalityInput.value)) {
            nationalityError.style.visibility = "hidden";
        } else {
            nationalityError.style.visibility = "visible";
            nationalityError.textContent = "Please select a nationality";
        }
    });
});
//client side date validation

//10 years old to 65 years old
document.addEventListener('DOMContentLoaded', function() {
  const birthdayInput = document.getElementById('birthday');
  if (birthdayInput) {
      const today = new Date();
      const maxDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
      const minDate = new Date(today.getFullYear() - 65, today.getMonth(), today.getDate());

      birthdayInput.max = maxDate.toISOString().split('T')[0];
      birthdayInput.min = minDate.toISOString().split('T')[0];
  }
});


//log in
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('form2');
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const errorLog = document.getElementById('errorlogIN');
  
    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const formData = new FormData(loginForm);
      const data = {
        username: formData.get('username'),
        password: formData.get('password')
      };
  
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const result = await response.json();
        if (response.status === 200) {
          window.location.href = result.redirectUrl;
        } else {
          errorLog.textContent = result.error;
          usernameInput.value = '';
          passwordInput.value = '';
        }
      } catch (error) {
        errorLog.textContent = 'An error occurred. Please try again.';
        console.error('Error:', error);
        usernameInput.value = '';
        passwordInput.value = '';
      }
    });
  });
  

//PHASE 1
// function validateForm() {
//     const nameValue = namee.value.trim();
//     const passValue = password.value.trim();
//     const emailValue = email.value.trim();
//     const countryValue = country.value.trim();

//     var gender = document.getElementById('gender').value

//     var smalln= document.getElementById('n');
//     var smalle= document.getElementById('e');
//     var smallp = document.getElementById('p');
//     var smallc = document.getElementById('c');
//     var smallb = document.getElementById('b');

//   var nameErr = true;
//   var emailErr = true;
//   var countryErr = true;
//   var genderErr = true; 
//   var passErr = true;
//   var birthErr = true;
  
//   if(nameValue == "") {
//       printError("n", "Please enter your name");
//       smalln.style.visibility = 'visible';
//   } else {
//       var regex1 = /^[a-zA-Z\s]+$/;                
//       if(regex1.test(nameValue) === false) {
//           printError("n", "Please enter a valid name");
//           smalln.style.visibility = 'visible';
//       } else {
//           printError("n", "");
//           nameErr = false;
//       }
//   }
  
//   // Validate email address
//   if(emailValue == "") {
//       printError("e", "Please enter your email address");
//       smalle.style.visibility = 'visible';
//   } else {
//       var regex = /^\S+@\S+\.\S+$/;
//       if(regex.test(emailValue) === false) {
//           printError("e", "Please enter a valid email address");
//           smalle.style.visibility = 'visible';
//       } else{
//           printError("e", "");
//           emailErr = false;
//       }
//   }
  
//   // Validate Password
//   if(passValue == "") {
//     printError("p", "Please enter a password");
//     smallp.style.visibility = 'visible';
// } else {
//   var regex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;                
//       if(regex2.test(passValue) === false) {
//           printError("p", "Your password should: Contain at least one lowercase letter. Contain at least one uppercase letter. Contain at least one digit. Contain at least one special character from the set @$!%*?&. Be at least 8 characters long.");
//           smallp.style.visibility = 'visible';
//       } else {
//         printError("p", "");
//         passErr = false;
//       }
    
//     }
//   }

  // //Validate gender
  // function checkSelection(){
  //   genderErr = document.getElementById("genderErr");
  //   if(document.querySelector('input[name="sex"]:checked') == null){
  //     genderErr.style.display = 'block';
  //     genderErr.textContent='Please choose your gender';
  //   }
  //   else{
  //     genderErr.style.display = 'none';
  //     genderErr = false;
  //   }
  // }

  