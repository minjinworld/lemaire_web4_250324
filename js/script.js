document.addEventListener(`DOMContentLoaded`, function () {
  // AOS
  window.addEventListener(`load`, function () {
    AOS.init();
    AOS.refresh();
  });

  // 마우스휠 헤더 이벤트
  // .header_area 가 휠이 내려갈때는 안보이다가 올라갈때 보이게끔 설정
  // scrollEvent 이라는 클래스 추가제거로 조절
  window.addEventListener(`wheel`, (event) => {
    const headerArea = document.querySelector(`.header_area`);

    if (event.deltaY > 0) {
      // wheel down
      headerArea.classList.remove(`scrollEvent`);
    } else {
      // wheel up
      headerArea.classList.add(`scrollEvent`);
    }
  });

  // body 에 배경색 조정
  // 스크롤 이벤트 offsetTop 값 활용
  const sec2 = document.querySelector(`.sec_2`);
  const sec3 = document.querySelector(`.sec_3`);

  window.addEventListener(`scroll`, function () {
    const sec2OffsetTop = sec2.offsetTop - 500;
    const sec3OffsetTop = sec3.offsetTop;

    const scrollTopData = window.scrollY;
    console.log(scrollTopData);

    const bodyBg = document.querySelector(`body`);

    // 스크롤상단값이 sec2의 상단위치값보다 크고 스크롤상단값이 sec3의 상단위치값보다 작다면 body 에 클래스 추가
    if (scrollTopData > sec2OffsetTop && scrollTopData < sec3OffsetTop) {
      bodyBg.classList.add(`bg`);
    } else {
      bodyBg.classList.remove(`bg`);
    }
  });

  // 스와이퍼 변수 선언
  let swiper = undefined;

  // 윈도우 너비에 따라 조정되는 미디어쿼리 및 리사이즈 이벤트 진행
  function initSwiper() {
    // 윈도우의 너비값을 변수에 저장
    const windowWidth = window.innerWidth;

    if (windowWidth >= 960 && swiper == undefined) {
      // swiper(sec_3)
      // 세로로 굴러가는 스와이퍼

      swiper = new Swiper(".ceoSwiper", {
        direction: "vertical",
        loop: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false, // 다른 인터렉션이 있을때 자동재생을 멈추는것을 방지
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    } else if (windowWidth < 960 && swiper != undefined) {
      swiper.destroy();
      swiper = undefined;
    }
  }

  // 함수는 무조건 호출해야 사용가능
  initSwiper();

  // 윈도우가 리사이즈될때 자동으로 반응하도록 설정
  window.addEventListener(`resize`, function () {
    initSwiper(); // 지역호출
  });

  // window.addEventListener(`resize`, () => initSwiper());

  // sub_menu(tab)
  //마우스 올리면 카테고리에 맞는 탭 활성화
  const submenuTab = document.querySelectorAll(`.main_menu li`);
  const submenuBox = document.querySelector(`.sub_menu_box`);
  const subMenus = document.querySelectorAll(`.sub_menu`);

  //   for (const li of submenuTab) {
  //     li.addEventListener(`mouseenter`, function () {
  //       submenuBox.classList.add(`active`);

  //       //탭메뉴 연결
  //       const liData = this.getAttribute(`data-tab`);
  //       const submenu = document.querySelectorAll(`.sub_menu`);

  //       // 전체적으로 서브메누 추가되어있으면 먼저 제거
  //       for (const tabContent of submenu) {
  //         tabContent.classList.remove(`active`);
  //       }

  //       // data-tab 에 작성된 데이터명과 동일한 아이디명을 사진 서브메뉴는 출력
  //       const changeTab = document.querySelector(`#${liData}`);

  //       changeTab.classList.add(`active`);
  //     });
  //   }

  //forEach, dataset 으로 변경해서 작성해보기
  submenuTab.forEach((li) => {
    li.addEventListener(`mouseenter`, () => {
      submenuBox.classList.add(`active`);

      // 모든 서브메뉴에서 active 제거
      // 여기서 화살표함수 한줄로 적을때 중괄호 안써도 오류없음
      subMenus.forEach((tab) => tab.classList.remove(`active`));

      // 해당 탭만 active 추가
      const target = li.dataset.tab;
      const changeTab = document.getElementById(target);
      changeTab.classList.add(`active`);
    });
  });

  // 서브메뉴박스에서 마우스 나가면 서브메뉴박스가 없어지게 설정
  submenuBox.addEventListener(`mouseleave`, function () {
    this.classList.remove(`active`);
  });

  // 상단이동버튼
  // 기존에는 투명하게 안보이다가 300px 이상일때 top_btn 보여지게끔(css에서 클래스명 설정해주고 진행)
  const topBtn = document.querySelector(`.top_btn`);

  window.addEventListener(`scroll`, function () {
    const scrollTop = window.scrollY;

    if (scrollTop >= 300) {
      topBtn.classList.add(`on`);
    } else {
      topBtn.classList.remove(`on`);
    }
  });

  topBtn.addEventListener(`click`, () => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  });
  // window.scrollTo 는 브라우저에서 제공하는 자바스크립트 내장 메서드 : 페이지를 특정 위치로 스크롤할때 사용
  // behavior: `smooth` 는 부드럽게 스크롤되도록 하는 옵션(기본값은 auto) -> 직접 시간조절을 할 수 없다

  // 과제 : 작은 그리드에서 햄버거버튼 누르면 메인메뉴 출력
  const menuBtn = document.querySelector(`#hamburger`);
  const mainMenu = document.querySelector(`.main_menu`);

  menuBtn.addEventListener(`click`, function () {
    this.classList.toggle(`active`);

    // mainMenu.classList.toggle(`active`);
    // 상위 형식으로 코드 작성시 브라우저 오류 발생하면 반대로 토글될 가능성 있음

    //contains 활용해서 메인메뉴를 메뉴버튼 active 가 있을때 추가 아니면 제거
    const hasClass = this.classList.contains(`active`);
    if (hasClass) {
      mainMenu.classList.add(`active`);
    } else {
      mainMenu.classList.remove(`active`);
    }
  });

  // 파비콘 연결해오기(파비콘이미지는 이미지폴더에 있습니다!)
  // 서버에 추가수정한 부분 집에서 업로드 해보기!
  // 내일부터는 대면 수업입니다!!!(리뉴얼 할 사이트 지정해오시고 디자인 시안 미리 어떻게 구성할지 생각해오시면 좋습니다~)
});
