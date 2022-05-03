import { baseURL } from '../constants/index.mjs';

export class Homepage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = baseURL;

        this.selectors = {
            burgerButton: '[aria-label="Ouvrir/Fermer le menu"]',
            trainingsButton: 'nav >> text=Formations',
            trainingListButton: 'text="Catalogue des formations"',
        }
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async openMenu() {
        await this.page.locator(this.selectors.burgerButton).click();
    }

    async gotoTrainingsPage() {
        await this.goto();
        await this.openMenu();
        await this.page.locator(this.selectors.trainingsButton).click();
        await this.page.locator(this.selectors.trainingListButton).click();
    }
}
