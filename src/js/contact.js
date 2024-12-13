document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('spinner').style.display = 'block';

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    };

    try {
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        document.getElementById('spinner').style.display = 'none';
        if (response.ok) {
            document.getElementById('responseMessage').textContent =
                "Thanks for reaching out. We'll get back to you soon!";
            document.getElementById('responseMessage').style.display = 'block';
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        document.getElementById('responseMessage').textContent =
            'There was an error sending your message. Please try again.';
        document.getElementById('responseMessage').style.display = 'block';
    }
});
