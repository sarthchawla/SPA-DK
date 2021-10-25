$(document).ready(function () {
    $("#Currency-DropDown .dropdown-item").click(function (event) {
        let target = event.target;

        if (target.text === "INR") {
            MakeConversions("INR", "USD", target);
        }
        else {
            MakeConversions("USD", "INR", target);
        }
    });
});

function MakeConversions(from, to, dropdown) {
    let params = from + '/' + to;

    $.get("https://v6.exchangerate-api.com/v6/7812c32eb3130843cd4be6a9/pair/" + params,
        function (data, status) {
            if (status === "success") {
                let rate = data.conversion_rate;
                $(".price").each(function (index, obj) {
                    let newPrice = parseFloat($(obj).text()) * parseFloat(rate);
                    $(obj).text(Math.round(newPrice.toFixed(2)));
                })
                $(dropdown).siblings().removeClass('active');
                $(dropdown).addClass('active');
            }
            else {
                console.log("error: exchange api failed with status code: " + status);
            }
        });
};