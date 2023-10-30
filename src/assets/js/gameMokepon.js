//Section select game mode
let quote = document.querySelector('.random-quotes');

// Section choose mokepons
let mokepones = [];
let mokeponesEnemys = [];
let containPets = document.querySelector('.containPets');
let btnChoosePet = document.querySelector(".btnChoosePet");
let hiddenSelectionPets;
let replaceSubTitle = document.querySelector('.sub-title');// These change for the maps

//Section Battle mokepons
let allPets = document.getElementsByName('pet');
let findPetChecked = [];
let imagePlayer;
let imageEnemy;
let typeOfMokepon;
let typeOfMokeponEnemy;
let allAttacksPlayerPet;
let allAttacksEnemyPet;
let mokeponsOptions;
let attacksMokepons;
let totalAttacksInsert = document.querySelector('.gamesRound span');
let totalAttacks = Array(5).fill('⚔️');
let totalVictoriesPlayer = [];
let totalVictoriesEnemy = [];
let buttons = [];
let attackedPlayer = [];
let attackedEnemy = [];
let randomNamePetEnemy;
let playerAttackedSelect;
let enemyAttackedSelect;
let victoryPlayer = 0;
let victoryEnemy = 0;
let resultWinner;
let countAttacks = 0;
let strongAttack;
let reboot;

//Map
let interval;
let mapBackground = new Image();
mapBackground.src = './assets/images/mokemap.webp';
let petPlayerObject;

let heightSearch;
let widthMap = containPets.offsetWidth - 8;
const maxWidthMap = 800;

if (widthMap > maxWidthMap){
  widthMap = maxWidthMap - 8;
}
heightSearch = widthMap * 600 / 800;

map.width = widthMap;
map.height = heightSearch;

let playerId = null;
let enemyId = null;




function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


//Random quotes
function randomQuotes() {
  let quotesContain = [
    'Mi animal interior es la <strong class="quote-strong">&nbsp;Ratigueya&nbsp;</strong> &#129304;',
    'Hecho con amor por un backend <strong class="quote-strong">&nbsp;.container { center: please; }</strong>',
    'Ningún mokepon salió herido durante la batalla',
    'Sobreviviente de la clase Número <strong class="quote-strong">&nbsp;58&nbsp;</strong> del curso de Programación Básica',
    'Orgullosamente hecho en PHP 6 🐘 ( ͡° ͜ʖ ͡°)',
    'Me gustaría ser el CSS de tu HTML, pero no consigo salir de vim &#128565;&#8205;&#128171;',
    'Este es mi secreto, siempre programo cansado',
    "Todos sus &lt;div&gt; están perfectamente centrados",
    'Better viewed on Internet Explorer 9 &#128527;',
    'Sitio alojado en los servidores de Omicron Persei 8',
    'Nada puede malirsal',
    'En localhost funcionaba...',
    'Este sitio está patrocinado por: jQuery64'
  ];

  let randomNum = randomNumber(0, quotesContain.length);
  quote.innerHTML = quotesContain[randomNum];
}



// Single source of truth.
//Class
class Mokepon {
  //Object's
  constructor(name, image, typeOfMokepon, photoMap, id = null) {
    //Internal variables.
    this.id = id
    this.name = name;
    this.image = image;
    this.typeOfMokepon = typeOfMokepon;
    this.attacks = [];
    if (widthMap > 700) {
      this.width = 60;
      this.height = 72;
    } else {
      this.width = 40;
      this.height = 48;
    }
    this.x = randomNumber(0, map.width - this.width);
    this.y = randomNumber(0, map.height - this.height);
    this.mapImage = new Image();
    this.mapImage.src = photoMap;
    this.speedX = 0;
    this.speedY = 0;
  }

  paintMokepon() {
    //Map
    let viewMap = document.querySelector('.view-map');
    let map = document.getElementById('map');
    let canvas = map.getContext("2d");

    canvas.drawImage(
      this.mapImage,
      this.x,
      this.y,
      this.width,
      this.height
    );

  }

}

