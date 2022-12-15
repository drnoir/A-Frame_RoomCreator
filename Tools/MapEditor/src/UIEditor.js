const menuUI = document.getElementById('openEditor')
const closeUI = document.getElementById('closebtn')
menuUI.addEventListener('mousedown', (event) => {
    openNav();
});

closeUI.addEventListener('mousedown', (event) => {
    closeNav();
});

function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}



