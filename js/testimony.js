function displayTestimonials() {
    const testimonialsContainer = document.querySelector(".review-lista");

    fetch('mocks/testimonials.json')
        .then(response => response.json())
        .then(testimonials => {
            testimonials.forEach(testimonial => {
                const quoteReview = document.createElement("li");
                quoteReview.classList.add("quote-review");

                const quoteTitle = document.createElement("div");
                quoteTitle.classList.add("quote-title");

                const testimonyTitulo = document.createElement("h4");
                const quoteStar = document.createElement("div");
                quoteStar.classList.add("quote-star");
                testimonyTitulo.innerHTML = testimonial.title;
                quoteStar.innerHTML = testimonial.star;

                const quoteAuthor = document.createElement("div");
                quoteAuthor.classList.add("quote-author");
                quoteAuthor.innerHTML = testimonial.author;

                const linkInstagram = document.createElement("a");
                linkInstagram.target = "_blank";
                linkInstagram.href = `https://www.instagram.com/${testimonial.instagram}`;
                const divInstagram = document.createElement("div");
                divInstagram.classList.add("quote-date");
                divInstagram.textContent = `@${testimonial.instagram}`;
                linkInstagram.appendChild(divInstagram);

                const quoteText = document.createElement("div");
                quoteText.classList.add("quote-text");

                const quoteP = document.createElement("p");
                quoteP.textContent = testimonial.text;

                quoteText.appendChild(quoteP);

                quoteTitle.appendChild(testimonyTitulo);
                quoteTitle.appendChild(quoteStar);
                quoteTitle.appendChild(quoteAuthor);
                quoteTitle.appendChild(linkInstagram);

                quoteReview.appendChild(quoteTitle);
                quoteReview.appendChild(quoteText);

                testimonialsContainer.appendChild(quoteReview);
            });
        })
        .catch(error => {
            console.error("Error al cargar testimonios:", error);
        });
}

window.addEventListener("load", displayTestimonials);
