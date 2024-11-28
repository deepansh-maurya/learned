// Changing the style of scroll bar
// window.onscroll = function() {myFunction()};

// function myFunction() {
// 	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
// 	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
// 	var scrolled = (winScroll / height) * 100;
// 	document.getElementById("myBar").style.width = scrolled + "%";
// }

async function checkAuth() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("no token found");
    }

    const response = await fetch(`http://localhost:5000/api/auth/check`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log(data);

    if (data.user) {
      const getStarted = document.getElementById("login");
      console.log(getStarted);

      getStarted.style.visibility = "hidden";
      const logout = document.getElementById("logout");
      console.log(logout);

      logout.style.visibility = "visible";
    } else {
      const getStarted = document.getElementById("login");
      console.log(getStarted);

      getStarted.style.visibility = "visible";
      const logout = document.getElementById("logout");
      console.log(logout);

      logout.style.visibility = "hidden";
    }
  } catch (error) {
    console.log(error);

    const getStarted = document.getElementById("login");
    console.log(getStarted);

    getStarted.style.visibility = "visible";
    const logout = document.getElementById("logout");
    console.log(logout);

    logout.style.visibility = "hidden";
    console.error("Error during authentication check:", error);
    return {
      success: false,
      message: "An error occurred while checking authentication"
    };
  }
}

checkAuth();

function logoutFunc() {
  localStorage.removeItem("token");
  localStorage.removeItem("fullname");
  checkAuth();
  window.location.reload();
}

function scrollAppear() {
  var introText = document.querySelector(".side-text");
  var sideImage = document.querySelector(".sideImage");
  var introPosition = introText.getBoundingClientRect().top;
  var imagePosition = sideImage.getBoundingClientRect().top;

  var screenPosition = window.innerHeight / 1.2;

  if (introPosition < screenPosition) {
    introText.classList.add("side-text-appear");
  }
  if (imagePosition < screenPosition) {
    sideImage.classList.add("sideImage-appear");
  }
}

window.addEventListener("scroll", scrollAppear);

// For switching between navigation menus in mobile mode
var i = 2;
function switchTAB() {
  var x = document.getElementById("list-switch");
  if (i % 2 == 0) {
    document.getElementById("list-switch").style =
      "display: grid; height: 50vh; margin-left: 5%;";
    document.getElementById("search-switch").style =
      "display: block; margin-left: 5%;";
  } else {
    document.getElementById("list-switch").style = "display: none;";
    document.getElementById("search-switch").style = "display: none;";
  }
  i++;
}

// For LOGIN
var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
var a = document.getElementById("log");
var b = document.getElementById("reg");
var w = document.getElementById("other");

function register() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
  w.style.visibility = "hidden";
  b.style.color = "#fff";
  a.style.color = "#000";
}

function login() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0px";
  w.style.visibility = "visible";
  a.style.color = "#fff";
  b.style.color = "#000";
}

// CheckBox Function
function goFurther() {
  // if (document.getElementById("chkAgree").checked == true) {
  //   document.getElementById("btnSubmit").style =
  //     "background: linear-gradient(to right, #FA4B37, #DF2771);";
  // } else {
  //   document.getElementById("btnSubmit").style = "background: lightgray;";
  //   return;
  // }
}

function handleRegister() {
  const fullName = document
    .querySelector('input[placeholder="Full Name"]')
    .value.trim();
  const email = document
    .querySelector('input[placeholder="Email Address"]')
    .value.trim();
  const password = document
    .querySelector('input[placeholder="Create Password"]')
    .value.trim();
  const confirmPassword = document
    .querySelector('input[placeholder="Confirm Password"]')
    .value.trim();

  if (!fullName || !email || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }
  const signUpData = { fullName, email, password };

  fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(signUpData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Sign-up failed. Please try again.");
      }
      return response.json();
    })
    .then(data => {
      alert("Registration successful! Redirecting to the login page...");
      window.location.href = "login.html";
    })
    .catch(error => {
      alert(error.message);
    });
}

function handleLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Both fields are required!");
    return;
  }

  const loginData = { email, password };

  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(
          "Login failed. Please check your credentials and try again."
        );
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      alert("Login successful! Redirecting...");
      localStorage.setItem("token", data.token);
      localStorage.setItem("fullname", data.user.fullName);
      window.location.href = "index.html";
      checkAuth();
    })
    .catch(error => {
      alert(error.message);
    });
}

