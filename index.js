window.onload = function()
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function()
    {
        var json = JSON.parse(this.responseText)["cards"];
        var element = document.getElementById("cards");
        
        for (var i = 0; i < json.length; i++) {
            var data = json[i];

            var card = document.createElement("div");
            card.className = "card shadow";
            card.innerHTML =
            '<img class="rounded" src="' + data["img"] + '">\
            <h6 class="text-center m-4">' + data["title"] + '</h6>';
            
            card.onclick = function()
            {
                alert(this.getElementsByTagName("h6")[0].innerText);
            }

            element.appendChild(card);
        }
    }
    xhttp.open("GET", "cards.json");
    xhttp.send();
}