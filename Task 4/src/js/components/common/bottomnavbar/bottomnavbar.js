import { PreventScroll } from '../../../utils/preventScroll.js';
import { home, profile, search, setting } from './renderContents.js';

export const bottomNavbar = () => {
    const backdrop = document.getElementById('backdrop');
    const buttonsContainer = document.getElementById('bottomNavbarBtns');
    const buttons = buttonsContainer.querySelectorAll('button');
    const bottomNavbar = document.getElementById('bottomNavbarContainer');
    const container = bottomNavbar.querySelector('div');
    const closeBtn = bottomNavbar.querySelector('button');

    const { preventScroll, allowScroll } = PreventScroll();

    if (!buttons || !backdrop || !bottomNavbar) {
        console.log('Error, required elements not found.');
        return;
    }

    buttons.forEach((btn) => {
        console.log('dataset of btn  : ', btn.dataset.btnfor);
        btn.addEventListener('click', () => {
            if (container) {
                bottomNavbar.classList.add('active');
                backdrop.classList.add('active');
                preventScroll();
            }
            renderBottomNavbarContents(btn.dataset.btnfor, container);
        });
    });

    // close btn

    function closeBottomNav() {
        bottomNavbar.classList.remove('active');
        backdrop.classList.remove('active');
        allowScroll();
        setTimeout(() => {
            container.innerHTML = ``;
        }, 500);
    }
    window.addEventListener('click', (e) => {
        const isbottomNavbar = bottomNavbar.contains(e.target);
        const isbottomNavbarActive = bottomNavbar.classList.contains('active');
        const isbuttonsContainer = buttonsContainer.contains(e.target);

        if (isbottomNavbarActive && !isbottomNavbar && !isbuttonsContainer) {
            closeBottomNav();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeBottomNav();
        });
    }
};

function renderBottomNavbarContents(key, container) {
    switch (key) {
        case 'home':
            home(container);
            break;

        case 'search':
            search(container);
            break;

        case 'setting':
            setting(container);
            break;

        case 'profile':
            profile(container);
            break;

        default:
            container.innerHTML = ``;
            break;
    }
}
