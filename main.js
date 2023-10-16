"use strict";

// VARIABLES
const lockScreen = document.querySelector(".lock-screen");
const homePage = document.querySelector(".home-page");

// Lock screen
const usernameInputField = document.getElementById("username");
const passwordInputField = document.getElementById("password");
const loginButton = document.querySelector(".btn-login");

const nameInputField = document.getElementById("name");
const createPasswordInputField = document.getElementById("create-password");
const confirmPasswordInputField = document.getElementById("confirm-password");
const signUpButton = document.querySelector(".btn-signup");

const signUpButtonText = document.getElementById("signup-btn-txt");

const errorContainerLogin = document.getElementById("error-login");
const errorMessageLogin = document.getElementById("error-message-login");

const errorContainerSignup = document.getElementById("error-signup");
const errorMessageSignup = document.getElementById("error-message-signup");

const loginContainer = document.querySelector(".login-container");
const signupContainer = document.querySelector(".signup-container");

const signUpFromLoginBtn = document.querySelector(".signup-btn");
const loginFromSignUpBtn = document.querySelector(".login-btn");

// Home page
const userName = document.getElementById("user-name");
const statusOfDay = document.getElementById("status-of-day");
const infoOfDay = document.getElementById("info-of-day");
const balance = document.querySelector(".balance");
const movementsContainerParent = document.querySelector(
  ".movements-container-parent"
);
const movementsContainer = document.querySelector(".movements");

const transferToInput = document.getElementById("transfer-to");
const transferAmmountInput = document.getElementById("transfer-ammount");
const btnTransfer = document.querySelector(".btn-transfer");

const errorContainerTransfer = document.getElementById("error-transfer");
const errorMessageTransfer = document.getElementById("error-message-transfer");

const loanAmmountInput = document.getElementById("loan-ammount");
const btnLoan = document.querySelector(".btn-request");

const errorContainerLoan = document.getElementById("error-request");
const errorMessageLoan = document.getElementById("error-message-request");

const incomes = document.getElementById("bal-in");
const outcomes = document.getElementById("bal-out");
const interest = document.getElementById("bal-int");

const btnSort = document.querySelector(".sort");

const btnLogout = document.querySelector(".btn-logout");

const interestRate = 1.2;

let currentUser;

let movementByDate = [];

let sortClicks = 0;
let movementsAndDates = [];

let isActive = false;

// DATA
const user1 = {
  fullName: "Eula Paul",

  password: "11111",

  movements: [
    [8248, -7902, 13664, 697, 7103, -4430, 476, 6932, -14789, -10474],
    [
      "26/04/2023",
      "03/06/2023",
      "26/06/2023",
      "04/08/2023",
      "10/08/2023",
      "18/08/2023",
      "02/09/2023",
      "05/09/2023",
      "06/10/2023",
      "07/10/2023",
    ],
  ],

  movementsWithDate() {
    return this.movements[0].map((mov, i) => [mov, this.movements[1][i]]);
  },

  username() {
    return this.fullName
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  },

  balance() {
    return this.movements
      .flat(2)
      .filter(mov => typeof mov === "number")
      .reduce((acc, mov) => acc + mov, 0);
  },
};

const user2 = {
  fullName: "Derrick Doyle",

  password: "22222",

  movements: [
    [3119, 4064, -3692, 4725, -1061, -8723, -1933, 10467, 12507, -2091],
    [
      "07/02/2023",
      "07/05/2023",
      "09/06/2023",
      "12/06/2023",
      "06/07/2023",
      "26/07/2023",
      "14/08/2023",
      "16/08/2023",
      "30/09/2023",
      "04/10/2023",
    ],
  ],

  movementsWithDate() {
    return this.movements[0].map((mov, i) => [mov, this.movements[1][i]]);
  },

  username() {
    return this.fullName
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  },

  balance() {
    return this.movements
      .flat(2)
      .filter(mov => typeof mov === "number")
      .reduce((acc, mov) => acc + mov, 0);
  },
};

