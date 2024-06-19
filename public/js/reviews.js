function AddReviewBox() {
  // Retrieve dynamic values from data attributes
  const addReviewButton = document.getElementById('add-review-button');
  const username = addReviewButton.getAttribute('data-username');
  const avatar = addReviewButton.getAttribute('data-avatar');

  // Check if a review box already exists
  if (document.querySelector('.new-review-box')) {
    return; // Exit the function if a review box already exists
  }

  // Create elements
  const boxContainer = document.querySelector('.box-container');
  const newReviewBox = document.createElement('div');
  newReviewBox.classList.add('box', 'new-review-box'); // Add a class to identify the new review box

  // Avatar and username
  const profileInfo = document.createElement('div');
  profileInfo.classList.add('profile-info');
  
  const leftPart = document.createElement('div');
  leftPart.classList.add('left-part');
  
  const avatarImg = document.createElement('img');
  avatarImg.src = avatar; // Use dynamic avatar URL
  avatarImg.alt = 'Avatar';
  avatarImg.classList.add('avatar');
  
  const usernameElem = document.createElement('p');
  usernameElem.classList.add('username');
  usernameElem.textContent = username; // Use dynamic username
  
  leftPart.appendChild(avatarImg);
  leftPart.appendChild(usernameElem);
  profileInfo.appendChild(leftPart);
  
  // Rating stars (Initially without color, change on hover)
  const ratingWrapper = document.createElement('div'); // Wrapper for rating and error message
  ratingWrapper.classList.add('rating-wrapper');
  
  const rating = document.createElement('div');
  rating.classList.add('rating');
  rating.innerHTML = renderStars(0); // Initialize with unfilled stars
  
  ratingWrapper.appendChild(rating);
  profileInfo.appendChild(ratingWrapper);
  
  // Review text textarea and Add Review button
  const reviewText = document.createElement('div');
  reviewText.classList.add('review-text');
  
  const textarea = document.createElement('textarea');
  textarea.setAttribute('placeholder', 'Write your review here...');
  textarea.setAttribute('rows', '4');
  reviewText.appendChild(textarea);
  
  const addReviewBtn = document.createElement('button');
  addReviewBtn.textContent = 'Add Review';
  addReviewBtn.classList.add('add-review-btn');
  reviewText.appendChild(addReviewBtn);
  
  // Append all parts to new review box
  newReviewBox.appendChild(profileInfo);
  newReviewBox.appendChild(reviewText);
  
  // Append new review box at the end of box-container
  boxContainer.appendChild(newReviewBox);

  // Add star rating functionality
  const stars = newReviewBox.querySelectorAll('.star');
  let isStarClicked = false;
  let currentRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener('mouseover', function() {
      if (!isStarClicked) {
        highlightStars(stars, index + 1);
      }
    });

    star.addEventListener('mouseout', function() {
      if (!isStarClicked) {
        highlightStars(stars, 0);
      }
    });

    star.addEventListener('click', function() {
      isStarClicked = true;
      currentRating = index + 1;
      highlightStars(stars, currentRating);
    });
  });

  // Add review button click event
  addReviewBtn.addEventListener('click', function() {
    // Remove existing error messages
    const existingErrors = newReviewBox.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());

    let hasError = false;

    // Check if textarea is empty
    if (textarea.value.trim() === '') {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'You have to fill this part';
      errorMessage.classList.add('error-message');
      textarea.after(errorMessage);
      hasError = true;
    }

    // Check if stars are filled
    if (currentRating === 0) {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'You have to fill this part';
      errorMessage.classList.add('error-message');
      ratingWrapper.appendChild(errorMessage);
      hasError = true;
    }

    // If no errors, proceed with submitting the review
    if (!hasError) {
      const reviewData = {
        username,
        avatar,
        rate: currentRating,
        comment: textarea.value,
        created_at: new Date().toISOString()
      };

      // Make an AJAX request to submit the review
      fetch('/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Something went wrong');
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          console.log('Review submitted successfully:', data);
      
          // Create a new review box to append to the screen
          const newReviewElement = document.createElement('div');
          newReviewElement.classList.add('box');
      
          const profileInfo = document.createElement('div');
          profileInfo.classList.add('profile-info');
          
          const leftPart = document.createElement('div');
          leftPart.classList.add('left-part');
          
          const avatarImg = document.createElement('img');
          avatarImg.src = avatar; 
          avatarImg.alt = 'Avatar';
          avatarImg.classList.add('avatar');
          
          const usernameElem = document.createElement('p');
          usernameElem.classList.add('username');
          usernameElem.textContent = username; 
          
          leftPart.appendChild(avatarImg);
          leftPart.appendChild(usernameElem);
          profileInfo.appendChild(leftPart);
          
          const ratingWrapper = document.createElement('div');
          ratingWrapper.classList.add('rating-wrapper');
          
          const rating = document.createElement('div');
          rating.classList.add('rating');
          rating.innerHTML = renderStars(currentRating); 
          
          ratingWrapper.appendChild(rating);
          profileInfo.appendChild(ratingWrapper);
          
          const reviewText = document.createElement('div');
          reviewText.classList.add('review-text');
          
          const reviewContent = document.createElement('p');
          reviewContent.textContent = textarea.value;
          reviewText.appendChild(reviewContent);
          
          newReviewElement.appendChild(profileInfo);
          newReviewElement.appendChild(reviewText);
          
          boxContainer.appendChild(newReviewElement);
      
          // Remove the new review box
          newReviewBox.remove();
        } else {
          console.error('Error submitting review:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  });
}

// Function to highlight stars based on hover or click
function highlightStars(stars, count) {
  stars.forEach((star, index) => {
    if (index < count) {
      star.classList.add('fas');
      star.classList.remove('far');
    } else {
      star.classList.remove('fas');
      star.classList.add('far');
    }
  });
}

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