// Instances.
let hipodoge = new Mokepon('Hipodoge', './assets/images/mokepon_hipodoge.webp', 'water', './assets/images/mini_hipodoge.webp');
let capipepo = new Mokepon('Capipepo', './assets/images/mokepon_capipepo.webp', 'land', './assets/images/mini_capipepo.webp');
let ratigueya = new Mokepon('Ratigueya', './assets/images/mokepon_ratigueya.webp', 'fire', './assets/images/mini_ratigueya.webp');
let langostelvis = new Mokepon('Langostelvis', './assets/images/mokepon_langostelvis.webp', 'fire', './assets/images/mokepon_langostelvis.webp');
let pydos = new Mokepon('Pydos', './assets/images/mokepon_pydos.webp', 'water', './assets/images/mokepon_pydos.webp');
let tucapalma = new Mokepon('Tucapalma', './assets/images/mokepon_tucapalma.webp', 'land', './assets/images/mokepon_tucapalma.webp');

// let hipodogeEnemy = new Mokepon('Hipodoge', './assets/images/mokepon_hipodoge.webp', 'water', './assets/images/mini_hipodoge.webp');
// let capipepoEnemy = new Mokepon('Capipepo', './assets/images/mokepon_capipepo.webp', 'land', './assets/images/mini_capipepo.webp');
// let ratigueyaEnemy = new Mokepon('Ratigueya', './assets/images/mokepon_ratigueya.webp', 'fire', './assets/images/mini_ratigueya.webp');
// let langostelvisEnemy = new Mokepon('Langostelvis', './assets/images/mokepon_langostelvis.webp', 'fire', './assets/images/mokepon_langostelvis.webp');
// let pydosEnemy = new Mokepon('Pydos', './assets/images/mokepon_pydos.webp', 'water', './assets/images/mokepon_pydos.webp');
// let tucapalmaEnemy = new Mokepon('Tucapalma', './assets/images/mokepon_tucapalma.webp', 'land', './assets/images/mokepon_tucapalma.webp');

const HIPODOGE_ATQ = [
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' }
]

//These inject to attribute {this.attack} directly
hipodoge.attacks.push(...HIPODOGE_ATQ);
// hipodogeEnemy.attacks.push(...HIPODOGE_ATQ);

const CAPIPEPO_ATQ = [
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' }
]

capipepo.attacks.push(...CAPIPEPO_ATQ);
// capipepoEnemy.attacks.push(...CAPIPEPO_ATQ);

const RATIGUEYA_ATQ = [
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' }
]

ratigueya.attacks.push(...RATIGUEYA_ATQ);
// ratigueyaEnemy.attacks.push(...RATIGUEYA_ATQ);

const PYDOS_ATQ = [
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' }
]

pydos.attacks.push(...PYDOS_ATQ);
// pydosEnemy.attacks.push(...PYDOS_ATQ);

const TUCAPALMA_ATQ = [
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' }
]

tucapalma.attacks.push(...TUCAPALMA_ATQ);
// tucapalmaEnemy.attacks.push(...TUCAPALMA_ATQ);

const LANGOSTELVIS_ATQ = [
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' }
]

langostelvis.attacks.push(...LANGOSTELVIS_ATQ);
// langostelvisEnemy.attacks.push(...LANGOSTELVIS_ATQ);

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma);

//Choose Mokepons.
function startGame() {

  mokepones.forEach((mokepon) => {
    //Literary Templates.
    mokeponsOptions = `
    <label for=${mokepon.name.toLowerCase()} class=${mokepon.typeOfMokepon}>
      <input type="radio" name="pet" id=${mokepon.name.toLowerCase()}>
        <span class="radio-btn"><strong></strong>
        <img src=${mokepon.image} alt=${mokepon.name.toLowerCase()}>
        <p>${mokepon.name}</p>
      </span>
    </label>
    `;
    containPets.innerHTML += mokeponsOptions;

    hiddenSelectionPets = document.querySelectorAll('.containPets label, .btnChoosePet, .more-information');
    btnChoosePet.addEventListener('click', validateSelection);
  });

  joinGame();

}

function joinGame(){
  fetch("http://localhost:8080/join")
    .then(function (res) {

      if (res.ok) {

        res.text()
          .then(function (resquest){
            console.log(resquest)
            playerId = resquest;
          })

      }
    })
}

