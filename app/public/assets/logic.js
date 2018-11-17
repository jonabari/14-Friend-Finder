function validateForm() {

    let isValid = true

    $('.form-control').each(function () {
        if ($(this).val() === '') {
            isValid = false
        }
    })
    $('.chosen-select').each(function () {

        if ($(this).val() === '') {
            isValid = false
        }
    })
    getData(isValid)
}

function getData(isValid) {

    let userData = {}

    if (isValid) {
        userData = {
            name: $('#name').val(),
            photo: $('#photo').val(),
            scores: [
                $('#q1').val(),
                $('#q2').val(),
                $('#q3').val(),
                $('#q4').val(),
                $('#q5').val(),
                $('#q6').val(),
                $('#q7').val(),
                $('#q8').val(),
                $('#q9').val(),
                $('#q10').val()
            ]
        }
        $.get('/api/friends', function (friendsData) {
            compareScores(userData, friendsData)
        })
    } else {
        swal({
            title: 'Error!',
            text: 'Please fill out all fields before submitting!',
            type: 'error',
            confirmButtonText: 'Got it!'
        })
    }
}

function compareScores(userData, friendsData) {

    let userScores = userData.scores
    let friendScores = friendsData.map(f => f.scores)

    let compareArray = []

    friendScores.forEach(f => {

        var difference
        let totalDifference = []
        let i = 0

        f.forEach(s => {
            difference = Math.abs(s - userScores[i])
            totalDifference.push(difference)
            i++
        })
        compareArray.push(totalDifference.reduce((x, y) => x + y))
    })

    let match = Math.min.apply(null, compareArray)
    var matchIndex
    let i = 0

    compareArray.forEach(m => {
        if (match === m) {
            matchIndex = i
            i++
        } else i++
    })

    let friendMatch = friendsData[matchIndex]
    swal({
        title: `You matched with ${friendMatch.name}!`,
        imageUrl: friendMatch.photo,
        imageHeight: 200,
        imageAlt: 'Error: failed to load img'
    })
    $('.form-control').val('')
    $('.chosen-select').each(function () { this.selectedIndex = 0 })

    postUserToFriends(userData)
}

function postUserToFriends(userData) {
    let currentURL = window.location.origin;
    $.post(`${currentURL}/api/friends`, userData)
}

$('#submit').on('click', function (event) {
    event.preventDefault()
    validateForm()
})