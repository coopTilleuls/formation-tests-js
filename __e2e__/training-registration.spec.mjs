import {expect, test} from '@playwright/test';
import {Homepage} from './models/Homepage.mjs';
import {TrainingsPage} from './models/TrainingsPage.mjs';
import {TrainingPage} from './models/TrainingPage.mjs';

test.describe('trainings', () => {


    test('should allow navigation to trainings page', async ({page}) => {
        const homepage = new Homepage(page);
        const trainingsPage = new TrainingsPage(page);

        await homepage.gotoTrainingsPage();

        await expect(page).toHaveURL(trainingsPage.url);
    });

    test('should allow navigation to training page', async ({page}) => {
        const trainingsPage = new TrainingsPage(page);
        const trainingPage = new TrainingPage(page);

        await trainingsPage.gotoTrainingPage();

        await expect(page).toHaveURL(trainingPage.url);
    });

    test('should display infos about training page', async ({page}) => {
        const trainingPage = new TrainingPage(page);

        await trainingPage.goto();

        await expect(page.locator(trainingPage.selectors.content))
            .toContainText([
                'Objectifs pédagogiques',
                'Pré-requis',
                'Programme',
                'Financement',
            ]);
    });

    test('should alert on errors about training session subscription', async ({page}) => {
        const trainingPage = new TrainingPage(page);

        await trainingPage.gotoRegisterPage();
        await trainingPage.fillForm(false, true);

        const requiredFieldsCount = await page.locator(trainingPage.selectors.requiredFields).count();
        expect(requiredFieldsCount).toBe(6);
    });

    test('should allow right info on training session subscription', async ({page}) => {
        const trainingPage = new TrainingPage(page);

        await trainingPage.gotoRegisterPage();
        await trainingPage.fillForm(true, false);
    });

});
