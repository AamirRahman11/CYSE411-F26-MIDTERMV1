// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;


/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {
    try {
        const text = document.getElementById("profileInput").value;
        const profile = JSON.parse(text);
        currentProfile = profile;
        

        if (typeof profile !== 'object' || profile === null) { //checking type of profile
            return null;
        }
        if (!Array.isArray(profile.notifications)) { //checking array
            return null;
        }
        for (let i = 0; i < profile.notifications.length; i++) { //checking each notfication
            if (typeof profile.notifications[i] !== 'string') {
            return null;
            }
        }
        currentProfile = profile.replace(/[^a-zA-Z0-9_-]/g, "");
        
    } catch (e) {
        console.error("Invalid profile format:", {e}, e); //extra exe 3
    }
    renderProfile(profile); 
}
    
    



/* -------------------------
   Render Profile
-------------------------- */

function renderProfile(profile) { //you don't wanna use innerHTML as said in extra exe 1 you want to use textContent instead

    document.getElementById("username").textContent = profile.username;

    const list = document.getElementById("notifications");
    list.textContent = ""; //clears noti list

    for (let n of profile.notifications) { //n is msg from extra exe 1

        const li = document.createElement("li");
        li.textContent = n;
        //li.innerHTML = n; //don't wanna use innerHTML because it can be a vulnerability

        list.appendChild(li);
    }
}


/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    try {
    if (currentProfile != null && typeof currentProfile === 'object') {

        localStorage.setItem("profile", JSON.stringify(currentProfile));

        alert("Session saved");
    }
    } catch (e) {
    console.error('Could not save session: ', {e}, e) //extra exe 3
    }
}


function loadSession() {
    try {
        const stored = localStorage.getItem("profile");

        if (stored) {

            const profile = JSON.parse(stored); //checking the data types when pulling the profile in line with the rubric
            if (typeof profile === 'object' && profile !== null 
                && typeof profile.username === 'string' && Array.isArray(profile.notifications)) { //very similar to homework
                currentProfile = profile;
                renderProfile(profile);
                
        } else {
            console.error("No session was found");
        }
    }
    } catch (e) {
        console.error('Could not load session: ', {e}, e) //extra exe 3
    }
}
