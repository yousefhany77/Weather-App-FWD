const average = (array) => array.reduce((a, b) => a + b) / array.length;

let bar = document.querySelectorAll(".bar");
bar.forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.classList.add("active");
    let amount = document.createElement("div");
    amount.classList.add("after");
    let title = document.createElement("h1");
    amount.appendChild(title);
    element.appendChild(amount);
    element.addEventListener(
      "mouseout",
      () => {
        amount.remove();
        element.classList.remove("active");

      }
    );
    day = element.getAttribute("data-day");
    day = day -1; //
    fetch('data.json')
    .then(data => data.json())
    .then(response => {
        title.textContent = `$${response[day].amount}`;
    })
  });
});

function adjustBars (bar,day) {
    let values = []
    fetch('data.json')
    .then(data => data.json())
    .then(response => {
        for(let i = 0; i < response.length; i++) {
            values.push(response[i].amount);
        }
        let avg = average(values);
           bar.style.height = `${response[day].amount / avg * 8.6}rem`
        let totalMonthSpending = document.getElementById("totalMonthSpending").textContent =`$${values.reduce((a, b) => a + b)} `
        lastmonthSpeending = (values.reduce((a, b) => a + b) -  1000 ) /100
        let lastmonthPercentage = document.getElementById("lastmonthPercentage")
        lastmonthPercentage.textContent = `%${lastmonthSpeending}`
        if (lastmonthSpeending > 0) {
           lastmonthPercentage.style.color = "var(--Cyan)"   

        }
        else{
           lastmonthPercentage.style.color = "var(--Soft-red)"   
        }

// 0 10 30 50  70 100 500 
    })
}

bar.forEach(function (bar) {
    day = bar.getAttribute("data-day") - 1;
    adjustBars(bar, day);
});

