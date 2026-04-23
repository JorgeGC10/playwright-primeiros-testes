import { expect, test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TaskPage } from './pages/tasks/index'
import data from './fixtures/tasks.json'


test('deve ser possível criar uma nova tarefa', async ({ page, request }) => {
    
    const task = data.sucess as TaskModel
    const taskPage = new TaskPage(page)
    await deleteTaskByHelper(request, task.name)

    await taskPage.go()
    await taskPage.create(task)
    await taskPage.shouldHaveText(task.name)
})


test('tarefa duplicada', async ({ page, request }) => {

    const task = data.duplicate as TaskModel

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    const taskPage = new TaskPage(page)

    await taskPage.go()
    await taskPage.create(task)
    await taskPage.alertHaveText('Task already exists!')


})

test('campo obrigatorio', async ({ page }) => {
   
    const task = data.required as TaskModel

    const taskPage: TaskPage  = new TaskPage(page)
    await taskPage.go()
    await taskPage.create(task)

    const validationMessage = await taskPage.getValidationMessage()
    expect(validationMessage).toEqual('This is a required field')

})





