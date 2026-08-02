//==============================
// LOADER
//==============================

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.classList.add("hide");

    },1500);

});

//==============================
// HEADER
//==============================

const header = document.querySelector(".header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        header.style.padding="16px 8%";
        header.style.boxShadow="0 8px 30px rgba(0,0,0,.08)";
        header.style.background="rgba(255,255,255,.95)";

    }

    else{

        header.style.padding="22px 8%";
        header.style.boxShadow="none";
        header.style.background="rgba(255,255,255,.85)";

    }

});