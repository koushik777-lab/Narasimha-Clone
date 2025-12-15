document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.contact-form form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                // Add hidden config fields if not present in HTML
                if (!data._captcha) data._captcha = "false";
                if (!data._template) data._template = "table";

                // Add auto-response message
                data._autoresponse = "Thank you for your enquiry. Our team will connect with you very soon..";

                const response = await fetch("https://formsubmit.co/ajax/Pramodshetti22@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.\n');
                    form.reset();
                } else {
                    alert('Oops! Something went wrong. Please try again later.');
                    console.error('FormSubmit Error:', result);
                }
            } catch (error) {
                alert('Connection error. Please check your internet connection and try again.');
                console.error('Network Error:', error);
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    });
});