const user3 = {
  fullName: "Franklin Huff",

  password: "33333",

  movements: [
    [-6532, 8413, 13186, -13312, 4084, 4992, 5887, -4493, 4528, -8322],
    [
      "28/01/2023",
      "03/02/2023",
      "20/04/2023",
      "19/04/2023",
      "29/05/2023",
      "09/06/2023",
      "01/07/2023",
      "24/08/2023",
      "11/09/2023",
    ],
  ],

  movementsWithDate() {
    return this.movements[0].map((mov, i) => [mov, this.movements[1][i]]);
  },

  username() {
    return this.fullName
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  },

  balance() {
    return this.movements
      .flat(2)
      .filter(mov => typeof mov === "number")
      .reduce((acc, mov) => acc + mov, 0);
  },
};

const user4 = {
  fullName: "Ray Paul",

  password: "44444",

  movements: [
    [-7723, -3362, -6667, -304, -12785, -4487, 1107, -6409, 3960, 2855],
    [
      "08/04/2023",
      "09/04/2023",
      "18/04/2023",
      "19/05/2023",
      "06/06/2023",
      "21/07/2023",
      "22/07/2023",
      "06/09/2023",
      "16/12/2023",
      "27/12/2023",
    ],
  ],

  movementsWithDate() {
    return this.movements[0].map((mov, i) => [mov, this.movements[1][i]]);
  },

  username() {
    return this.fullName
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  },

  balance() {
    return this.movements
      .flat(2)
      .filter(mov => typeof mov === "number")
      .reduce((acc, mov) => acc + mov, 0);
  },
};

const users = [user1, user2, user3, user4];

// FUNCTIONS

// ! INPUT VALIDATION

// (Letters only)
usernameInputField.addEventListener("input", e => {
  const value = e.target.value;

  if (!value.match(/^[a-zA-Z]+$/)) {
    e.target.value = e.target.value.slice(0, -1);
  }
});

// (Letters & spaces only)
nameInputField.addEventListener("input", e => {
  const value = e.target.value;

  if (!value.match(/^[a-zA-Z\s]+$/)) {
    e.target.value = e.target.value.slice(0, -1);
  }
});

// Reset movements
const resetMovements = movements => {
  movementByDate = movements.filter(mov => typeof mov === "number").slice();

  movementByDate = movementByDate.map((mov, i) => {
    return [mov, movements.filter(mov => typeof mov !== "number")[i]];
  });
};

//Display UI
const displayUI = () => {
  if (!isActive) {
    lockScreen.classList.add("hidden");
    homePage.classList.remove("hidden");
  } else {
    lockScreen.classList.remove("hidden");
    homePage.classList.add("hidden");
  }

  userName.textContent = currentUser.fullName.split(" ")[0];

  const date = new Date();
  const hour = date.getHours();

  if (hour >= 6 && hour < 12) {
    statusOfDay.textContent = "morning";
  } else if (hour >= 12 && hour < 18) {
    statusOfDay.textContent = "afternoon";
  } else {
    statusOfDay.textContent = "evening";
  }

  infoOfDay.textContent =
    new Intl.DateTimeFormat("en-GB").format(date) +
    ", " +
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

  calcDisplayBalance(currentUser.movementsWithDate());

  displayMovements(currentUser.movementsWithDate());

  displayIncomesOutcomesInterest(currentUser.movementsWithDate());
};

// Calculate and display balance
const calcDisplayBalance = movements => {
  const balanceAmmount = movements
    .flat(2)
    .filter(mov => typeof mov === "number")
    .reduce((acc, mov) => acc + mov, 0);
  balance.textContent = new Intl.NumberFormat("EUR", {
    style: "currency",
    currency: "EUR",
  }).format(balanceAmmount);
};