function validateSelection() {
  let showPetAttacks = document.querySelector('.containerBattlePets');
  //Map
  let viewMap = document.querySelector('.view-map');

  allPets.forEach(function (pet) {
    if (pet.checked) {
      findPetChecked.push(pet.id);
    }
  });

  if (findPetChecked.length != 0) {
    //map
    hiddenSelectionPets.forEach(function (hiddenSelectionPet) {
      hiddenSelectionPet.style.display = "none"
    });
    replaceSubTitle.innerHTML = "Search for your opponent:";
    viewMap.style.display = 'flex';
    containPets.style.height = '65vh';
    containPets.style.padding = '8px 8px 15px'

    startMap();
  } else {
    alert('Please, Choose your pet');
  }


}

function startMap() {
  //move Mokepon
  let right = document.querySelector('.right');
  let down = document.querySelector('.down');
  let left = document.querySelector('.left');
  let up = document.querySelector('.up');

  right.addEventListener('mousedown', movePetRight);
  right.addEventListener('mouseup', stopMove);
  right.addEventListener('ontouchstart', movePetRight);
  right.addEventListener('ontouchend', stopMove);
  down.addEventListener('mousedown', movePetDown);
  down.addEventListener('mouseup', stopMove);
  down.addEventListener('ontouchstart', movePetDown);
  down.addEventListener('ontouchend', stopMove);
  left.addEventListener('mousedown', movePetLeft);
  left.addEventListener('mouseup', stopMove);
  left.addEventListener('ontouchstart', movePetLeft);
  left.addEventListener('ontouchend', stopMove);
  up.addEventListener('mousedown', movePetUp);
  up.addEventListener('mouseup', stopMove);
  up.addEventListener('ontouchstart', movePetUp);
  up.addEventListener('ontouchend', stopMove);

  interval = setInterval(paintCanvas, 50);

  window.addEventListener('keydown', pressKey);
  window.addEventListener('keyup', stopMove);

  // la forma que ne nosotros podemos hacer responsive la imagen es de la siguiente manera:
  // x = VariableWidth x height / width
  // x = withScreen x 600 / 800
  namePetSelected = findPetChecked[0];
  selectedMokepon(namePetSelected);


  petPlayerObject = getObjectPet();
}

function paintCanvas() {
  //Map
  let map = document.getElementById('map');
  let canvas = map.getContext("2d");

  petPlayerObject.x = petPlayerObject.x + petPlayerObject.speedX;
  petPlayerObject.y = petPlayerObject.y + petPlayerObject.speedY;
  canvas.clearRect(0, 0, map.width, map.height);
  canvas.drawImage(
    mapBackground,
    0,
    0,
    map.width,
    map.height
  );

  petPlayerObject.paintMokepon();

  sendPosition(petPlayerObject.x, petPlayerObject.y)

  mokeponesEnemys.forEach(function(mokepon){
    mokepon.paintMokepon();
    reviewColition(mokepon);
  })
  // hipodogeEnemy.paintMokepon();
  // capipepoEnemy.paintMokepon();
  // ratigueyaEnemy.paintMokepon();
  // langostelvisEnemy.paintMokepon();
  // pydosEnemy.paintMokepon();
  // tucapalmaEnemy.paintMokepon();

  // if(petPlayerObject.speedX !== 0 || petPlayerObject.speedY !== 0){
  //   reviewColition(hipodogeEnemy);
  //   reviewColition(capipepoEnemy);
  //   reviewColition(ratigueyaEnemy);
  //   reviewColition(langostelvisEnemy);
  //   reviewColition(pydosEnemy);
  //   reviewColition(tucapalmaEnemy);
  // }
}

function sendPosition(x, y){
  fetch(`http://localhost:8080/mokepon/${playerId}/position`, {

    method: "post",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })

  })
  .then(function (res){
    if (res.ok) {
      res.json()
        .then(function({enemys}){

          mokeponesEnemys = enemys.map(function(enemy){
            let mokeponEnemy = null
            const mokeponName = enemy.mokepon.name || ""
            if (mokeponName === "hipodoge") {
              mokeponEnemy = new Mokepon('Hipodoge', './assets/images/mokepon_hipodoge.webp', 'water', './assets/images/mini_hipodoge.webp', enemy.id);
            } else if (mokeponName === "capipepo") {
              mokeponEnemy = new Mokepon('Capipepo', './assets/images/mokepon_capipepo.webp', 'land', './assets/images/mini_capipepo.webp', enemy.id);
            } else if (mokeponName === "ratigueya") {
              mokeponEnemy = new Mokepon('Ratigueya', './assets/images/mokepon_ratigueya.webp', 'fire', './assets/images/mini_ratigueya.webp', enemy.id);
            }
            console.log(mokeponEnemy)

            mokeponEnemy.x = enemy.x
            mokeponEnemy.y = enemy.y

            return mokeponEnemy

          })



          // let langostelvisEnemy = new Mokepon('Langostelvis', './assets/images/mokepon_langostelvis.webp', 'fire', './assets/images/mokepon_langostelvis.webp');
          // let pydosEnemy = new Mokepon('Pydos', './assets/images/mokepon_pydos.webp', 'water', './assets/images/mokepon_pydos.webp');
          // let tucapalmaEnemy = new Mokepon('Tucapalma', './assets/images/mokepon_tucapalma.webp', 'land', './assets/images/mokepon_tucapalma.webp');
        })
    }
  })
}

