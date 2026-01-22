let mCurrentIndex = 0
let mImages = []
const mUrl = 'images.json'
const mWaitTime = 5000
let mTimer = null

$(document).ready(() => {
  $('.details').hide()

  startTimer()

  $('.moreIndicator').on('click', function () {
    $(this).toggleClass('rot90 rot270')
    $('.details').slideToggle()
  })

  $('#nextPhoto').on('click', showNextPhoto)
  $('#prevPhoto').on('click', showPrevPhoto)

  fetchJSON()
})

// Load JSON data
function fetchJSON () {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images
      swapPhoto()
    },
    error: function () {
      alert('Could not load images.json')
    }
  })
}

// Display current image
function swapPhoto () {
  const img = mImages[mCurrentIndex]

  $('#photo').attr('src', img.imgPath)
  $('.location').text('Location: ' + img.imgLocation)
  $('.description').text('Description: ' + img.description)
  $('.date').text('Date: ' + img.date)
}

// Next photo
function showNextPhoto () {
  mCurrentIndex++
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0
  }
  swapPhoto()
}

// Previous photo
function showPrevPhoto () {
  mCurrentIndex--
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1
  }
  swapPhoto()
}

// Automatic slideshow
function startTimer () {
  if (mTimer !== null) {
    clearInterval(mTimer)
  }

  mTimer = setInterval(showNextPhoto, mWaitTime)
}