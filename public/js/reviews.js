document.addEventListener("DOMContentLoaded", function() {
  const addReviewButton = document.getElementById('add-review-button');
  const boxContainer = document.querySelector('.box-container');
  let currentRating = 0;
  addReviewButton.addEventListener('click', function() {
    // Create elements for the new review
    const newReview = document.createElement('div');
    newReview.className = 'box';

    // Mock data for the new review (replace with actual user input or dynamic data)
    const avatarUrl = 'path_to_avatar.jpg'; // Replace with actual avatar URL
    const username = 'New User'; // Replace with actual username
    const starRating = 0; // Replace with actual star rating
    const reviewComment = ''; // Replace with actual review comment

    // Construct the HTML for the new review
    newReview.innerHTML = `
      <div class="box-top">
        <div class="profile-info">
          <div class="left-part">
            <img src="${avatarUrl}" alt="Avatar" class="avatar">
            <p class="username">${username}</p>
          </div>
          <div class="rating">
            <!-- Render stars based on rating -->
            ${renderStars(starRating)}
          </div>
        </div>
      </div>
      <div class="review-text">
        <textarea class="review-input" rows="4" placeholder="Write your review here...">${reviewComment}</textarea>
        <button class="add-review-btn">Add Review</button>
      </div>
    `;

    // Append the new review to the box container
    boxContainer.appendChild(newReview);

    // Adjust the width of the textarea to match the box-container
    const textarea = newReview.querySelector('.review-input');
    const boxWidth = newReview.clientWidth;
    textarea.style.width = `${boxWidth * 0.9}px`; // Set textarea width to 70% of box container

    // Add event listeners to stars for hover and click
    const stars = newReview.querySelectorAll('.star');
    const isClickedArray = new Array(5).fill(false);
    let isStarClicked = false;
    stars.forEach((star, index) => {
      star.addEventListener('mouseover', function() {
        if (!isStarClicked) {
        for (let i = 0; i <= index; i++) {
          stars[i].classList.add('fas');
          stars[i].classList.remove('far');
        }
        for (let i = index + 1; i < stars.length; i++) {
          stars[i].classList.remove('fas');
          stars[i].classList.add('far');
        }
      
    }
      });

      star.addEventListener('click', function() {
        isStarClicked = true;
        currentRating = index + 1;
        renderStars(currentRating); // Update star rating based on click
      
        // Update all stars visually
        stars.forEach((star, i) => {
          if (i <= index) {
            star.classList.add('fas');
            star.classList.remove('far');
          } else {
            star.classList.remove('fas');
            star.classList.add('far');
          }
        });
      });
    });
  });

  // Function to render star icons based on rating
  function renderStars(count) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < count) {
        stars += '<i class="star fas fa-star"></i>';
      } else {
        stars += '<i class="star far fa-star"></i>';
      }
    }
    return stars;
  }
});