function movePetRight() {
  petPlayerObject.speedX = 5;
}

function movePetLeft() {
  petPlayerObject.speedX = -5;
}

function movePetDown() {
  petPlayerObject.speedY = 5;
}

function movePetUp() {
  petPlayerObject.speedY = -5;
}

function stopMove() {
  petPlayerObject.speedX = 0;
  petPlayerObject.speedY = 0;
}
//la variable reservada event retornan objeto con la información del evento.
function pressKey(event) {
  switch (event.key) {
    case 'ArrowUp':
      movePetUp();
      break;
    case 'ArrowDown':
      movePetDown();
      break;
    case 'ArrowLeft':
      movePetLeft();
      break;
    case 'ArrowRight':
      movePetRight();
      break;
    default:
      break;
  }
}

function getObjectPet() {
  let namePetSelected = findPetChecked[0];
  namePetSelected = namePetSelected.charAt(0).toUpperCase() + namePetSelected.slice(1);
  for (let x = 0; x < mokepones.length; x++) {
    if (namePetSelected === mokepones[x].name) {
      return mokepones[x];
    }
  }
}

function reviewColition(enemy) {
  let showPetAttacks = document.querySelector('.containerBattlePets');
  //Map
  let viewMap = document.querySelector('.view-map');

  const upEnemy = enemy.y;
  const downEnemy = enemy.y + enemy.height;
  const rightEnemy = enemy.x + enemy.width;
  const leftEnemy = enemy.x;

  const upPet = petPlayerObject.y;
  const downPet = petPlayerObject.y + petPlayerObject.height;
  const rightPet = petPlayerObject.x + petPlayerObject.width;
  const leftPet = petPlayerObject.x;

  if
    (
    downPet < upEnemy ||
    upPet > downEnemy ||
    rightPet < leftEnemy ||
    leftPet > rightEnemy
  ) {
    return;
  }
  stopMove();
  clearInterval(interval);

  enemyId = enemy.id
  replaceSubTitle.innerHTML = "Select your attack:";
  showPetAttacks.style.display = 'flex';
  containPets.style.height = '60%';
  viewMap.style.display = "none";


  playerSelectPet(enemy);
  // alert('Hay colición: ' + enemy.name);
}

function playerSelectPet(enemy) {

  let playerPet = document.querySelectorAll('.playerPet img, .playerPet p');
  let enemyPet = document.querySelectorAll('.enemyPet img, .enemyPet p');
  let namePetPlayer = document.querySelector('.namePetPlayer');
  let namePetEnemy = document.querySelector('.namePetEnemy');



  namePetSelected = findPetChecked[0];
  namePetSelected = namePetSelected.charAt(0).toUpperCase() + namePetSelected.slice(1);// I think it's not necessary


  for (let x = 0; x < mokepones.length; x++) {
    if (namePetSelected === mokepones[x].name) {
      allAttacksPlayerPet = mokepones[x].attacks;
      imagePlayer = mokepones[x].image;
      typeOfMokepon = mokepones[x].typeOfMokepon;
    }
  }
  //Factory this code.
  playerPet.forEach(function (playerPetSet) {
    playerPetSet.src = imagePlayer;
    playerPetSet.alt = namePetSelected;
    playerPetSet.classList.add(typeOfMokepon);
  });
  namePetPlayer.innerHTML = namePetSelected;


  //Selected Enemy {name}, attacks.
  // let randomNumberEnemy = randomNumber(0, mokepones.length);
  // randomNamePetEnemy = allPets[randomNumberEnemy].id;
  // randomNamePetEnemy = randomNamePetEnemy.charAt(0).toUpperCase() + randomNamePetEnemy.slice(1);
  randomNamePetEnemy = enemy.name;


  for (let z = 0; z < mokepones.length; z++) {
    if (randomNamePetEnemy === mokepones[z].name) {
      imageEnemy = mokepones[z].image;
      typeOfMokeponEnemy = mokepones[z].typeOfMokepon;
    }
  }

  enemyPet.forEach(function (enemyPetSet) {
    enemyPetSet.src = imageEnemy;
    enemyPetSet.alt = randomNamePetEnemy.toLowerCase();
    enemyPetSet.classList.add(typeOfMokeponEnemy);
  });
  namePetEnemy.innerHTML = randomNamePetEnemy;
  //Don't repeat Code

  showAttacks(allAttacksPlayerPet);

}

