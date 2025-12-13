document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.contact-form form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            // e.preventDefault(); // Commented out for debugging to allow standard redirect

            // Disable AJAX handling for debugging - let the form submit normally to see FormSubmit status page
            return;

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
                if (!data._captcha) data._captcha = "false";
                if (!data._template) data._template = "table";

                // Add auto-response message
                // Note: Since this is a static site, we can't embed the image directly in the email body effectively on the free tier,
                // but we can provide a link to it or simply include the text.
                // The image link assumes the site is hosted at the domain root. 
                // We will use the deployment URL or a placeholder if unknown.
                data._autoresponse = "Thank you for your enquiry. Our team will connect with you very soon..";

                const response = await fetch("https://formsubmit.co/ajax/abirmoja743@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.');
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
