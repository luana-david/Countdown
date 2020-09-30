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

for(var i=0; i<daysInCurrentMonth; i++) {
    var count = i+1
    $(".days").append("<div>" + count + "</div>")
}

$(document).on('load', animation())