function selectedMokepon(namePetSelected){
  fetch(`http://localhost:8080/mokepon/${playerId}`, {
    method: "post",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      mokepon: namePetSelected
    })
  })
}

function showAttacks(allAttacksPlayerPet) {
  let btnAttacksContainer = document.querySelector('.containAttacks');
  let totalAttacksInsert = document.querySelector('.gamesRound span');


  let indiceMokepon = mokepones.findIndex(mokepon => mokepon.name === namePetSelected);
  let icoMokepon = mokepones[indiceMokepon].attacks[0].nameAttack;
  let typeMokepon = mokepones[indiceMokepon].attacks[0].dataAttack;


  if (typeOfMokepon === typeOfMokeponEnemy) {
    totalAttacksInsert.innerHTML = totalAttacks.join('');
    allAttacksPlayerPet.forEach((attackPet) => {
      attacksMokepons = `<button class=${attackPet.id} data-type_attack=${attackPet.dataAttack}>${attackPet.nameAttack}</button>`
      btnAttacksContainer.innerHTML += attacksMokepons;
    });
    strongAttack = 1;

  } else if (typeOfMokepon === 'water' && typeOfMokeponEnemy === 'fire' || typeOfMokepon === 'fire' && typeOfMokeponEnemy === 'land' || typeOfMokepon === 'land' && typeOfMokeponEnemy === 'water') {
    totalAttacks.push('⚔️');
    totalAttacksInsert.innerHTML = totalAttacks.join('');
    mokepones[indiceMokepon].attacks.push({ nameAttack: `${icoMokepon}`, id: 'btn' + `${typeMokepon}`, dataAttack: `${typeMokepon}` });
    allAttacksPlayerPet.forEach((attackPet) => {
      attacksMokepons = `<button class=${attackPet.id} data-type_attack=${attackPet.dataAttack}>${attackPet.nameAttack}</button>`
      btnAttacksContainer.innerHTML += attacksMokepons;
    });
    strongAttack = 2;
  } else {
    totalAttacks.pop();
    totalAttacksInsert.innerHTML = totalAttacks.join('');
    mokepones[indiceMokepon].attacks.pop();
    allAttacksPlayerPet.forEach((attackPet) => {
      attacksMokepons = `<button class=${attackPet.id} data-type_attack=${attackPet.dataAttack}>${attackPet.nameAttack}</button>`
      btnAttacksContainer.innerHTML += attacksMokepons;
      strongAttack = true;
    });
    strongAttack = 3;
  }



  buttons = document.querySelectorAll('.containAttacks button[class*="btn"]');
  reboot = document.querySelector('.reboot');
  reboot.addEventListener('click', rebootGame);

  sequenceOfAttacks();

}

function sequenceOfAttacks() {

  buttons.forEach((button) => {
    button.addEventListener('click', (x) => {
      if (x.target.textContent === '🔥') {
        attackedPlayer.push('Fire');
        totalAttacks.pop()
        button.disabled = true;
      } else if (x.target.textContent === '🌊') {
        attackedPlayer.push('Water');
        totalAttacks.pop()
        button.disabled = true;
      } else {
        attackedPlayer.push('Land');
        totalAttacks.pop()
        button.disabled = true;
      }
      // randomEnemyAttack();
      if (attackedPlayer.length === 5) {
        sendAttacks();
      }

    })
  });


}

function sendAttacks(){
  fetch(`http://localhost:8080/mokepon/${playerId}/attacks`, {
    method: "post",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        attacks: attackedPlayer
    })
  })

  interval = setInterval(getAttacks, 50)
}

