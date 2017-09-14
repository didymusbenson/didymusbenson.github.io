var JSONclient = new XMLHttpRequest();
JSONclient.open('GET', './js/JSON/kh_mini_menus.json');
JSONclient.onreadystatechange = function () {
    if (JSONclient.readyState == 4) {
        make_menus(JSON.parse(JSONclient.responseText));
    }
}

JSONclient.send();

function make_menus(menus) {
    console.log(menus);
    for (var i = 0; i < menus.length; i++) {
        var menu = document.createElement("div");
        menu.classList.add('itemwrap');
        menu.innerHTML = "<div class='navi'></div><a href='#" + menus[i].anchor + "'>" + menus[i].title + "</a></div>";
        document.getElementById("menuwrapper").appendChild(menu);
        make_modal(menus[i]);
    }
}

function make_modal(menu) {
    var html_before = " <div class='modal' id='" + menu.anchor + "' aria-hidden='true'><div class='modal-dialog'><div class='modal-header'><p>" + menu.title + "</p><a href='#' class='btn-close' aria-hidden='true'>×</a></div><div class='modal-body'>";

    var table = "<table><tbody><tr>";

    // All of the objects in the array have the same keys,
    // so we only need the keys from the first item in the array.
    for (var i = 0; i < Object.keys(menu.data[0]).length; i++) {
        table += "<th>" + Object.keys(menu.data[0])[i].replace(/_/gi, " ").toUpperCase() + "</th>";
    }
    table += "</tr>";
    for (var i = 0; i < menu.data.length; i++) {
        table += "<tr>";
        for (var key in menu.data[i]) {
            table += "<td>" + menu.data[i][key] + "</td>";
        }
        table += "</tr>";
    }
    table += "</tbody></table>";

    var html_after = "</div><div class='modal-footer'><p>" + menu.description + "</p></div></div></div>";

    var modal = document.createElement("div");
    modal.innerHTML = html_before + table + html_after;
    document.getElementById("modal_space").appendChild(modal);
}
