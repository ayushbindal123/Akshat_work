document.getElementById('submitBtn').addEventListener('click', function() {
        console.log('Submit button clicked');

        const name = document.getElementById('fname').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;

        const formData = { name, age, email, contact };
        console.log('Form data:', formData);

        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            console.log('Fetch response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Show modal with form data
            showModal(formData);
        })
        .catch((error) => {
            console.error('Error:', error);
            // Show modal with error message
            showModal({ name: 'Error', age: '', email: '', contact: 'Error submitting form' });
        });
    });

    function showModal(formData) {
        const message = `Name: ${formData.name}\nAge: ${formData.age}\nEmail: ${formData.email}\nContact: ${formData.contact}`;
        console.log('Showing modal with message:', message);
        const modalMessageElement = document.getElementById('modalMessage');
        console.log('Modal message element:', modalMessageElement);
        modalMessageElement.innerText = message;
        document.getElementById('myModal').style.display = "block";
    }

    // Get the modal
    var modal = document.getElementById('myModal');
    console.log('Modal:', modal);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];
    console.log('Close button:', span);

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
;