// Display movements
const displayMovements = movements => {
  movementsContainer.innerHTML = "";

  const dates = movements.flat(2).filter(mov => typeof mov !== "number");

  if (movements.flat().every(mov => typeof mov !== "number")) {
    const html = `
      <div class="no-movement grid">
        <h3>No<br />movements</h3>
      </div>
    `;

    movementsContainerParent.style.gridTemplateRows = "auto";
    movementsContainerParent.style.placeItems = "center";

    movementsContainer.insertAdjacentHTML("afterbegin", html);

    document
      .querySelector(".transfer-details")
      .classList.add("cursorNotAllowed");

    transferToInput.classList.add("pointerEventsNone");
    transferAmmountInput.classList.add("pointerEventsNone");
    btnTransfer.classList.add("pointerEventsNone");

    document.querySelector(".request-info").classList.add("cursorNotAllowed");
  } else {
    movementsContainerParent.style.placeItems = "normal";
    movementsContainer.style.gridTemplateRows = "max-content";

    transferToInput.classList.remove("pointerEventsNone");
    transferAmmountInput.classList.remove("pointerEventsNone");
    btnTransfer.classList.remove("pointerEventsNone");

    movements
      .flat(2)
      .filter(mov => typeof mov === "number")
      .forEach((movement, i) => {
        const type = movement > 0 ? "deposit" : "withdrawal";
        const date = dates[i];
        const ammount = movement;

        const formattedAmmount = new Intl.NumberFormat("EUR", {
          style: "currency",
          currency: "EUR",
        }).format(ammount);

        const html = `
    <div class="movement flex">
      <div class="movement-info flex">
        <p class="movement-type" id="${type}">${
          type.slice(0, 1).toUpperCase() + type.slice(1)
        }</p>
        <p class="movement-date">${date}</p>
      </div>
      <p class="movement-ammount">${formattedAmmount}</p>
      

    </div>
    `;

        movementsContainer.insertAdjacentHTML("afterbegin", html);

        movement > 0
          ? document.querySelector(".movement").classList.add("deposit")
          : document.querySelector(".movement").classList.add("withdrawal");
      });
  }
};

// Display transfer
const displayTransfer = (balance, receiver, ammount) => {
  const personalBalance = balance;
  const transferTo = receiver.value;
  const transferAmmount = Number(ammount.value);

  const receiverUser = users.find(user => user.username() === transferTo);
  const receiverMovements = receiverUser?.movements;

  if (
    transferAmmount <= personalBalance &&
    transferAmmount > 0 &&
    users.find(user => user.username() === transferTo) &&
    transferTo !== currentUser.username()
  ) {
    // Reset error messages
    errorContainerTransfer.classList.add("noOpacity");
    errorContainerTransfer.classList.add("pointerEventsNone");
    errorMessageTransfer.textContent = "";

    transferToInput.value = "";
    transferAmmountInput.value = "";

    currentUser.movements[0].push(-transferAmmount);

    currentUser.movements[1].push(
      new Intl.DateTimeFormat("en-GB").format(new Date())
    );

    receiverMovements[0].push(Number(transferAmmount));

    receiverMovements[1].push(
      new Intl.DateTimeFormat("en-GB").format(new Date())
    );

    resetMovements(currentUser.movementsWithDate());

    calcDisplayBalance(currentUser.movementsWithDate());
    displayMovements(currentUser.movementsWithDate());
    displayIncomesOutcomesInterest(currentUser.movementsWithDate());
  } else if (
    transferAmmount > 0 &&
    users.find(user => user.username() === transferTo) &&
    transferAmmount > personalBalance
  ) {
    errorContainerTransfer.classList.remove("noOpacity");
    errorContainerTransfer.classList.remove("pointerEventsNone");

    errorMessageTransfer.textContent = "Insufficient funds";
  } else if (
    users.find(user => user.username() === transferTo) &&
    transferAmmount <= personalBalance &&
    transferAmmount <= 0
  ) {
    errorContainerTransfer.classList.remove("noOpacity");
    errorContainerTransfer.classList.remove("pointerEventsNone");

    errorMessageTransfer.textContent = "Please enter a valid ammount";
  } else if (
    transferAmmount <= personalBalance &&
    transferAmmount > 0 &&
    !users.find(user => user.username() === transferTo)
  ) {
    errorContainerTransfer.classList.remove("noOpacity");
    errorContainerTransfer.classList.remove("pointerEventsNone");

    errorMessageTransfer.textContent = "Receiver doesn't exist";
  } else {
    errorContainerTransfer.classList.remove("noOpacity");
    errorContainerTransfer.classList.remove("pointerEventsNone");

    errorMessageTransfer.textContent = "You can't transfer to yourself";
  }
  transferToInput.value = "";
  transferToInput.blur();
  transferAmmountInput.value = "";
  transferAmmountInput.blur();
};

