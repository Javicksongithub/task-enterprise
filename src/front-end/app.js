/* eslint-disable no-unused-vars */
const API_URL = 'http://localhost:8081/api/tasks';

let allTasks = [];

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

const totalTasksEl = document.getElementById('total-tasks');
const pendingTasksEl = document.getElementById('pending-tasks');
const completedTasksEl = document.getElementById('completed-tasks');

const loginScreen = document.getElementById('login-screen');
const appContent = document.getElementById('app-content');
const loginForm = document.getElementById('login-form');

function checkAuth() {
    const isLogged = localStorage.getItem('taskEnterprise_logged');
    if (isLogged === 'true') {
        loginScreen.style.display = 'none';
        appContent.style.display = 'block';

        const savedEmail = localStorage.getItem('taskEnterprise_user') || 'Usuário';
        const userNameElement = document.querySelector('.user-info .name');
        if (userNameElement) {
            const simpleName = savedEmail.split('@')[0];
            userNameElement.textContent = simpleName.charAt(0).toUpperCase() + simpleName.slice(1);
        }

        fetchTasks();
    } else {
        loginScreen.style.display = 'flex';
        appContent.style.display = 'none';
    }
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        localStorage.setItem('taskEnterprise_logged', 'true');
        localStorage.setItem('taskEnterprise_user', email);
        checkAuth();
    }
});

function logout() {
    localStorage.removeItem('taskEnterprise_logged');
    localStorage.removeItem('taskEnterprise_user');
    checkAuth();
}

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        allTasks = await response.json();
        processAndRenderTasks();
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

function processAndRenderTasks() {
    let tasksToRender = [...allTasks];

    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        tasksToRender = tasksToRender.filter(task =>
            task.title.toLowerCase().includes(searchTerm) ||
            (task.description && task.description.toLowerCase().includes(searchTerm))
        );
    }

    const sortValue = sortSelect.value;
    if (sortValue === 'az') {
        tasksToRender.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'za') {
        tasksToRender.sort((a, b) => b.title.localeCompare(a.title));
    }

    const total = allTasks.length;
    const completed = allTasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalTasksEl.textContent = total;
    pendingTasksEl.textContent = pending;
    completedTasksEl.textContent = completed;

    renderTasks(tasksToRender);
}

function renderTasks(tasks) {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1; text-align: center;">Nenhuma tarefa encontrada.</p>';
        return;
    }

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;

        taskDiv.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description || 'Sem descrição'}</p>
                <span class="badge ${task.completed ? 'badge-success' : 'badge-pending'}">
                    ${task.completed ? '● Concluída' : '● Pendente'}
                </span>
            </div>
            <div class="task-actions">
                <button class="btn btn-sm btn-success" onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Reabrir' : 'Concluir'}
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
        taskList.appendChild(taskDiv);
    });
}

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    try {
        const response = adoptiveFetch = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            taskForm.reset();
            fetchTasks();
        }
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
    }
});

async function toggleTask(id) {
    try {
        await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
        fetchTasks();
    } catch (error) {
        console.error('Erro ao alterar status:', error);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks();
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
    }
}

searchInput.addEventListener('input', processAndRenderTasks);
sortSelect.addEventListener('change', processAndRenderTasks);

checkAuth();