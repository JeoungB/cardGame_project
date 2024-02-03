const container = document.getElementById("card_container");
const card = document.querySelector(".card");

let cardArray = [card];
let cardColor = [];
let randomColors = [];
let clickCard = [];
let randomColors_copy = [];
let randomColor;
//this.addEventListener('click', stopFunc, true); // 카드 중복 클릭 방지.

// https://juhyejin.tistory.com/44 참고
function makeRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const randomNumber = Math.floor(Math.random() * 0xf).toString(16);
    let rgb = `${r},${g},${b}`
    rgb = rgb.split(',').map((rgb) => parseInt(rgb.replace(/[^0-9]/g,''),10).toString(16).padStart(2,randomNumber)).join('');
    randomColor = "#" + rgb;
}

makeCard = () => { // 이거 화살표 함수로 있을 이유가 없으니까 나중에 바꾸던가 화살표 함수 장점 살려서 두던가.
    // 반복문 j 는 i 값의 절반의 조건이 있어야함.
    for(let j = 0 ; j < 2 ; j++) { // 카드 복사한 수의 색상 배분 ===========================================
        //randomColors.push("#" + Math.round(Math.random() * 0xffffff).toString(16));
        // 6자리가 아닌 hex 값이 나와 오류 발생.
        makeRandomColor(); // 이 함수로 해결
        randomColors.push(randomColor);
    }

    // 색상 중복 제거
    // ...new Set() 이게 뭔데
    // https://www.daleseo.com/js-set/ 참고
    randomColors = [...new Set(randomColors)];

    randomColors_copy = [...randomColors] // 색상 2개 카피해서
    //console.log("random :", randomColors)

    randomColors.push(...randomColors_copy); // 색상 2개 2개 합쳐서 색상 2쌍 같은 배열만듬.

    //console.log(randomColors)

    //i 의 갯수만큼 순회하는 foreach 응용
for(let i=0 ; i < 4 ; i++) { // 카드 복사 개수 ======================================

    if(i >= 1) {
        cardArray[i] = card.cloneNode(true);
        // 그냥 배열 객체랑 스프레드랑 차이??
    }
    const backs = cardArray[i].querySelector(".back"); // 요소의 뒷면 요소 가져옴.
    backs.style.backgroundColor = randomColors[i]; // 색상 적용

    cardArray[i].addEventListener("click", click);
    }
    // cardArray 배열 순서 섞기.
    // https://7942yongdae.tistory.com/96 참고.
    for(let index = cardArray.length - 1 ; index > 0 ; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));

        const temporary = cardArray[index];
        cardArray[index] = cardArray[randomPosition];
        cardArray[randomPosition] = temporary;
    }

    container.append(...cardArray);

}

makeCard();

function click() {
    let stopFunc = function(e) { e.stopPropagation(); return false;};
    this.style.transform = "rotateY(180deg)";
    const back = this.querySelector(".back");
    let thisColor = getComputedStyle(back).backgroundColor;
    cardColor.push(thisColor);

    this.style.pointerEvents = "none";

    clickCard.push(this);
    console.log(clickCard);

    if(clickCard[0] !== undefined && clickCard[1] !== undefined) {

        if(cardColor[0] !== cardColor[1]) {
            addEventListener('click', stopFunc, true);
            setTimeout(() => {
                for(let i = 0 ; i < 2 ; i++) {
                    clickCard[i].style.transform = "rotateY(0)";
                    clickCard[i].style.pointerEvents = "auto"
                }

                clickCard = [];
                cardColor = [];
            removeEventListener('click', stopFunc, true);
            }, 1000);
        }

        if(cardColor[0] === cardColor[1]) {
            clickCard = [];
            cardColor = [];
        }
    }


}

// 각각 변수들 전역 변수로 바꿀것들 전역으로 정리하고
// 변수 이름 정리하고
// 코드 깔끔하게 정리하고