function google() {
  window.location.assign(
    "https://accounts.google.com/signin/v2/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue&csig=AF-SEnbZHbi77CbAiuHE%3A1585466693&flowName=GlifWebSignIn&flowEntry=AddSession",
    "_blank"
  );
}

// QUIZ Page
function quizt(frame) {
  document.getElementById("f1").style = "display: none;";
  document.getElementById("f2").style = "display: none;";
  document.getElementById("f3").style = "display: none;";
  document.getElementById("f4").style = "display: none;";
  document.getElementById("f5").style = "display: none;";
  document.getElementById("f6").style = "display: none;";
  document.getElementById("f7").style = "display: none;";
  document.getElementById("f8").style = "display: none;";
  document.getElementById("f9").style = "display: none;";
  document.getElementById("f10").style = "display: none;";
  document.getElementById("f11").style = "display: none;";
  if (frame == 1) document.getElementById("f1").style = "display: block";
  else if (frame == 2) document.getElementById("f2").style = "display: block";
  else if (frame == 3) document.getElementById("f3").style = "display: block";
  else if (frame == 4) document.getElementById("f4").style = "display: block";
  else if (frame == 5) document.getElementById("f5").style = "display: block";
  else if (frame == 6) document.getElementById("f6").style = "display: block";
  else if (frame == 7) document.getElementById("f7").style = "display: block";
  else if (frame == 8) document.getElementById("f8").style = "display: block";
  else if (frame == 9) document.getElementById("f9").style = "display: block";
  else if (frame == 10) document.getElementById("f10").style = "display: block";
  else if (frame == 11) document.getElementById("f11").style = "display: block";
  else alert("error");
}

function startquiz() {
  document.getElementById("title").style = "display: none;";

  document.getElementById("panel").style = "display: inline-flex;";
  document.getElementById("left").style = "display: block;";
  document.getElementById("right").style = "display: block;";
}
function searchdisplay() {
  document.getElementById("searchpanel").style.display = "block";
}

function display(n) {
  var img1 = document.getElementById("img1");
  var img2 = document.getElementById("img2");
  var img3 = document.getElementById("img3");
  var img4 = document.getElementById("img4");
  var s1 = document.getElementById("s1");
  var s2 = document.getElementById("s2");
  var s3 = document.getElementById("s3");
  var s4 = document.getElementById("s4");

  img1.style = "display: none;";
  img2.style = "display: none;";
  img3.style = "display: none;";
  img4.style = "display: none;";
  s1.style = "background: #DF2771; color: #FFF;";
  s2.style = "background: #DF2771; color: #FFF;";
  s3.style = "background: #DF2771; color: #FFF;";
  s4.style = "background: #DF2771; color: #FFF;";

  if (n == 1) {
    img1.style = "display: block;";
    s1.style = "background: #E5E8EF; color: #DF2771;";
  }
  if (n == 2) {
    img2.style = "display: block;";
    s2.style = "background: #E5E8EF; color: #DF2771;";
  }
  if (n == 3) {
    img3.style = "display: block;";
    s3.style = "background: #E5E8EF; color: #DF2771;";
  }
  if (n == 4) {
    img4.style = "display: block;";
    s4.style = "background: #E5E8EF; color: #DF2771;";
  }
}

function sideMenu(side) {
  var menu = document.getElementById("side-menu");
  if (side == 0) {
    menu.style = "transform: translateX(0vh); position:fixed;";
  } else {
    menu.style = "transform: translateX(-100%);";
  }
  side++;
}

{
  /* <script> */
}

//  community section code
// Base URL for API endpoints
const API_BASE_URL = "http://localhost:5000/api";

// DOM Elements
const questionForm = document.querySelector(".question-form textarea");
const questionSubmitButton = document.querySelector(".question-form button");
const questionsList = document.querySelector(".questions-list");

