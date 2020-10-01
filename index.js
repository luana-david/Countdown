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

var date = new Date()
var currentYear = new Date().getFullYear()
var currentMonth = new Date().getMonth()
var daysInCurrentMonth 
var firstDay 
var lastDay 

var lastMonth 
var daysLastMonth

function monthCalc(month, year) {
    currentMonth = month
    currentYear = year
    daysInCurrentMonth =  new Date(currentYear, month+1, 0).getDate()
    firstDay = new Date(year, month, 1).getDay()
    if(firstDay===0) {
        firstDay=7
    }
    lastDay = new Date(year, month, daysInCurrentMonth).getDay()
    if(lastDay===0) {
        lastDay=7
    }

    lastMonth = month-1
    daysLastMonth = new Date(year, lastMonth+1, 0).getDate()

    $("#currentMonth").text(Months[currentMonth])
    $("#currentYear").text(year)

    $(".days").empty()

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
    console.log(currentMonth)
}

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

$(".next").on('click', function() {
    var nextMonth
    var nextYear
    if(currentMonth<11) {
        nextMonth = currentMonth+1
        nextYear = currentYear
    } else {
        nextMonth = 0
        nextYear = currentYear+1
    }
    
    monthCalc(nextMonth, nextYear)
})

$(".prev").on('click', function() {
    var prevMonth
    var prevYear
    if(currentMonth>0) {
        prevMonth = currentMonth-1
        prevYear = currentYear
    } else {
        prevMonth = 11
        prevYear = currentYear -1
    }

    monthCalc(prevMonth, prevYear)
})

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
$(document).on('load', monthCalc(new Date().getMonth(), currentYear))
