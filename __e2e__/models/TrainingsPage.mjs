import { baseURL } from '../constants/index.mjs';

export class TrainingsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = `${baseURL}/masterclass/formations`;

        this.selectors = {
            trainingCard: 'text="Introduction à API Platform"'
        }
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async gotoTrainingPage() {
        await this.goto();
        await this.page.locator(this.selectors.trainingCard).click();
    }
}
