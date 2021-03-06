var calcDate = new Date();

//Set animation header

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

//Add slide-toggle animation to calendar on the click of the button

$(".btn").on('click', function() {
    $(".calendar").slideToggle(300)
})

//Set variables to create calendar

var date = new Date()
var currentYear = new Date().getFullYear()
var currentMonth = new Date().getMonth()
var daysInCurrentMonth 
var firstDay 
var lastDay 

var lastMonth 
var daysLastMonth

//Function to create calendar : selected month, year, day, change months on click of a button

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

    if(month === 0) {
        lastMonth = 11
    } else {
        lastMonth = month-1
    }
    
    daysLastMonth = new Date(year, lastMonth+1, 0).getDate()

    $("#currentMonth").text(Months[currentMonth])
    $("#currentYear").text(year)

    $(".calendar-header").css('background-color', colors[month])
    $(".tooltip").css("border-bottom", '10px solid '+ colors[month])

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
    
    if(currentMonth<11) {
        $(".next").text(Months[currentMonth+1].slice(0, 3))
    } else {
        $(".next").text(Months[0].slice(0, 3))
    }
    
    $(".prev").text(Months[lastMonth].slice(0, 3))

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


//Colors for each month
var colors = ['rgb(159, 146, 225)', 'rgb(146, 186, 225)', 'rgb(164, 244, 221 )', 'rgb(164, 244, 181 )', 'rgb(194, 244, 164)', 'rgb(242, 253, 159)', 'rgb(246, 255, 110 )', 'rgb(255, 226, 110)', 'rgb(255, 180, 110 )', 'rgb(236, 142, 116)', 'rgb(218, 116, 154)', 'rgb(212, 146, 225)']

//Change month when clicking on next/prev month

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

//Start countdown when selecting a day

var intervalId = null
$(".days").on('click', '#day' , function() {
    calcDate = new Date(currentYear, currentMonth, $(this).text())
    $(this).parent().children("#day").removeClass("selectedDay")
    $(this).addClass("selectedDay")
    $(".selectedDateInfo").text('Until '+ $(this).text() + ' ' + Months[currentMonth] + ' ' + currentYear)
    $(".confetti").text('')
    clearInterval(intervalId)
    if(calcDate < new Date()) {

        //If date is in prezent or in the past, a confetti animation apears
        var confettiNumber = 50
        for(var i=0;i<confettiNumber;i++) {
            $(".confetti").append('<div class="individual-confetti" style="transform: translate3d('+ Math.random()*1000 +'px,'+ Math.random()*200 + 'px, 0); background-color: hsl('+ Math.floor(Math.random()*359) +',100%, 50%)"></div>')
        }
        $("#daysLeft").text('0')
        $("#hoursLeft").text('0')
        $("#minutesLeft").text('0')
        $("#secondsLeft").text('0')
        $(".info").slideDown()
    } else {
        intervalId = setInterval(() => {
            const daysLeft = Math.floor(Math.abs((calcDate - new Date()))/(1000 * 60 *60 *24))
            const hoursLeft = Math.floor((23 - new Date().getHours()))
            const minutesLeft = Math.floor((59 - new Date().getMinutes()))
            const secondsLeft = Math.floor((59 - new Date().getSeconds()))
            $("#daysLeft").text(daysLeft)
            $("#hoursLeft").text(hoursLeft)
            $("#minutesLeft").text(minutesLeft)
            $("#secondsLeft").text(secondsLeft)
            $(".info").slideDown()
            console.log('i am here');
        }, 1000)
    }
})

$(document).on('load', animation())
$(document).on('load', $(".info").hide())
$(document).on('load', monthCalc(new Date().getMonth(), currentYear))
