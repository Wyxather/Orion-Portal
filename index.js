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
                $('#modal').modal('show');

                document.getElementById("title").innerText = this.getElementsByTagName("h6")[0].innerText;
                document.getElementById("image").src = data["img"];

                $.getJSON("posts/" + data["post"], function(json)
                {
                    const features = json["features"];
                    const features_element = document.getElementById("features");
                    features_element.innerHTML = "";

                    for (var i = 0; i < features.length; i++)
                        features_element.innerHTML += '<button class="btn btn-' + (features[i]["status"] ? 'success' : 'danger') + ' m-1">' + features[i]["name"] + '</button>';

                    const changelog = json["changelog"];
                    const changelog_element = document.getElementById("changelog");
                    changelog_element.innerHTML = "";

                    for (var i = 0; i < changelog.length; i++) {

                        const changelog_id = "changelog_" + i;

                        var changelog_changes = "";
                        for (var j = 0; j < changelog[i]["changes"].length; j++)
                            changelog_changes += '<li>' + changelog[i]["changes"][j] + '</li>';

                        changelog_element.innerHTML +=
                        '<a class="btn btn-dark" data-bs-toggle="collapse" href="#' + changelog_id + '">' +
                            changelog[i]["date"] +
                        '</a>\
                        <div class="collapse" id="' + changelog_id + '">\
                            <div class="container-fluid m-1">\
                                <ul>' +
                                    changelog_changes;
                                '</ul>\
                            </div>\
                        </div>'

                        document.getElementById("download").onclick = function ()
                        {
                            window.open("https://github.com/Wyxather/Orion-Portal/releases/download/" + json["download"] + "/Orion-Internal.dll");
                        }
                    }
                });
            }

            element.appendChild(card);
        }
    }
    xhttp.open("GET", "cards.json");
    xhttp.send();
}