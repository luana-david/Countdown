var calcDate = new Date();

$('input#date').change(event => {
    calcDate = new Date(event.target.value)
    setInterval(() => {
        const daysLeft = Math.floor(Math.abs((calcDate - new Date()))/(1000 * 60 *60 *24))
        const hoursLeft = Math.floor((23 - new Date().getHours()))
        const minutesLeft = Math.floor((59 - new Date().getMinutes()))
        const secondsLeft = Math.floor((59 - new Date().getSeconds()))
        const render = daysLeft + ' ' + hoursLeft + ' ' + minutesLeft + ' ' + secondsLeft
        $("#result").text(render)
    }, 1000)
})

function animation() {
    var el ='Countdown!'
    var elSplit = el.split('')
    var delay = 100
    for(var i=0; i<elSplit.length;i++) {
        var letter = elSplit[i]
        $("#animated").append('<span style="animation-delay:' +delay+'ms;">'+letter+'</span>')
        delay+=100
    }
}

var currentYear = new Date().getFullYear()
var currentMonth = new Date().getMonth()
var daysInCurrentMonth =  new Date(currentYear, currentMonth+1, 0).getDate()
var firstDay = new Date(currentYear, currentMonth, 1).getDay()
var lastDay = new Date(currentYear, currentMonth, daysInCurrentMonth).getDay()

var lastMonth = currentMonth-1
var daysLastMonth = new Date(currentYear, lastMonth+1, 0).getDate()

var Months = ['January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December']

$("#currentMonth").text(Months[currentMonth])

for(var i=0; i<daysInCurrentMonth; i++) {
    var count = i+1
    $(".days").append('<div id="day">' + count + '</div>')
}

for(let i=firstDay-1;i>0;i--) {
    $("<div></div>").insertBefore("#day")
}

for(let i=lastDay; i<7;i++) {
    $(".days").append("<div></div>")
}

console.log(firstDay)

$(document).on('load', animation())
