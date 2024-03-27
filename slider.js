let data = [
    {
      id: 1,
      imageUrl: 'https://cdn.phenompeople.com/CareerConnectResources/RBCAA0088/images/FutureMakersPage_Articles_WomenWant_Banner_v1-1621488861581.png', 
    },
    {
      id: 2,
      imageUrl: 'https://elu.nl/wp-content/uploads/2021/03/c1920_womenintech-299653.jpg',
       
    },
    {
      id: 3,
      imageUrl: 'https://web-static.wrike.com/blog/content/uploads/2018/03/Women_in_Tech_Know_Their_Worth_Its_Time-Everyone_Else_Does_Too_1.jpg?av=461f21a4d35a6149d69602c26a6400d5',
      
    },
    
];


let leftArrow = document.getElementById('LeftArrow');
let righttArrow = document.getElementById('RightArrow');
let SliderBox = document.getElementById('imageContainer');
let sliderIndex = 0;
let activedot = document.getElementsByClassName('dots');

function DivTag () {
  let Divi = document.createElement('div');
  Divi.classList.add('ImageBox');
  
  return Divi;
}

function BGimage (item) {
  let BgImage = document.createElement('div');
  BgImage.style.backgroundImage = `url(${item.imageUrl})`;
  BgImage.classList.add('BgImage');

  return BgImage;
}

// function Title (item) {
//   let SlideTitle = document.createElement('h3');
//   SlideTitle.innerText = item.title;
//   SlideTitle.classList.add('Title');

//   return SlideTitle;
// }
function CreateDots () {
  let DotBox = document.createElement('div');
  DotBox.classList.add('DotMain');
  
  data.forEach((element) => {
    let dot = document.createElement("div");    
    dot.classList.add("dots");
    dot.setAttribute('data-id', element.id-1);
    DotBox.appendChild(dot);
    dot.addEventListener('click', function(event) {
      let number = event.target.getAttribute("data-id");
      sliderIndex = number;
      Slider();
    });
  });
  
  return DotBox;
}

function Slider () {
  SliderBox.innerHTML = ' ';
  let MainDiv = DivTag(data[sliderIndex]);
  let Image = BGimage(data[sliderIndex]);
//   let imgTitle = Title(data[sliderIndex]);
  let DotParent = CreateDots();

  MainDiv.appendChild(Image);
//   MainDiv.appendChild(imgTitle);
  SliderBox.appendChild(MainDiv);
  MainDiv.appendChild(DotParent);

  activedot[sliderIndex].classList.add('active');
}
function ClickLeftArrow () {
  if (sliderIndex == 0) {
    sliderIndex = data.length-1;
    Slider();
    return;
  }
  sliderIndex--;
  Slider();
}
leftArrow.addEventListener('click', ClickLeftArrow);

function ClickRighttArrow () {
  if (sliderIndex == data.length-1) {
    sliderIndex = 0;
    Slider();
    return;
  }
  sliderIndex++;
  Slider();
}
righttArrow.addEventListener('click', ClickRighttArrow);

setInterval(() => {
  ClickRighttArrow();
}, 4000);

Slider();


// form validation
let registrationForm = document.getElementById('RegForm');

registrationForm.addEventListener('submit', function(registration) {
  registration.preventDefault();

  let errors = {};

  let username = document.getElementById('username').value;
  if (username == '') {
    errors.UserName = 'Please, enter username';
  }

  let password = document.getElementById('password').value;
  let repeatpassword = document.getElementById('Repeatpassword').value;
  
  if (password =='') {
    errors.Password = 'please, enter password';
  }

  if (password != repeatpassword) {
    errors.RepeatPassword = 'Passwords do not match';
  }

  let CheckBox = document.getElementById('agreement').checked;
  if (!CheckBox) {
    errors.agreement = "Please, agree terms and contiions";
  }

  document.querySelectorAll('.ErrorText').forEach((item) => {
    item.innerText = " ";
  });
  
  for (let key in errors) {
    let Errortext = document.getElementById("errors_" + key);

    if (Errortext) {
      Errortext.innerText = errors[key];
    }
  }

  if (Object.keys(errors).length==0) {
    registrationForm.submit();
  } 
  
});

let passwordArea = document.getElementById('password');
let icon = document.getElementById('Icon');

icon.addEventListener("click", function () {
  if (password.type == "password") {
    passwordArea.setAttribute("type", "text");
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    passwordArea.setAttribute("type", "password");
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");    
  }
});



// fetch
let currentPage = 1;
let post = document.getElementById("post-wraper");

function getUsers(page){
    fetch("https://reqres.in/api/users?page=" + page, {
    METHOD: "GET"
})
.then(function(text){
    if (text.status !== 200){
        throw text.status;
    }
    return text.json();
})
.then(function(converted){
    converted.data.forEach((item) => {
        let user = document.createElement("p");
        user.classList.add("user-name");
        user.innerText = `${item.first_name} ${item.last_name}`;

        let avatar = document.createElement("img");
        avatar.src = item.avatar;
        avatar.setAttribute("alrt", "avatar");
        avatar.classList.add("avatar");

        let nameAvatarWraper = document.createElement("div");
        nameAvatarWraper.classList.add("name-avatar-wraper");
        let nameAvatar = document.createElement("div");

        nameAvatar.appendChild(user);
        nameAvatar.appendChild(avatar);
        nameAvatarWraper.appendChild(nameAvatar);
        post.appendChild(nameAvatarWraper);
    });
})
.catch(function(error){
    if(error == 404){
        let p = document.createElement("p");
        p.textContent = "page not found";
        p.classList.add("text");
        post.appendChild(p);
    }
});
}
// load more
let loadMore = document.getElementById("loadmore");
loadMore.addEventListener("click", function(){
    currentPage++;
    getUsers(currentPage);
    loadMore.remove();
});

getUsers(currentPage);

