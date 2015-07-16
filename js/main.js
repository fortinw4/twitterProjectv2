$(function(){

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

///

// var getPosts = $.get('http://jsonplaceholder.typicode.com/posts')
// 	.done(function (posts) {
// 		console.log('got some posts', posts)
// 	})
	
// 	getPosts.done(function () {
// 		console.log('done again', posts)
// })

// }, 2000)





// var newPost = $.get('http://jsonplaceholder.typicode.com/posts')

// newPost.done(function() {
// 	console.log('new post!')
// })

// newPost.done(function() {
// 	console.log('another new post!')
// })