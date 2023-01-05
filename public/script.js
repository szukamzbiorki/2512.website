let titlebox = document.querySelector(".title");
let show = document.querySelector(".show");
let submissionsWrapper = document.querySelector(".submissions-wrapper");

const API_URL = 'http://localhost:3000/submissions';

let form = document.querySelector(".submission-form");

showSubmissions();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const name = formData.get('name');
    const content = formData.get('content');

    const submission = {
        title,
        name,
        content
    }

    console.log(submission);

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(submission),
        headers:{
            'content-type':'application/json'
        }
    }).then(response => response.json())
    .then(created => {
        form.reset();
        showSubmissions();
    });
})

function showSubmissions(){
    fetch(API_URL)
        .then(response => response.json())
        .then(submissions =>{
            submissionsWrapper.innerHTML = ' <p>NEXT ISSUE SUBMISSIONS</p>';
            submissions.reverse();
            submissions.forEach(submissionData => {
                const submission = document.createElement("div");
                const submissionTitle = document.createElement("div");
                const submissionName = document.createElement("div");
                const submissionContent = document.createElement("div");
                const submissionDate = document.createElement("div");

                submission.classList.add("submission");
                submissionTitle.classList.add("submission-title");
                submissionName.classList.add("submission-name");
                submissionContent.classList.add("submission-content");
                submissionDate.classList.add("submission-date");

                submissionTitle.textContent = submissionData.title;
                submissionName.textContent = submissionData.name;
                submissionContent.textContent = submissionData.content;
                submissionDate.textContent = new Date(submissionData.created);

                submission.appendChild(submissionTitle);
                submission.appendChild(submissionName);
                submission.appendChild(submissionContent);
                submission.appendChild(submissionDate);

                submissionsWrapper.appendChild(submission);
            })
        });
}