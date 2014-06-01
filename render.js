function update_test_link() {
    var port = document.getElementById("local_port").value;
    Array.prototype.forEach.call(
        document.getElementById("results").querySelectorAll(".local_link"),
        function (x) {
            x.port = port;
        });
}

function update_status(e) {
    var elem = e.originalTarget || e.target;
    if (elem.localName != "input" || elem.type != "checkbox") {
        return;
    }
    var visible = elem.checked;
    var condition = elem.id.split("_")[1];
    var cells = document.querySelectorAll("tr.parent td."  + condition);
    for (var i=0; i<cells.length; i++) {
        var row = cells[i].parentNode;
        row.style.display = visible ? "table-row" : "none";
    }
}

function setup_conditions() {
    var table = document.getElementById("conditions");
    var result_table = document.getElementById("results");
    var inputs = table.querySelectorAll("input");
    Array.prototype.forEach.call(inputs, function(x) {x.checked = true});
    var counts = table.querySelectorAll(".count");
    Array.prototype.forEach.call(counts, function(x) {var condition = x.id.split("_")[1];
                                                      x.textContent = result_table.querySelectorAll("td.parent." + condition).length});
    document.getElementById("conditions").addEventListener("click", update_status, false);
}

function dump_annotations() {
    var data = {}
    var parents = document.querySelectorAll("tr.parent");
    for (var i = 0; i<parents.length; i++) {
         var annotation = parents[i].querySelector('.annotation')
         if(annotation) {
            var key = parents[i].querySelector('.local_link').textContent;
            var value = annotation.innerHTML.trim();
            if(value) {
                data[key] = value;
            }
         }
    }
    return data;
}

window.addEventListener("DOMContentLoaded", function() {
    setup_conditions();
    document.getElementById("local_port").addEventListener("change", update_test_link, false);
    update_test_link();
}, false)
