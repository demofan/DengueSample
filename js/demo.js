/**
 * jqGrid 資料綁定
 * @returns {} 
 */
function bindingGrid() {
    if (document.getElementById("jqGrid") !== null) {
        $("#jqGrid").jqGrid({
            url: "json/put.json",
            datatype: "json",
            colModel: [
                { label: "通報日", name: "attack_date", width: 75 },
                { label: "感染縣市", name: "live_city", width: 90 },
                { label: "感染鄉鎮", name: "live_add1", width: 90 },
                { label: "性別", name: "gender", width: 75 }
            ],
            viewrecords: true,
            height: "auto",
            autowidth: true,
            rowNum: 1000,
            loadonce: true,
            pager: "#jqGridPager",
            sortname: "live_city",
            sortorder: "desc"
        });
    }
}
/**
 * Azure Search 搜尋
 * @param {string} url 
 * @returns {} 
 */
function bindingTableForSearch(url) {
    if (document.getElementById("sidebar") !== null) {
        jQuery.ajax({
            url: url,
            dataType: "json",
            ContentType: "application/json; charset=UTF-8",
            headers: { "api-key": "59B87CD038F105A174132C2226FA22CB" },
            complete: function (jsonData, stat) {
                if (stat == "success") {
                    $.each(jsonData.responseJSON.value, function (indexInArray, valueOfElement) {
                        $("#ajax_append").append("<tr><td>" + valueOfElement.attack_date + "</td><td>" + valueOfElement.live_city + "-" + valueOfElement.live_add1 + "</td><td>" + valueOfElement.gender + "</td></tr>");
                    });
                    var facets = jsonData.responseJSON["@search.facets"];
                    if (facets != undefined) {
                        $("#sidebar").attr("class", "col-md-4").show();
                        $("#main").attr("class", "col-md-8");
                        $.each(facets.gender, function (indexInArray, valueOfElement) {
                            $("#ajax_catgory").append("<li class='list-group-item'><span class='badge'>" + valueOfElement.count + "</span>" + valueOfElement.value + "</li>");
                        });
                    } else {
                        $("#sidebar").attr("style", "display:none;");
                        $("#main").attr("class", "col-md-12");
                    }
                }
            }
        });
    }
}

/**
 * GMAP 資料綁定
 * @returns {} 
 */
function bindingGmap() {
    if (document.getElementById("test_map") !== null) {
        $("#test_map").gmap3({
                map: { options: { center: [22.995277, 120.247894], zoom: 9 } }
        });

        function markerGmap(mapValues) {
            $("#test_map").gmap3({
                clear: {
                    name: ["marker"]
                },
                marker: {
                    values: mapValues,
                    cluster: {
                        radius: 100,
                        10: {
                            content: "<div class='cluster cluster-1'>CLUSTER_COUNT</div>",
                            width: 53,
                            height: 52
                        },
                        30: {
                            content: "<div class='cluster cluster-2'>CLUSTER_COUNT</div>",
                            width: 56,
                            height: 55
                        },
                        60: {
                            content: "<div class='cluster cluster-3'>CLUSTER_COUNT</div>",
                            width: 66,
                            height: 65
                        }
                    }
                }
            });
        }

        function dataBinding() {
            var mapValues = [];
            $.ajax({
                type: "Get",
                url: "json/put.json",
                dataType: "json",
                success: function (response) {

                    $.each(response, function (index) {
                        var y = parseFloat(response[index].info_y);
                        var x = parseFloat(response[index].info_x);

                        if (isNaN(y) == false && isNaN(x) == false) {
                            mapValues.push({
                                latLng: [y, x],
                                options: { icon: response[index].gender == "女" ? "img/female.png" : "img/male.png" }
                            });
                        }
                    });
                    markerGmap(mapValues);
                }
            });
        }
        dataBinding();
    }
}

$(function () {
    bindingGrid();
    bindingTableForSearch("https://op.search.windows.net/indexes/op/docs?api-version=2015-02-28");
    bindingGmap();
    $("[data-search]").click(function () {
        var domain = "https://op.search.windows.net/indexes/op/docs?api-version=2015-02-28";
        var targetUrl = domain + $(this).data("search");
        console.log(targetUrl);
        $("#ajax_append").html("");
        bindingTableForSearch(targetUrl);
    });
});