var data = [
    "Apple",
    "Orange",
    "Banana",
    "Pineapple",
    "Blueberry",
    "Blackberry",
    "Raspberry",
    "Cranberry",
    "Clementine",
    "Mango",
    "Papaya",
    "Peach",
    "Tangerine",
    "Pear",
    "Plum",
    "Grapes",
    "Boysenberry",
    "Lychee",
    "Pomegranate",
    "Watermelon",
    "Honey Dew Melon",
    "Fig",
    "Cherry",
    "Grapefruit"
];

$(document).
            ready(

                function () {
                    $( "#fruits" ).autocomplete({
                    source:data,
                    minLength: 3,
                    autoFocus: true,
                    });
                }
);

function addFruits()
{
    if($.inArray(document.getElementById("fruits").value, data)<0)
        data.push(document.getElementById("fruits").value);
}