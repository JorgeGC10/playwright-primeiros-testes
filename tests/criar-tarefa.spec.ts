import { test, expect } from '@playwright/test';

test('deve ser possível criar uma nova tarefa', async ({ page, request }) => {
    
    const taskName = 'Ler um livro de TypeScript';

    // Limpeza antes do teste (boa prática)
    await request.delete(`http://localhost:3333/helper/tasks/${taskName}`);

    await page.goto('http://localhost:8080');

    // Preenche o campo de nova tarefa
    const inputTask = page.getByPlaceholder('Nova tarefa...');
    await inputTask.fill(taskName);

    // Clica no botão Create
    await page.getByRole('button', { name: 'Create' }).click();

    // Valida que a tarefa apareceu
    const taskItem = page.getByTestId('task-item').filter({ hasText: taskName });
    
    await expect(taskItem).toBeVisible();
    await expect(taskItem).toHaveText(taskName);
});