// Function to fetch and render questions with answers
async function fetchQuestions() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/answers/with-questions`,
      {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}` // Attach the token
        // }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data = await response.json();

    // Clear the questions list
    questionsList.innerHTML = "";

    // Render questions and answers
    data.forEach(question => {
      const questionItem = document.createElement("div");
      questionItem.classList.add("question-item");

      // Question
      const questionTitle = document.createElement("h3");
      questionTitle.textContent = `Ques: ${question.text}`;

      const questionWriter = document.createElement("p");
      questionWriter.style.fontSize = "13px";
      questionWriter.textContent = ` ${"@" + question.userDetails.fullName}`;
      questionItem.appendChild(questionTitle);
      questionItem.appendChild(questionWriter);

      // Answers
      const answersDiv = document.createElement("div");
      answersDiv.classList.add("answers");

      if (question.answers && question.answers.length > 0) {
        question.answers.forEach((answer, index) => {
          const answerParagraph = document.createElement("p");
          answerParagraph.classList.add("answer-paragraph");

          const randomId  = Math.random()

          // Add answer text with a strong label
          answerParagraph.innerHTML = `
            <span style="flex-grow: 1;position:relative">
              <p> <strong>Ans ${index + 1}:&nbsp;</strong> ${answer.text}</p>
              <p style="font-size:10px" >@${answer.answerUserDetails
                .fullName}</p>
              <p style="font-size:10px; color:red" id="message${randomId}"></p>
              </span>
          `;

          const likeDiv = document.createElement("div");
          likeDiv.classList.add("like-section");

          // Like button
          const likeButton = document.createElement("i");
          likeButton.setAttribute("messageid",`message${randomId}`)
          likeButton.className = "fa-solid fa-heart";
          likeButton.style.cursor = "pointer";
          likeButton.setAttribute("data-id", answer._id);

          // Like count
          const likeCount = document.createElement("p");
          likeCount.className = "likes";
          likeCount.textContent = answer.likes;

          // Add click event listener to like button
          likeButton.addEventListener("click", async (e) => {
            await increaseLikes(e,answer._id, likeCount);
          });

          likeDiv.appendChild(likeButton);
          likeDiv.appendChild(likeCount);

          answerParagraph.appendChild(likeDiv);
          answersDiv.appendChild(answerParagraph);
        });
      }
      questionItem.appendChild(answersDiv);

      // Add Answer Section
      const addAnswerDiv = document.createElement("div");
      addAnswerDiv.classList.add("add-answer");

      const answerInput = document.createElement("input");
      answerInput.type = "text";
      answerInput.placeholder = "Type your answer here...";

      const addAnswerButton = document.createElement("button");
      addAnswerButton.textContent = "Add Answer";
      addAnswerButton.classList.add("communityButton");

      // Add Answer Functionality
      addAnswerButton.addEventListener("click", async () => {
        const answerText = answerInput.value.trim();
        if (answerText) {
          await addAnswer(question._id, answerText);
          answerInput.value = ""; // Clear the input field
          fetchQuestions(); // Refresh questions
        }
      });

      addAnswerDiv.appendChild(answerInput);
      addAnswerDiv.appendChild(addAnswerButton);

      questionItem.appendChild(addAnswerDiv);

      questionsList.appendChild(questionItem);
    });
  } catch (err) {
    console.error("Error fetching questions:", err);
  }
}

// Function to increase likes
async function increaseLikes(e,answerId, likeCountElement) {
  try {
    console.log(e.target);
    
    const messageid = e.target.getAttribute("messageid")
    const response = await fetch(`${API_BASE_URL}/answers/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` // Attach the token
      },
      body: JSON.stringify({ id: answerId })
    });

    const data = await response.json();

    if (response.ok) {
      likeCountElement.textContent = data.likes;
    } else {
      if (data.message == "Invalid token") {
        document.getElementById(messageid).textContent = data.message;
        setTimeout(() => {
          document.getElementById(messageid).textContent = "";
        }, 2000);
      } else {
        document.getElementById(messageid).textContent = data.message;
        setTimeout(() => {
          document.getElementById(messageid).textContent = "";
        }, 2000);
      }

      console.error("Failed to increment like:", data.message);
    }
  } catch (error) {
    console.error("Error incrementing like:", error);
  }
}

// Function to add a new question
async function addQuestion(questionText) {
  try {
    const response = await fetch(`${API_BASE_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` // Attach the token
      },
      body: JSON.stringify({ text: questionText })
    });

    if (!response.ok) {
      throw new Error("Failed to add question");
    }
  } catch (err) {
    console.error("Error adding question:", err);
  }
}

// Function to add a new answer

async function addAnswer(questionId, answerText) {
  try {
    const response = await fetch(`${API_BASE_URL}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ questionId, text: answerText })
    });

    if (!response.ok) {
      throw new Error("Failed to add answer");
    }
  } catch (err) {
    console.error("Error adding answer:", err);
  }
}

// Event Listener for Submitting a New Question
questionSubmitButton.addEventListener("click", async () => {
  const questionText = questionForm.value.trim();
  if (questionText) {
    await addQuestion(questionText);
    questionForm.value = "";
    fetchQuestions();
  }
});

fetchQuestions();

{
  /* </script> */
}
