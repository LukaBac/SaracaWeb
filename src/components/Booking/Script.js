import i18next from "i18next";

export default function Script(bookings, location) {
    let all_bookings = JSON.parse(bookings)
    let data = all_bookings["C"]
    // Initializing variables
    const DATE_INPUT_1 = document.getElementById("id_start_date");
    const DATE_INPUT_2 = document.getElementById("id_end_date");
    const CALENDAR = document.querySelector(".wrapper");
    const DATE_WRAPPER = document.querySelectorAll("form .display-date");
    const CURRENT_DATE_MONTH = document.querySelector(".current-date .month #month");
    const CURRENT_DATE_YEAR = document.querySelector(".current-date .year #year");
    const CURRENT_DATE_MONTH_LABEL = document.querySelector(".current-date .month a");
    const CURRENT_DATE_YEAR_LABEL = document.querySelector(".current-date .year a");
    const LIS = document.querySelectorAll(".days li");
    const WRAPPERS = [DATE_WRAPPER[0], DATE_WRAPPER[1]];
    const ADULTS = document.getElementById("id_adults");
    const CHILDREN = document.getElementById("id_children");
    const NEXT_TWO = document.getElementById("next-two");
    const BACK_ONE = document.getElementById("back-one");
    const NEXT_THREE = document.getElementById("next-three");
    const PHASE_ONE = document.querySelector(".phase-one");
    const PHASE_TWO = document.querySelector(".phase-two");
    const PHASE_THREE = document.querySelector(".phase-three");
    const TIME = document.querySelectorAll(".time");
    const APARTMENTS = document.getElementById("id_apartment");
    let days_tag = document.querySelector(".days");
    let previous_next_icon = document.querySelectorAll(".icons svg");

    let j = 2;
    
    let is_edited = false;
    
    let next_day = [];
    let next_month = [];
    
    let active_lis = [];
    let active_elements_month = [];
    
    let last_month_active = [];
    let last_days_active = [];
    
    let multiple_months = false;
    
    let is_crossed = false;
    
    let all_crossed_dates = [];
    
    let today_is_single = false;
    
    let is_inactive = false;



    // Hide clicked overlay when active on mobile
    const overlay = document.getElementById("calendarOverlay");
    const container = document.getElementById("calendarContainer");
    overlay.addEventListener("click", (event) => {
        console.log("clicked")
        if(!container.contains(event.target)){
            container.classList.remove("opened");
            overlay.classList.remove("overlayOpened");
        }
    }); 


    // Format date to %m/%d/%Y format
    function format_date(day, month, year) {
        let formatted_month = month < 10 ? "0" + month : month;
        let formatted_day = day < 10 ? "0" + day : day;

        return formatted_month + "/" + formatted_day + "/" + year;
    }

    // Remove trailing zeros from dates
    function remove_zero(date) {
        if (typeof date !== "undefined" && date !== null && !isNaN(date)) {
            if (date[0] == 0) {
                date = date[1]
            }
        }
    }

    // Setting todays date as start date and end date values
    function set_today() {
        let last_date_of_month = new Date(current_year, current_month + 1, 0).getDate(); // Getting last date of month
    
        if (date.getDate() == last_date_of_month) {
            next_month.push(current_month+1)
            next_day.push(1)
        }
        
        let check_date = date.getDate()
        
        let list = [check_date];
        
        // Checking if todays date is already taken (crossed)
        function checking_dates(check_date) {
            let current_date = format_date(check_date, current_month+1, current_year)
            let tomorrow = format_date(check_date+1, current_month+1, current_year)
            if (all_crossed_dates.includes(current_date)) {
                check_date += 1
                checking_dates(check_date)
            }
            else {
                if (all_crossed_dates.includes(tomorrow)) {
                    today_is_single = true
                }
            }
            if (check_date != list[0] && check_date > list[0]) {
                list.splice(0, 1)
                list.push(check_date)
            }
        }
        
        checking_dates(check_date)
        
        // If current date is in crossed date
        if (today_is_single == true) {
            DATE_INPUT_1.setAttribute("value", format_date(list[0], current_month+1, current_year))
            DATE_INPUT_2.setAttribute("value", format_date(list[0], current_month+1, current_year))
        }
        else if (list != check_date) {
            DATE_INPUT_1.setAttribute("value", format_date(list[0], current_month+1, current_year))
            // If it's the last day of the month, make the end date the first day of the next month
            if (next_month.length != 0) {
                DATE_INPUT_2.setAttribute("value", format_date(1, current_month+1, current_year))
            }
            else {
                DATE_INPUT_2.setAttribute("value", format_date(list[0]+1, current_month+1, current_year))
            }
        }
        else {
            DATE_INPUT_1.setAttribute("value", format_date(date.getDate(), current_month+1, current_year))
            // If it's the last day of the month, make the end date the first day of the next month
            if (next_month.length != 0) {
                DATE_INPUT_2.setAttribute("value", format_date(1, current_month+2, current_year))
            }
            else {
                DATE_INPUT_2.setAttribute("value", format_date(date.getDate()+1, current_month+1, current_year))
            }
        }
    }

    // Close calendar if user clicks outside of it
    window.addEventListener("click", (event) => {
        if (!document.querySelector(".container").contains(event.target) && !CALENDAR.classList.contains("hidden")) {
            CALENDAR.classList.add("hidden")
            for (let i=0; i<WRAPPERS.length; i++) {
                if (WRAPPERS[i].classList.contains("border")) {
                    WRAPPERS[i].classList.remove("border")
                }
            }
        }
    })
    
    // When apartments value changes, rerender calendar with data as all_bookings["G"] or all_bookings["C"] depending on the
    // selected option
    APARTMENTS.addEventListener("change", () => {
        if (APARTMENTS.value == "Garden View") {
            data = all_bookings["G"]
            all_crossed_dates = []
            render_calendar()
        }
        else {
            data = all_bookings["C"]
            all_crossed_dates = []
            render_calendar()
        }
    })
    
    // Switch to next phase of form on next button click
    NEXT_TWO.addEventListener("click", () => {
        PHASE_ONE.classList.remove("visible");
        PHASE_TWO.classList.add("visible");
    })

    BACK_ONE.addEventListener("click", () => {
        PHASE_ONE.classList.add("visible");
        PHASE_TWO.classList.remove("visible");
    })

    NEXT_THREE.addEventListener("click", () => {
        PHASE_TWO.classList.remove("visible");
        PHASE_THREE.classList.add("visible")
    })

    // Adding options for time
    for (let j=0; j<TIME.length; j++) {
        for (let i=1; i<=24; i++) {
            let option = document.createElement("option");
            option.value = i + ":" + "00";
            option.innerHTML = i + ":" + "00";
            option.id = i + "time";
            if (j == 0 && i == 12 || j == 1 && i == 13) {
                option.selected = "selected";
            }
            TIME[j].appendChild(option);
        }
    }

    // When first time is changed, make the second time one hour greater than the first time
    TIME[0].addEventListener("change", () => {
        let hour = parseInt(TIME[0].value.split(":")[0])
        if (hour == 24) {
            TIME[1].value = 1 + ":00";
        }
        else {
            TIME[1].value = hour+1 + ":00";
        }
    })

    // Getting new date, current year and month
    let date = new Date();
    let current_year = date.getFullYear();
    let current_month = date.getMonth();
    
    const months = [i18next.t('months.january'), i18next.t('months.february'), i18next.t('months.march'), i18next.t('months.april'), i18next.t('months.may'), i18next.t('months.june'), i18next.t('months.july'),
                    i18next.t('months.august'), i18next.t('months.september'), i18next.t('months.october'), i18next.t('months.november'), i18next.t('months.december')];
    
    const years = [current_year, (current_year+1)]
    
    /* Showing and hiding calendar */
    DATE_INPUT_1.addEventListener("click", () => {
        j = 2
        if (DATE_WRAPPER[1].classList.contains("border")) {
            DATE_WRAPPER[1].classList.remove("border")
        }
        DATE_WRAPPER[0].classList.add("border")
        if (CALENDAR.classList.contains("hidden")) {
            CALENDAR.classList.remove("hidden")
        }
        // If calendar is edited (the active dates aren't the current dates)
        if (is_edited) {
            LIS.forEach(li => {
                let start_value = parseInt(DATE_INPUT_1.value.split("/")[1])
                remove_zero(start_value)
                // Remove previous active, inactive, first and last elements (let user select a new start date)
                if (parseInt(li.innerHTML) < start_value) {
                    // If li element is inactive and is not before the current date
                    if (li.classList.contains("inactive") && 
                    (!(li.innerHTML < date.getDate() && current_month === new Date().getMonth() && current_year === new Date().getFullYear() ||
                    current_month < new Date().getMonth() && current_year === new Date().getFullYear() ||
                    current_year < new Date().getFullYear()))) {
                        li.classList.remove("inactive")
                    }
                    if (li.classList.contains("selected")) {
                        li.classList.remove("selected")
                    }
                    if (li.classList.contains("first")) {
                        li.classList.remove("first")
                    }
                    if (li.classList.contains("last")) {
                        li.classList.remove("last")
                    }
                }
            }) 
        }
        let start_month = parseInt(DATE_INPUT_1.value.split("/")[0])
        remove_zero(start_month)
        current_month = start_month-1
        render_calendar()
    })
    
    DATE_INPUT_2.addEventListener("click", () => {
        j = 3
        if (DATE_WRAPPER[0].classList.contains("border")) {
            DATE_WRAPPER[0].classList.remove("border")
        }
        DATE_WRAPPER[1].classList.add("border")
        if (CALENDAR.classList.contains("hidden")) {
            CALENDAR.classList.remove("hidden")
        }
        else {
            // Make elements before start date inactive
            LIS.forEach(li => {
                let start_value = parseInt(DATE_INPUT_1.value.split("/")[1])
                let start_month = parseInt(DATE_INPUT_1.value.split("/")[0])
                remove_zero(start_value)
                remove_zero(start_month)
                let start_year = parseInt(DATE_INPUT_1.value.split("/")[2])
                if (parseInt(li.innerHTML) < start_value && current_month+1 == start_month && current_year == start_year) {
                    li.classList.add("inactive")
                }
            })
        }
        let end_month = parseInt(DATE_INPUT_2.value.split("/")[0])
        remove_zero(end_month)
        current_month = end_month-1
        render_calendar()
    })
    
    // Creating months options
    for (let i=0; i<months.length; i++) {
        let option = document.createElement("option");
        option.value = months[i];
        option.innerHTML = months[i];
        option.id = i + "month";
        CURRENT_DATE_MONTH.appendChild(option);
    }
    
    // Creating years options
    for (let i=0; i<years.length; i++) {
        let option = document.createElement("option");
        option.value = years[i];
        option.innerHTML = years[i];
        option.id = i + "year";
        CURRENT_DATE_YEAR.appendChild(option);
    }
    
    // Re-rendering calendar on options click
    CURRENT_DATE_MONTH.addEventListener("change", function(option) {
        for (let i=0; i<months.length; i++) {
            if (option.target.value == months[i]) {
                current_month = i
                render_calendar()
                break
            }
        }
    })
    
    CURRENT_DATE_YEAR.addEventListener("change", function(option) {
        current_year = parseInt(option.target.value)
        // If selected month is smaller than current month and the user tries to go to from the next year to this year, redirect them to the current month at this year
        // If selected month is greater than current month and the user tries to go to the next year, redirect them to the current month at next year
        if (current_month < new Date().getMonth() && current_year == new Date().getFullYear() ||
            current_month > new Date().getMonth() && current_year > new Date().getFullYear()) {
            current_month = new Date().getMonth()
        }
        render_calendar()
    })

    // Creating adults options
    for (let i=1; i<=5; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        option.id = i + " adults";
        if (option.value == 2) {
            option.selected = "selected";
        }
        ADULTS.appendChild(option);
    }

    // Creating children options
    for (let i=0; i<=5; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        option.id = i + " adults";
        CHILDREN.appendChild(option);
    }
    
    const render_calendar = () => {
        let first_days_of_month = new Date(current_year, current_month, 1).getDay(); // Getting first day of month
        let last_date_of_month = new Date(current_year, current_month + 1, 0).getDate(); // Getting last date of month
        let last_date_of_last_month = new Date(current_year, current_month, 0).getDate(); // Getting last day of previous month
        let li_tag = "";
    
        let start_value = parseInt(DATE_INPUT_1.value.split("/")[1])
        let end_value = parseInt(DATE_INPUT_2.value.split("/")[1])
        let start_month = parseInt(DATE_INPUT_1.value.split("/")[0])
        let end_month = parseInt(DATE_INPUT_2.value.split("/")[0])
        let start_year = parseInt(DATE_INPUT_1.value.split("/")[2])
        let end_year = parseInt(DATE_INPUT_2.value.split("/")[2])

        remove_zero(start_value)
        remove_zero(end_value)
        remove_zero(start_month)
        remove_zero(end_month)
        
        for (let i = first_days_of_month; i > 0; i--) { // Creating li of previous month days
            li_tag += `<li class="inactive" style="opacity: 0;">${last_date_of_last_month - i + 1}</li>`;
        }
    
        for (let i = 1; i <= last_date_of_month; i++) { // Creating li of all days of current month
            // Adding active class to li if the current day, month, and year matched
            let is_today = i == start_value && current_month == start_month-1
                            && current_year == start_year && !is_edited && today_is_single == false
                            ? "first selected" : "";
            let is_tomorrow = i == end_value && current_month == end_month-1
                            && current_year == end_year && !is_edited && today_is_single == false
                            ? "last selected" : "";
            let is_single = i == start_value && start_value == end_value && start_month == current_month+1 && start_month == end_month 
                            && current_year == start_year && start_year == end_year && today_is_single == true
                            ? "single selected" : "";
            li_tag += `<li id=${i} class="${is_today}${is_tomorrow}${is_single}">${i}</li>`;
        }
    
    
        CURRENT_DATE_MONTH_LABEL.innerText =`${months[current_month]}`
        CURRENT_DATE_YEAR_LABEL.innerText =`${current_year}`
    
        days_tag.innerHTML = li_tag
    
        const LIS = document.querySelectorAll(".days li");
    
        let is_year = current_year == new Date().getFullYear() ? true : false
        
        if (DATE_WRAPPER[1].classList.contains("border")) {
            // Make elements before start date inactive
            LIS.forEach(li => {
                if (parseInt(li.innerHTML) < start_value && current_month+1 == start_month && is_year == true) {
                    li.classList.add("inactive")
                }
            }) 
        }
    
        // If there are inactive elements between months
        if (is_inactive == true && is_year == true) {
            let difference = end_value - start_value
            for (let i=0; i<=difference; i++) {
                let make_active = document.getElementById(end_value-i)
                make_active.classList.add("selected")
                if (make_active.innerHTML == end_value) {
                    make_active.classList.add("last")
                }
                if (make_active.innerHTML == start_value) {
                    make_active.classList.add("first")
                }
            }
        }
    
        // If there are active days that need to be rendered in the last month
        if (last_month_active.length != 0 && current_month+1 == last_month_active[0] && is_year == true) {
            for (let i=0; i<last_days_active.length; i++) {
                let make_active_elements = document.getElementById(last_days_active[i])
                if (i == 0) {
                    make_active_elements.classList.add("first")
                }
                make_active_elements.classList.add("selected")
            }
            let last_li_of_month = document.getElementById(last_date_of_month)
            if (!last_li_of_month.classList.contains("selected")) {
                last_li_of_month.classList.add("selected")
                if (last_date_of_month == start_value) {
                    last_li_of_month.classList.add("first")
                }
            }
        }
    
        // Render active days
        if (active_lis.length != 0 && current_month == active_elements_month[0] && is_year == true) {
            for (let i=0; i<active_lis.length; i++) {
                let make_active_li = document.getElementById(active_lis[i])
                if (start_value == end_value && make_active_li.innerHTML == start_value && start_month == current_month+1) {
                    make_active_li.classList.add("selected")
                    make_active_li.classList.add("single")
                    break
                }
                else if (i == 0 && last_month_active.length == 0) {
                    make_active_li.classList.add("first")
                }
                else if (i == active_lis.length-1) {
                    make_active_li.classList.add("last")
                }
                make_active_li.classList.add("selected")
            }
        }
    
        // If it's the last day of the month, add an active and last class to the first day of the next month
        if (next_month.length != 0 && start_value != end_value && is_year == true) {
            if (current_month == next_month[0]) {
                let first_li_next_month = document.getElementById(1)
                if (first_li_next_month.classList.contains("inactive")) {}
                else if (!(active_lis.length != 0 && current_month == active_elements_month[0])) {
                    first_li_next_month.classList.add("last")
                    first_li_next_month.classList.add("selected")
                }
            }
        }
    
        // Change selected year, month option to the current year, month
        for (let i=0; i<years.length; i++) {
            if (CURRENT_DATE_YEAR_LABEL.innerText == new Date().getFullYear()) {
                let current_year_option = document.getElementById(0 + "year")
                current_year_option.selected = true
            }
            else {
                let current_year_option = document.getElementById(1 + "year")
                current_year_option.selected = true
            }
        }
    
        for (let i=0; i<months.length; i++) {
            if (current_month == i) {
                let current_month_option = document.getElementById(i + "month")
                current_month_option.selected = true
            }
        }
    
        for (let i=0; i<months.length; i++) {
            // Disabling months option before current month this year
            if (current_year == new Date().getFullYear() && i < new Date().getMonth()) {
                for (let j=new Date().getMonth(); j<months.length; j++) {
                    let check_months = document.getElementById(j + "month")
                    if (check_months.disabled=true) {
                        check_months.disabled=false
                }}
                let last_month = document.getElementById(i + "month")
                last_month.disabled = true
            }
            // Disabling months option after current month next year
            else if (current_year == new Date().getFullYear()+1 && i > new Date().getMonth()) {
                for (let j=0; j<current_month; j++) {
                    let check_months = document.getElementById(j + "month")
                    if (check_months.disabled=true) {
                        check_months.disabled=false
                }}
                let next_months = document.getElementById(i + "month")
                next_months.disabled = true
            }
        }
    
        // Crossing taken dates
        let start_date = data["start_dates"]
        let end_date = data["end_dates"]
    
        let dates = [start_date, end_date]
    
        for (let j=0; j<dates.length; j++) {
            for (let i=0; i<start_date.length; i++) {
                let values = dates[j][i].split("/")
                let day = values[1]
                let month = values[0]
                let year = values[2]
                remove_zero(day)
                remove_zero(month)
                
                // Add crossed to start and end date
                if (parseInt(year) === current_year && parseInt(month) === (current_month+1)) {
                    all_crossed_dates.push(format_date(day, current_month+1, current_year))
                    let li = document.getElementById(day)
                    if (!li.classList.contains("inactive")) {
                        if (li.classList.contains("selected")) {
                            li.classList.remove("selected")
                        }
                        if (li.classList.contains("first")) {
                            li.classList.remove("first")
                        }
                        if (li.classList.contains("last")) {
                            li.classList.remove("last")
                        }
                        li.classList.add("crossed")
                        li.classList.add("inactive")
                    }
                }
            }
        }
    
        // Crossing values in between end day and start day
        for (let k=0; k<start_date.length; k++) {
            let start_values = dates[0][k].split("/")
            let start_day = parseInt(start_values[1])
            let start_month = parseInt(start_values[0])
            let start_year = parseInt(start_values[2])
            remove_zero(start_day)
            remove_zero(start_month)
    
            let end_values = dates[1][k].split("/")
            let end_day = parseInt(end_values[1])
            let end_month = parseInt(end_values[0])
            let end_year = parseInt(end_values[2])
            remove_zero(end_day)
            remove_zero(end_month)

            let active_month = parseInt((current_month + 1))
            let active_year = parseInt(current_year)
    
            // If start date and end date are on the same month, color dates in between them
            if (start_year === end_year && start_year === active_year && start_month === end_month && start_month === active_month) {
                if (end_day > (start_day + 1)) {
                    let difference = (end_day - start_day) - 1
                    for (let j=1; j<=difference; j++) {
                        let current_day = end_day - j
                        all_crossed_dates.push(format_date(current_day, current_month+1, current_year))
                        let li = document.getElementById(current_day)
                        if (!li.classList.contains("inactive")) {
                            if (li.classList.contains("selected")) {
                                li.classList.remove("selected")
                            }
                            if (li.classList.contains("first")) {
                                li.classList.remove("first")
                            }
                            if (li.classList.contains("last")) {
                                li.classList.remove("last")
                            }
                            li.classList.add("crossed")
                            li.classList.add("inactive")
                        }
                    }
                }
            }
    
            // If start date and end date are on different months, color dates in between them
            else if (start_year === end_year && start_year === active_year && start_month != end_month) {
                if (start_month == current_month+1) {
                    let start_difference = parseInt(last_date_of_month) - parseInt(start_day)
                    for (let i=0; i<start_difference; i++) {
                        let li = document.getElementById(last_date_of_month - i)
                        all_crossed_dates.push(format_date(last_date_of_month-i, current_month+1, current_year))
                        li.classList.add("crossed")
                        li.classList.add("inactive")
                    }
                }
                else if (end_month == current_month+1) {
                    let end_difference = parseInt(end_day)
                    for (let i=0; i<end_difference; i++) {
                        let li = document.getElementById(end_difference - i)
                        all_crossed_dates.push(format_date(end_difference-i, current_month+1, current_year))
                        li.classList.add("crossed")
                        li.classList.add("inactive")
                    }
                }
            }
        }

        // If the user switches apartments and todays date is taken for the apartment
        if ((is_edited == false && all_crossed_dates.includes(DATE_INPUT_1.value)) ||
            (is_edited == false && all_crossed_dates.includes(DATE_INPUT_2.value))) {
            set_today()
            render_calendar()
        }

        // If the user switched apartments, check if the selected date is already taken, and if it is, rerender calendar
        for (let i=0; i<active_lis.length; i++) {
            if (all_crossed_dates.includes(format_date(active_lis[i], parseInt(active_elements_month)+1, current_year))) {
                multiple_months = false
                active_lis.splice(0, active_lis.length)
                active_elements_month.splice(0, active_elements_month.length)
                last_days_active.splice(0, last_days_active.length)
                last_month_active.splice(0, last_month_active.length)
                next_month.splice(0, next_month.length)
                is_edited = false

                current_month = date.getMonth()
                set_today()
                
                if (CALENDAR.classList.contains("hidden")) {
                    CALENDAR.classList.remove("hidden")
                }

                render_calendar()
            }
        }
    
        LIS.forEach(li => {
            // Adding inactive classes to already passed dates
            if (li.innerHTML < date.getDate() && current_month == new Date().getMonth() && current_year == new Date().getFullYear() ||
                current_month < new Date().getMonth() && current_year == new Date().getFullYear() ||
                current_year < new Date().getFullYear()) {
                li.classList.add("inactive")
            }
    
            // Adding event listener for all days
            li.addEventListener("click", () => {
                // If it's inactive, skip
                if (li.classList.contains("inactive")) {
                    return
                }
    
                multiple_months = false
    
                // Removing previously active elements from lists
                active_lis.splice(0, active_lis.length)
                active_elements_month.splice(0, active_elements_month.length)
                last_days_active.splice(0, last_days_active.length)
                last_month_active.splice(0, last_month_active.length)
                next_month.splice(0, next_month.length)
    
                is_edited = true
                let start_value = parseInt(DATE_INPUT_1.value.split("/")[1])
                let end_value = parseInt(DATE_INPUT_2.value.split("/")[1])
                remove_zero(start_value)
                remove_zero(end_value)
    
                let start_month = parseInt(DATE_INPUT_1.value.split("/")[0])
                let end_month = parseInt(DATE_INPUT_2.value.split("/")[0])
                remove_zero(start_month)
                remove_zero(end_month)
    
                // Get currently active elements
                let active = document.getElementsByClassName("selected");
    
                // Start date
                if (j % 2 == 0 && is_year == true) {
                    // Remove previously active elements
                    let active_length = active.length
                    for (let i=0; i<active_length; i++) {
                        if (active[0].classList.contains("first")) {
                            active[0].classList.remove("first")
                        }
                        else if (active[0].classList.contains("last")) {
                            active[0].classList.remove("last")
                        }
                        else if (active[0].classList.contains("single")) {
                            active[0].classList.remove("single")
                        }
                        active[0].classList.remove("selected")
                    }
                    // Make end date one day after the clicked date
                    if (li.innerHTML != last_date_of_month && document.getElementById(parseInt(li.innerHTML)+1).classList.contains("crossed")) {
                        li.classList.add("single")
                        li.classList.add("selected")
                        DATE_INPUT_1.setAttribute("value", format_date(li.innerHTML, current_month+1, current_year))
                        DATE_INPUT_2.setAttribute("value", format_date(li.innerHTML, current_month+1, current_year))
                        DATE_WRAPPER[0].classList.remove("border")
                        j += 1
                    }
                    else {
                        if (parseInt(li.innerHTML) != last_date_of_month) {
                            li.classList.add("first")
                            DATE_INPUT_2.setAttribute("value", format_date(parseInt(li.innerHTML)+1, current_month+1, current_year))
                            let next_element = document.getElementById(parseInt(li.innerHTML)+1)
                            next_element.classList.add("last")
                            next_element.classList.add("selected")
                        }
                        else {
                            li.classList.add("first")
                            DATE_INPUT_2.setAttribute("value", format_date(1, current_month+2, current_year))
                            next_month.push(current_month+1)
                            next_day.push(1)
                        }
                        li.classList.add("selected")
                        // Edit start date input field value, add according border
                        DATE_INPUT_1.setAttribute("value", format_date(li.innerHTML, current_month+1, current_year))
                        DATE_WRAPPER[0].classList.remove("border")
                        DATE_WRAPPER[1].classList.add("border")
                        start_value = parseInt(li.innerHTML)
                        LIS.forEach(li => {
                            if (parseInt(li.innerHTML) < start_value) {
                                if (!li.classList.contains("inactive")) {
                                    li.classList.add("inactive")
                                }
                                if (li.classList.contains("single")) {
                                    li.classList.remove("single")
                                }
                            }
                        })
                    }
                }
    
                // End date
                else if (is_year == true) {
                    // If the last end date was in the last month and the newly clicked end date is in this month
                    if (end_month > current_month+1) {
                        if (start_value != li.innerHTML && document.getElementById(parseInt(li.innerHTML)+1).classList.contains("selected")) {
                            let difference = last_date_of_month - parseInt(li.innerHTML)
                            for (let i=0; i<difference; i++) {
                                let active_element_after = document.getElementById(last_date_of_month - i)
                                if (active_element_after.classList.contains("crossed")) {
                                    let last_element = document.getElementById(last_date_of_month - i - 1)
                                    last_element.classList.add("last")
                                }
                                else {
                                    if (active_element_after.classList.contains("last")) {
                                        active_element_after.classList.remove("last")
                                    }
                                    active_element_after.classList.remove("selected")
                                }
                            }
                        }
                    }
                    // If start date and end date aren't in the same month
                    let crossed_lis = document.getElementsByClassName("crossed")
                    let crossed_dates = []
                    for (let i=0; i<crossed_lis.length; i++) {
                        crossed_dates.push(crossed_lis[i].innerHTML)
                    }
                    if (start_month != (current_month+1)) {
    
                        // Last month difference
                        let last_month_difference = last_date_of_last_month - start_value
                        for (let i=last_month_difference; i>0; i--) {
                            let difference = last_date_of_last_month - i
                            // Check if day is inactive
                            if (all_crossed_dates.includes(format_date(difference, start_month, current_year))) {
                                DATE_INPUT_2.setAttribute("value", format_date(difference-1, start_month, current_year))
                                DATE_WRAPPER[1].classList.remove("border")
                                CALENDAR.classList.add("hidden")
                                is_inactive = true;
                                current_month = start_month-1
                                render_calendar()
                                break
                            }
                        }
    
                        if (is_inactive == false) {
                            // Add month to months list
                            last_month_active.push(start_month)
                            for (let i=last_month_difference; i>0; i--) {
                                let difference = last_date_of_last_month - i
                                // Add days to days list
                                last_days_active.push(difference)
                            }
                        }
    
                        if (is_inactive == false) {
                            // Current month difference
                            let current_month_difference = parseInt(li.innerHTML) - 1
                            for (let i=current_month_difference; i>=1; i--) {
                                let difference = parseInt(li.innerHTML) - i
                                if (all_crossed_dates.includes(format_date(difference, current_month+1, current_year))) {
                                    DATE_INPUT_2.setAttribute("value", format_date(difference-1, current_month+1, current_year))
                                    DATE_WRAPPER[1].classList.remove("border")
                                    CALENDAR.classList.add("hidden")
                                    is_inactive = true;
                                    break
                                }
                                let difference_actives = document.getElementById(difference)
                                if (difference_actives.innerHTML != li.innerHTML && difference_actives.classList.contains("last")) {
                                    difference_actives.classList.remove("last")
                                }
                                difference_actives.classList.add("selected")
                                multiple_months = true
                            }
                        }
                    }
                    // Remove single class
                    if (start_value === end_value && start_month == end_month) {
                        let single = document.getElementById(start_value)
                        single.classList.add("first")
                        single.classList.remove("single")
                    }
                    // If the end dates after the selected end date are colored
                    if (parseInt(li.innerHTML) < end_value && is_inactive == false || end_month > current_month+1 && is_inactive == false) {
                        let difference;
                        if (start_month != end_month) {
                            difference = last_date_of_last_month - parseInt(li.innerHTML)
                        }
                        else {
                            difference = end_value - parseInt(li.innerHTML)
                        }
                        for (let i=0; i<difference; i++) {
                            let id_between;
                            if (start_month != end_month) {
                                id_between = last_date_of_last_month - i
                            }
                            else {
                                id_between = parseInt(end_value) - i
                            }
                            if (id_between <= last_date_of_month) {
                                let different = document.getElementById(id_between)
                                if (different.classList.contains("last")) {
                                    different.classList.remove("last")
                                }
                                different.classList.remove("selected")
                            }
                        }
                    }
                    // If start date is on the previous month
                    if (parseInt(li.innerHTML) > end_value && end_month == current_month+1) {
                        let difference = parseInt(li.innerHTML) - end_value
                        for (let i=difference; i>=1; i--) {
                            let id_between = parseInt(li.innerHTML) - i
                            let different = document.getElementById(id_between)
                            if (different.classList.contains("crossed")) {
                                break
                            }
                            else if (different.classList.contains("last")) {
                                different.classList.remove("last")
                            }
                            different.classList.add("selected")
                        }
                    }
                    // If start date and end date are equal (stay time is one day)
                    if (parseInt(li.innerHTML) === start_value && start_month == current_month+1) {
                        li.classList.remove("first")
                        li.classList.add("single")
                    }
                    else if (is_inactive == false) {
                        li.classList.add("last")
                    }
                    if (is_inactive == false) {
                        li.classList.add("selected")
                    }
                    // If start and end date aren't next to each other, color li of dates in between start and end date
                    if (parseInt(li.innerHTML) > start_value + 1) {
                        let difference = parseInt(li.innerHTML) - (start_value + 1)
                        for (let i=difference; i>=1; i--) {
                            let id_between = parseInt(li.innerHTML) - i
                            let different = document.getElementById(id_between)
                            if (different.classList.contains("crossed")) {
                                let crossed = document.getElementsByClassName("crossed")[0]
                                let previous_element = document.getElementById(crossed.id - 1)
                                previous_element.classList.add("last")
                                li.classList.remove("selected")
                                li.classList.remove("last")
                                DATE_INPUT_2.setAttribute("value", format_date(previous_element.innerHTML, current_month+1, current_year))
                                DATE_WRAPPER[1].classList.remove("border")
                                CALENDAR.classList.add("hidden")
                                is_crossed = true;
                                break
                            }
                            else {
                                if (different.classList.contains("last")) {
                                    different.classList.remove("last")
                                }
                                different.classList.add("selected")
                            }
                        }
                    }
                    if (is_crossed == false && is_inactive == false) {
                        // Edit end date input field value, add according border
                        DATE_INPUT_2.setAttribute("value", format_date(li.innerHTML, current_month+1, current_year))
                        DATE_WRAPPER[1].classList.remove("border")
                        CALENDAR.classList.add("hidden")
                    }
                    is_crossed = false
                    is_inactive = false
                }
                j += 1
                // Add all active elements to a list in case of switching in between months
                let active_elements = document.getElementsByClassName("selected");
                active_elements_month.push(current_month)
                if (multiple_months == false) {
                    if (is_edited && active_lis.length != 0) {
                        for (let i=0; i<=active_lis.length; i++) {
                            active_lis.splice(0, 1)
                        }
                    }
                }
                for (let i=0; i<active_elements.length; i++) {
                    active_lis.push(active_elements[i].innerHTML)
                }
            })
        })
    }
    
    render_calendar()

    set_today()
    
    render_calendar()
    
    let month = date.getMonth()
    let year = date.getFullYear()
    
    previous_next_icon.forEach(icon => {
        icon.addEventListener("click", () => {
            // Disabling user from viewing records from last month (this year)
            if (icon.id === "prev" && current_month-1 < month && current_year == year) {
                return
            }
            // Disabling user from viewing records from months after this month next year
            else if (icon.id === "next" && current_year == year+1 && current_month == month) {
                return
            }
            else {
                // If clicked icon is previous icon then decrement current month by 1 else increment it by 1
                current_month = icon.id === "prev" ? current_month - 1 : current_month + 1;
    
                if(current_month < 0 || current_month > 11) { // If the current month is less than 0 or greater than 11
                    // Creating a new date of current year & month and pass it as date value
                    date = new Date(current_year, current_month);
                    current_year = date.getFullYear(); // Updating current year with new date year
                    current_month = date.getMonth(); // Updating current month with new date month
                } else { // Else pass new Date as date value
                    date = new Date();
                }
                render_calendar();
            }
        })
    })
}