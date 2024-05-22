document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const editForm = document.getElementById('edit-form');
    const username = document.getElementById('username');
    const newUsernameInput = document.getElementById('new-username');
    const profilePicUpload = document.getElementById('profile-pic-upload');
    const profilePic = document.getElementById('profile-pic');

    editButton.addEventListener('click', () => {
        editForm.style.display = 'block';
    });

    saveButton.addEventListener('click', async () => {
        const newUsername = newUsernameInput.value;
        if (newUsername) {
            const response = await fetch('/update-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: newUsername })
            });
            if (response.ok) {
                username.textContent = newUsername;
                editForm.style.display = 'none';
            }
        }
    });

    profilePicUpload.addEventListener('change', async () => {
        const file = profilePicUpload.files[0];
        const formData = new FormData();
        formData.append('profilePic', file);

        const response = await fetch('/upload-profile-pic', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            profilePic.src = data.profilePicUrl;
        }
    });

    // Fetch user data on page load
    async function fetchUserData() {
        const response = await fetch('/get-user-data');
        if (response.ok) {
            const data = await response.json();
            username.textContent = data.username;
            if (data.profilePicUrl) {
                profilePic.src = data.profilePicUrl;
            }
        }
    }

    fetchUserData();
});
