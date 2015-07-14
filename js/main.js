


$(function(){

var User = {
	handle: '@bradwestfall',
	img: 'brad.png'
}


var stringTweet = $('#template-tweet').html()
var templateTweet = Handlebars.compile(stringTweet)

var stringThread = $('#template-thread').html()
var templateThread = Handlebars.compile(stringThread)

var stringCompose = $('#template-compose').html()
var templateCompose = Handlebars.compile(stringCompose)

$.ajax({
  url: 'http://localhost:3000/users',
  dataType: 'json',
}).then(function renderTweet(User, message) {

	return templateTweet({
		img: User.img,
		handle: User.handle,
		message: message
	})

}

function renderThread(User, message) {
	return templateThread({
		tweet: renderTweet(User, message),
		compose: renderCompose()
	})
	
}

function renderCompose() {
	return templateCompose()

}

$('main').on('click', 'textarea', function() {
	$(this).parent().addClass('expand')
})

$('.tweets').on('click', '.tweet', function() {
	$(this).parent().toggleClass('expand')
})

$('main').on('submit', 'form', function(e) {
    e.preventDefault()
    var message = $(this).find('textarea').val()
    if ($(this).parent().hasClass('replies')) {
        $(this).parent().append(renderTweet(User, message))
    } else {
        $(this).parent().append(renderThread(User, message))
        
    }
    $(this).find('textarea').val('')
    $(this).removeClass('expand')
})

})