// Display loan
const displayLoan = loanAmmount => {
  const ammount = Number(loanAmmount.value);

  if (ammount > 0) {
    // Reset error messages
    errorContainerLoan.classList.add("noOpacity");
    errorContainerLoan.classList.add("pointerEventsNone");
    errorMessageLoan.textContent = "";

    loanAmmountInput.value = "";
    loanAmmountInput.blur();

    currentUser.movements[0].push(ammount);

    currentUser.movements[1].push(
      new Intl.DateTimeFormat("en-GB").format(new Date())
    );

    resetMovements(currentUser.movementsWithDate());

    calcDisplayBalance(currentUser.movementsWithDate());
    displayMovements(currentUser.movementsWithDate());
    displayIncomesOutcomesInterest(currentUser.movementsWithDate());
  } else {
    errorContainerLoan.classList.remove("noOpacity");
    errorContainerLoan.classList.remove("pointerEventsNone");

    errorMessageLoan.textContent = "Please enter a valid ammount";

    loanAmmountInput.value = "";
    loanAmmountInput.blur();
  }
};

// Display incomes, outcomes and interest
const displayIncomesOutcomesInterest = movements => {
  const incomesAmmount = movements
    .flat(2)
    .filter(mov => typeof mov === "number")
    .filter(mov => mov >= 0)
    .reduce((acc, mov) => acc + mov, 0);

  const outcomesAmmount = movements
    .flat(2)
    .filter(mov => typeof mov === "number")
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interestAmmount = movements
    .flat(2)
    .filter(mov => typeof mov === "number")
    .filter(mov => mov > 100) // Interests are only applied to deposits of more than 100€
    .map(deposit => (deposit * interestRate) / 100)
    .filter(int => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  incomes.textContent = new Intl.NumberFormat("EUR", {
    style: "currency",
    currency: "EUR",
  })
    .format(incomesAmmount)
    .slice(0, -1);

  outcomes.textContent = new Intl.NumberFormat("EUR", {
    style: "currency",
    currency: "EUR",
  })
    .format(outcomesAmmount)
    .slice(0, -1);

  interest.textContent = new Intl.NumberFormat("EUR", {
    style: "currency",
    currency: "EUR",
  })
    .format(interestAmmount)
    .slice(0, -1);
};

// EVENT LISTENERS

// Password input validation (type number)
passwordInputField.addEventListener("input", e => {
  const value = e.target.value;

  if (!value.match(/^[0-9]+$/)) {
    e.target.value = e.target.value.slice(0, -1);
  }
});

// Login
loginButton.addEventListener("click", e => {
  e.preventDefault();

  const username = usernameInputField.value;
  const password = passwordInputField.value;

  if (
    users.find(user => user.username() === username) &&
    users.find(user => user.username() === username).password === password &&
    password.length === 5
  ) {
    currentUser = users.find(user => user.username() === username);

    isActive = false;

    displayUI();

    isActive = true;

    // Removing state classes
    loginContainer.classList.remove("moveToRightAnimationEntry");

    loginContainer.classList.add("moveToLeftAnimationLeave");
    setTimeout(() => {
      loginContainer.classList.add("hidden");
    }, 600);

    // Removing state classes
    signupContainer.classList.remove("moveToRightAnimationLeave");

    signupContainer.classList.remove("hidden");
    signupContainer.classList.add("moveToLeftAnimationEntry");

    // Removing focus state from input fields
    usernameInputField.value = "";
    passwordInputField.value = "";
    usernameInputField.blur();
    passwordInputField.blur();

    // Reset error messages
    errorContainerLogin.classList.add("noOpacity");
    errorContainerLogin.classList.add("pointerEventsNone");
    errorMessageLogin.textContent = "";
  } else if (
    users.find(user => user.username() === username) &&
    users.find(user => user.username() === username).password !== password &&
    password.length === 5
  ) {
    errorContainerLogin.classList.remove("noOpacity");
    errorContainerLogin.classList.remove("pointerEventsNone");

    errorMessageLogin.textContent = "Wrong password";

    usernameInputField.value = "";
    passwordInputField.value = "";
    usernameInputField.blur();
    passwordInputField.blur();
  } else if (password.length !== 5) {
    errorContainerLogin.classList.remove("noOpacity");
    errorContainerLogin.classList.remove("pointerEventsNone");

    errorMessageLogin.textContent = "Password must be 5 characters long";

    usernameInputField.value = "";
    passwordInputField.value = "";
    usernameInputField.blur();
    passwordInputField.blur();
  } else {
    errorContainerLogin.classList.remove("noOpacity");
    errorContainerLogin.classList.remove("pointerEventsNone");

    errorMessageLogin.textContent = "Username doesn't exist";

    usernameInputField.value = "";
    passwordInputField.value = "";
    usernameInputField.blur();
    passwordInputField.blur();
  }
});

// Sign up from login
signUpFromLoginBtn.addEventListener("click", e => {
  e.preventDefault();

  // Removing state classes
  loginContainer.classList.remove("moveToRightAnimationEntry");

  loginContainer.classList.add("moveToLeftAnimationLeave");
  setTimeout(() => {
    loginContainer.classList.add("hidden");
  }, 300);

  // Removing state classes
  signupContainer.classList.remove("moveToRightAnimationLeave");

  signupContainer.classList.remove("hidden");
  signupContainer.classList.add("moveToLeftAnimationEntry");

  // Removing focus state from input fields
  usernameInputField.value = "";
  passwordInputField.value = "";
  usernameInputField.blur();
  passwordInputField.blur();

  // Reset error messages
  errorContainerLogin.classList.add("noOpacity");
  errorContainerLogin.classList.add("pointerEventsNone");

  errorMessageLogin.textContent = "";
});

// Password input validation (type number)
createPasswordInputField.addEventListener("input", e => {
  const value = e.target.value;

  if (!value.match(/^[0-9]+$/)) {
    e.target.value = e.target.value.slice(0, -1);
  }
});

confirmPasswordInputField.addEventListener("input", e => {
  const value = e.target.value;

  if (!value.match(/^[0-9]+$/)) {
    e.target.value = e.target.value.slice(0, -1);
  }
});

// Sign up & create new user profile
signUpButton.addEventListener("click", e => {
  e.preventDefault();

  const name = nameInputField.value.trim();
  const password = createPasswordInputField.value;
  const confirmPassword = confirmPasswordInputField.value;

  const fullName = [];

  if (name.includes(" ")) {
    name.split(" ").forEach(name => {
      fullName.push(name.slice(0, 1).toUpperCase() + name.slice(1));
    });
  } else {
    fullName.push(name.slice(0, 1).toUpperCase() + name.slice(1));
  }

  const newUser = {
    fullName: fullName.filter(name => name !== "").join(" "),

    password: password === confirmPassword ? password : null,

    movements: [[], []],

    movementsWithDate() {
      return this.movements[0].map((mov, i) => [mov, this.movements[1][i]]);
    },

    username() {
      return this.fullName
        .toLowerCase()
        .split(" ")
        .map(name => name[0])
        .join("");
    },

    balance() {
      return this.movements
        .flat(2)
        .filter(mov => typeof mov === "number")
        .reduce((acc, mov) => acc + mov, 0);
    },
  };

  if (fullName.length < 2) {
    errorContainerSignup.classList.remove("noOpacity");
    errorContainerSignup.classList.remove("pointerEventsNone");

    errorMessageSignup.textContent = "Please enter your full name";

    nameInputField.value = "";
    createPasswordInputField.value = "";
    confirmPasswordInputField.value = "";
    nameInputField.blur();
    createPasswordInputField.blur();
    confirmPasswordInputField.blur();
    return;
  } else if (name === "" || password === "" || confirmPassword === "") {
    errorContainerSignup.classList.remove("noOpacity");
    errorContainerSignup.classList.remove("pointerEventsNone");

    errorMessageSignup.textContent = "Please fill out all the fields";

    nameInputField.value = "";
    createPasswordInputField.value = "";
    confirmPasswordInputField.value = "";
    nameInputField.blur();
    createPasswordInputField.blur();
    confirmPasswordInputField.blur();
    return;
  } else if (users.find(user => user.username() === newUser.username())) {
    errorContainerSignup.classList.remove("noOpacity");
    errorContainerSignup.classList.remove("pointerEventsNone");

    errorMessageSignup.textContent = "Username already exists";

    nameInputField.value = "";
    createPasswordInputField.value = "";
    confirmPasswordInputField.value = "";
    nameInputField.blur();
    createPasswordInputField.blur();
    confirmPasswordInputField.blur();
    return;
  } else if (newUser.password !== null && password.length === 5) {
    users.push(newUser);

    // Reset error messages
    errorContainerSignup.classList.add("noOpacity");
    errorContainerSignup.classList.add("pointerEventsNone");
    errorMessageSignup.textContent = "";

    nameInputField.value = "";
    createPasswordInputField.value = "";
    confirmPasswordInputField.value = "";

    signUpButtonText.classList.add("noOpacity");

    signUpButton.style.setProperty("--boxAfterOpacity", "0");

    const checkIcon = document.querySelector(".check-icon");
    checkIcon.classList.remove("hidden");
    checkIcon.classList.add("appearAnimation");

    setTimeout(() => {
      checkIcon.classList.remove("appearAnimation");
      checkIcon.classList.add("disappearAnimation");

      signUpButtonText.classList.remove("noOpacity");

      signUpButtonText.classList.add("appearAnimation");

      signUpButtonText.textContent = `Your username: ${newUser.username()}`;

      setTimeout(() => {
        checkIcon.classList.remove("disappearAnimation");
        checkIcon.classList.add("hidden");
      }, 1200);
    }, 1500);
  } else {
    errorContainerSignup.classList.remove("noOpacity");
    errorContainerSignup.classList.remove("pointerEventsNone");

    errorMessageSignup.textContent = "Passwords don't match";

    nameInputField.value = "";
    createPasswordInputField.value = "";
    confirmPasswordInputField.value = "";
    nameInputField.blur();
    createPasswordInputField.blur();
    confirmPasswordInputField.blur();
  }

  signUpButton.addEventListener("click", () => {
    navigator.clipboard.writeText(newUser.username());

    signUpButtonText.textContent = "Copied to clipboard";

    errorContainerSignup.classList.add("noOpacity");
    errorContainerSignup.classList.add("pointerEventsNone");

    errorMessageSignup.textContent = "";

    setTimeout(() => {
      signUpButtonText.textContent = "Redirecting...";

      setTimeout(() => {
        // Removing state classes
        signupContainer.classList.remove("moveToLeftAnimationEntry");

        signupContainer.classList.add("moveToRightAnimationLeave");
        setTimeout(() => {
          signupContainer.classList.add("hidden");
        }, 300);

        // Removing state classes
        loginContainer.classList.remove("moveToLeftAnimationLeave");

        loginContainer.classList.remove("hidden");
        loginContainer.classList.add("moveToRightAnimationEntry");

        // Removing focus state from input fields
        nameInputField.value = "";
        createPasswordInputField.value = "";
        confirmPasswordInputField.value = "";
        nameInputField.blur();
        createPasswordInputField.blur();
        confirmPasswordInputField.blur();

        // Reset button text content
        signUpButtonText.textContent = "Sign up";

        // Reset button background
        signUpButton.style.setProperty("--boxAfterOpacity", "1");
      }, 1800);
    }, 1500);
  });
});

// Log in from sign up
loginFromSignUpBtn.addEventListener("click", e => {
  e.preventDefault();

  // Removing state classes
  signupContainer.classList.remove("moveToLeftAnimationEntry");

  signupContainer.classList.add("moveToRightAnimationLeave");
  setTimeout(() => {
    signupContainer.classList.add("hidden");
  }, 300);

  // Removing state classes
  loginContainer.classList.remove("moveToLeftAnimationLeave");

  loginContainer.classList.remove("hidden");
  loginContainer.classList.add("moveToRightAnimationEntry");

  // Removing focus state from input fields
  nameInputField.value = "";
  createPasswordInputField.value = "";
  confirmPasswordInputField.value = "";
  nameInputField.blur();
  createPasswordInputField.blur();
  confirmPasswordInputField.blur();

  // Reset error messages
  errorContainerSignup.classList.add("noOpacity");
  errorContainerSignup.classList.add("pointerEventsNone");

  errorMessageSignup.textContent = "";
});

// Transfer input validation (type string)
transferToInput.addEventListener("input", e => {
  const value = e.target.value;

  if (!value.match(/^[a-zA-Z]+$/)) {
    e.target.value = e.target.value.slice(0, -1);
  }
});

// Transfer money
btnTransfer.addEventListener("click", e => {
  e.preventDefault();

  displayTransfer(currentUser.balance(), transferToInput, transferAmmountInput);
});

// Request loan
btnLoan.addEventListener("click", e => {
  e.preventDefault();

  displayLoan(loanAmmountInput);
});

// Handling enter keypress
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    if (
      document.activeElement === transferAmmountInput ||
      document.activeElement === transferToInput
    ) {
      displayTransfer(
        currentUser.balance(),
        transferToInput,
        transferAmmountInput
      );
      transferToInput.blur();
      transferAmmountInput.blur();
    } else if (document.activeElement === loanAmmountInput) {
      displayLoan(loanAmmountInput);
      loanAmmountInput.blur();
    } else if (
      document.activeElement === usernameInputField ||
      document.activeElement === passwordInputField
    ) {
      loginButton.click();

      usernameInputField.value = "";
      usernameInputField.blur();

      passwordInputField.value = "";
      passwordInputField.blur();
    } else if (
      document.activeElement === nameInputField ||
      document.activeElement === createPasswordInputField ||
      document.activeElement === confirmPasswordInputField
    ) {
      signUpButton.click();

      nameInputField.value = "";
      nameInputField.blur();

      createPasswordInputField.value = "";
      createPasswordInputField.blur();

      confirmPasswordInputField.value = "";
      confirmPasswordInputField.blur();
    }
  }
});