function getAttacks() {
  fetch(`http://localhost:8080/mokepon/${enemyId}/attacks`)
    .then(function(res){
      if (res.ok) {
        res.json()
          .then(function ({ attacks }){
            if (attacks.length === 5) {
              attackedEnemy = attacks
              playGame();
            }
          })
      }
    })
}

//  Validate Name pet in Class and return attacks
function randomEnemyAttack() {

  randomNamePetEnemy = randomNamePetEnemy.charAt(0).toUpperCase() + randomNamePetEnemy.slice(1);
  for (let x = 0; x < mokepones.length; x++) {
    if (randomNamePetEnemy == mokepones[x].name) {
      allAttacksEnemyPet = mokepones[x].attacks;
    }
  }

  let randomNumberEnemy = randomNumber(0, allAttacksEnemyPet.length);
  attackedEnemy.push(allAttacksEnemyPet[randomNumberEnemy].dataAttack);
  playGame();
}

//Why the variables not working in global scope?
function playGame() {

  clearInterval(interval)


  let victoryPlayerInsert = document.querySelector('.victoriesPlayer');
  let victoryEnemyInsert = document.querySelector('.victoriesEnemy');

  for (let x = 0; x < attackedPlayer.length; x++) {

    if (attackedPlayer.length > 1) {
      attackedPlayer.splice(0, 1);
      attackedEnemy.splice(0, 1);
    }

    if (attackedPlayer[x] === attackedEnemy[x]) {
      resultWinner = '😐 <br/> Tie ';
      countAttacks++;

    } else if (attackedPlayer[x] === 'Fire' && attackedEnemy[x] === 'Land' || attackedPlayer[x] === 'Water' && attackedEnemy[x] === 'Fire' || attackedPlayer[x] === 'Land' && attackedEnemy[x] === 'Fire') {
      victoryPlayer++
      resultWinner = '🏆 <br/> Win';
      totalVictoriesPlayer.push('🏆');
      victoryPlayerInsert.innerHTML = totalVictoriesPlayer.join('');
      countAttacks++;

    } else {

      victoryEnemy++;
      resultWinner = '😭 <br/> Lose';
      totalVictoriesEnemy.push('🏆');
      victoryEnemyInsert.innerHTML = totalVictoriesEnemy.join('');
      countAttacks++;

    }
    getNumberAttack(x, x);
    createMessage();
  }


  if (strongAttack === 1 && countAttacks === 5) {
    validateVictorys();
  } else if (strongAttack === 2 && countAttacks === 6) {
    validateVictorys();
  } else if (strongAttack === 3 && countAttacks === 4) {
    validateVictorys();
  }

}

function getNumberAttack(player, enemy) {
  playerAttackedSelect = attackedPlayer[player];
  enemyAttackedSelect = attackedEnemy[enemy];
}

function createMessage() {
  let playerAttack = document.querySelector('.attackPlayer');
  let enemyAttack = document.querySelector('.attackEnemy');
  let sectionResult = document.querySelector('.resultAttack');
  let totalAttacksInsert = document.querySelector('.gamesRound span');

  totalAttacksInsert.innerHTML = totalAttacks.join('');
  playerAttack.innerHTML = 'attacked with ' + playerAttackedSelect;
  enemyAttack.innerHTML = 'attacked with ' + enemyAttackedSelect;
  sectionResult.innerHTML = resultWinner;

}

function validateVictorys() {
  let messageTitle = document.querySelector('#messages h1');
  let sectionResult = document.querySelector('.resultAttack');
  messageTitle.innerHTML = 'The Battle Result is:'

  if (victoryPlayer === victoryEnemy) {
    sectionResult.innerHTML = "😐 <br/> It's Tie";
  } else if (victoryPlayer > victoryEnemy) {
    sectionResult.innerHTML = '🏆 <br/> You Won!';
  } else {
    sectionResult.innerHTML = '🥲 <br/> You Lose!';
  }
  btnAttacks = document.querySelectorAll('.containAttacks button[class*="btn"]');
  btnAttacks.forEach(function (btnAttacks) {
    btnAttacks.style.display = 'none';
  });

  reboot.style.display = 'block';
}

function rebootGame() {
  location.reload();
}



window.addEventListener('load', () => {
  randomQuotes();
});

