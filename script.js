function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const body = document.body; // ใช้ body แทน document.body

    navList.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');

    // เปลี่ยนแปลงสถานะ overflow ของ body
    if (navList.classList.contains('active')) {
        body.style.overflow = 'hidden'; // ปิดการเลื่อนเมื่อเมนูเปิด
    } else {
        body.style.overflow = ''; // กลับไปเป็นค่าเริ่มต้นเมื่อเมนูปิด
    }
}
