const temperature = document.querySelector(".temperature");
const city = document.querySelector(".location");
const date = document.querySelector(".date");
const img = document.querySelector(".img");
const condition = document.querySelector(".condition");

const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

form.addEventListener("submit", search);


let apiCity = "Bengaluru";
let apiKey = "";

const fetchData = async(apiCity, apiKey) => {
try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${apiCity}&aqi=yes`
    //   `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${apiCity}`;

    const response = await fetch(url);
    const data = await response.json();

    // advanced de-sctructuring of json object
    const {
        current: {temp_c, condition:{icon, text}},
        location: {name, localtime}
    } = data;


    updateDOM(temp_c, name, icon, text, localtime);

    console.log(data);
} catch (error) {
    alert(`Location not found, please check for spellings!`)
}
}

function updateDOM(temp_c, name, icon, text, time)
                    {   
                        temperature.innerText = temp_c.toString().padEnd(4, "°c");
                        city.innerText = name;
                        img.src = icon;
                        condition.innerText = text;

                        const exactTime = time.split(" ")[1];
                        const exactDate = time.split(" ")[0];
                        const exactDay = new Date(exactDate).getDay();

                        date.innerText = `${exactTime}, ${getDay(exactDay)} ${exactDay}` 

                        // switch case for days
                        function getDay(_){
                            switch(_){
                                case 0:
                                    return "Sunday"
                                case 1:
                                    return "Monday"
                                case 2:
                                    return "Tuesday"
                                case 3:
                                    return "Wednesday"
                                case 4:
                                    return "Thursday"
                                case 5:
                                    return "Friday"
                                case 6:
                                    return "Saturday"
                                default:
                                    return "Returned wrong Day literal!"
                            }
                        }

                    }

// calling function
fetchData(apiCity, apiKey);

function search(e) {
    e.preventDefault();

    apiCity = searchField.value;
    fetchData(apiCity, apiKey)
    // console.log(apiCity);

}

