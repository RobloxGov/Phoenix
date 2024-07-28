function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    navList.classList.toggle('active');
    hamburgerMenu.classList.toggle('active'); // เพิ่มการเปลี่ยนแปลงสถานะ
}