// Sort
btnSort.addEventListener("click", e => {
  e.preventDefault();

  sortClicks++;

  for (const [i, el] of currentUser
    .movementsWithDate()
    .flat(1)
    .filter(mov => typeof mov === "number")
    .entries()) {
    const arr = new Array(
      el,
      currentUser
        .movementsWithDate()
        .flat(1)
        .filter(mov => typeof mov !== "number")[i]
    );

    movementsAndDates.push(arr);
  }

  if (sortClicks === 1) {
    // Sorting by highest to lowest

    movementsAndDates.sort((a, b) => a[0] - b[0]);

    movementsAndDates.forEach(mov => {
      movementByDate.push(mov);
    });

    displayMovements(movementByDate);

    movementsAndDates = [];
    movementByDate = [];
  } else if (sortClicks === 2) {
    // Sorting by lowest to highest

    movementsAndDates.sort((a, b) => b[0] - a[0]);

    movementsAndDates.forEach(mov => {
      movementByDate.push(mov);
    });

    displayMovements(movementByDate);

    movementsAndDates = [];
    movementByDate = [];
  } else if (sortClicks === 3) {
    // Resetting movements sorting (by date)

    displayMovements(currentUser.movementsWithDate());

    sortClicks = 0;

    movementsAndDates = [];
    movementByDate = [];

    resetMovements(currentUser.movementsWithDate());

    for (const [i, el] of currentUser
      .movementsWithDate()
      .flat(1)
      .filter(mov => typeof mov === "number")
      .entries()) {
      const arr = new Array(
        el,
        currentUser
          .movementsWithDate()
          .flat(1)
          .filter(mov => typeof mov !== "number")[i]
      );

      movementsAndDates.push(arr);
    }

    movementsAndDates.forEach(mov => {
      movementByDate.push(mov);
    });

    displayMovements(movementByDate);

    movementsAndDates = [];
    movementByDate = [];
  }
});

// Logout
btnLogout.addEventListener("click", e => {
  e.preventDefault();

  isActive = true;

  displayUI();

  isActive = false;

  sortClicks = 0;

  currentUser = undefined;

  // Reset input fields
  transferToInput.value = "";
  transferAmmountInput.value = "";
  loanAmmountInput.value = "";

  // Reset no movements state
  document
    .querySelector(".transfer-details")
    .classList.remove("cursorNotAllowed");

  transferToInput.classList.remove("pointerEventsNone");
  transferAmmountInput.classList.remove("pointerEventsNone");
  btnTransfer.classList.remove("pointerEventsNone");

  document.querySelector(".request-info").classList.remove("cursorNotAllowed");

  loanAmmountInput.classList.remove("pointerEventsNone");
  btnLoan.classList.remove("pointerEventsNone");

  // Removing state classes
  loginContainer.classList.remove("moveToLeftAnimationLeave");
  loginContainer.classList.remove("hidden");

  // Removing state classes
  signupContainer.classList.remove("moveToLeftAnimationEntry");
  signupContainer.classList.add("moveToRightAnimationLeave");
  signupContainer.classList.add("hidden");
});

// FIXME: fixare il contenuto degli errori in base alle media queries
