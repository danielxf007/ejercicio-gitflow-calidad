const students = LISTA_ESTUDIANTES;
renderStudents();

async function renderStudents() {
    const studentsData = await getStudetsData();
    const studentsTemplates = studentsData.map(student => createStudentTemplate(student));
    const studentsContainer = document.querySelector('.students');
    studentsTemplates.forEach(student => {
        studentsContainer.innerHTML += student;
    });
}

async function getStudetsData() {
    const requests = students.map(student => fetch(`https://api.github.com/users/${student.github}`));
    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map(res => res.json()));
    const githubUsers = data.map(user => ({
        username: user.login,
        avatar: user.avatar_url,
        userProfile: user.html_url
    }));
    return students.map(student => {
        const user = githubUsers.find(user => user.username === student.github);
        return { ...user, ...student };
    });
}

function createStudentTemplate({ nombre, sede, page, username, avatar, userProfile }) {
    return `<article class="student">
        <img class="student__github__image" src="${avatar}" />
         <a class="student__name" target="_blank" href="${page}">${nombre}</a>
         <p class="student__campus">${sede}</p>
         <a class="student__github__url" target="_blank" href="${userProfile}">
         <i class="fa fa-github"></i>${username}</a>
     </article>`
}
