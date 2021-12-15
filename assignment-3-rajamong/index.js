/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Gretel Rajamoney
 * Email: rajamong@oregonstate.edu
 */

// my variables //

wordArray = [];
itemArray = [];
condArray = [];

cityFind = null;
maxCost = null;
minCost = null;

itemDesc = null;
itemPic = null;
itemCost = null;
itemCity = null;
itemCond = "new";

// my functions //

function removeSymbols(event) {
    var text = event.currentTarget.value;
    wordArray = text.replace(/=>[!"#$%&\\'()\*+,\-\.\/:;<?@\[\\\]\^_`{|}~]/g, '').toLowerCase().split(' ');
}

var sell = document.querySelector('#sell-something-button');
sell.addEventListener('click', function(event) {
    var menu = document.getElementById("sell-something-modal");
    menu.style.display = "block";

    var backdrop = document.getElementById("modal-backdrop");
    backdrop.style.display = "block";
})

var cancel = document.querySelector('#modal-cancel');
cancel.addEventListener('click', function(event) {
    var menu = document.getElementById("sell-something-modal");
    menu.style.display = "none";

    var description = document.getElementById("post-text-input");
    description.value = null;

    var backdrop = document.getElementById("modal-backdrop");
    backdrop.style.display = "none";

    var priceSearch = document.getElementById("post-price-input");
    priceSearch.value = null;

    var citySearch = document.getElementById("post-city-input");
    citySearch.value = null;

    var pic = document.getElementById("post-photo-input");
    pic.value = null;

})

var topcorner = document.getElementById('modal-close');
topcorner.addEventListener('click', function(event) {
    var menu = document.getElementById("sell-something-modal");
    menu.style.display = "none";

    var description = document.getElementById("post-text-input");
    description.value = null;

    var citySearch = document.getElementById("post-city-input");
    citySearch.value = null;

    var pic = document.getElementById("post-photo-input");
    pic.value = null;

    var priceSearch = document.getElementById("post-price-input");
    priceSearch.value = null;

    var backdrop = document.getElementById("modal-backdrop");
    backdrop.style.display = "none";
})

function addNewPost(link, name, cost, cond, location) {
    var container = document.getElementById("posts");
    var card = document.createElement("div");
    card.classList.add("post");

    var storage = document.createElement('div');
    card.appendChild(storage);
    storage.classList.add("post-contents");

    var postPic = document.createElement('div');
    storage.appendChild(postPic);
    postPic.classList.add('post-image-container');

    var postUrl = document.createElement("img");
    postPic.appendChild(postUrl);
    postUrl.src = link;
    postUrl.alt = name;

    var postDesc = document.createElement("div");
    storage.appendChild(postDesc);
    postDesc.classList.add('post-info-container');

    var postCont = document.createElement('a');
    postDesc.appendChild(postCont);
    postCont.classList.add('post-title');
    postCont.href = "#";
    postCont.appendChild(document.createTextNode(name));

    var postSpan = document.createElement('span');
    postDesc.appendChild(postSpan);
    postSpan.classList.add('post-price');
    postSpan.appendChild(document.createTextNode("$" + cost));

    var postCity = document.createElement('span');
    postDesc.appendChild(postCity);
    postCity.classList.add('post-city');
    postCity.appendChild(document.createTextNode("(" + location + ")"));


    container.appendChild(card);
    card.dataset.cost = cost;
    card.dataset.cond = cond;
    card.dataset.location = location;
}

var accept = document.querySelector('#modal-accept');
accept.addEventListener('click', function() {
    var check = 0;

    if ((itemCost != null) && (itemCond != null) && (itemPic != null) && (itemCity != null) && (itemDesc != null)) {
        addNewPost(itemPic, itemDesc, itemCost, itemCond, itemCity);
        check = 1;
    } else {
        alert("necessary info not completed");
    }
    if (check) {
        var menu = document.getElementById("sell-something-modal");
        menu.style.display = "none";

        var backdrop = document.getElementById("modal-backdrop");
        backdrop.style.display = "none";

        var description = document.getElementById("post-text-input");
        description.value = null;

        var pic = document.getElementById("post-photo-input");
        pic.value = null;

        var priceSearch = document.getElementById("post-price-input");
        priceSearch.value = null;

        var citySearch = document.getElementById("post-city-input");
        citySearch.value = null;
    }
});

function sortPosts() {
    itemArray = document.getElementsByClassName('post');

    for (var x = 0; x < itemArray.length; x++) {
        if (wordArray.length != 0) {
            if (!((itemArray[x].getElementsByClassName("post-title")[0].textContent.toLowerCase().includes(document.getElementById("filter-text").value.toLowerCase())))) {
                itemArray[x].remove();
                x--;
            }
        }
        if (maxCost != null) {
            if (parseInt(itemArray[x].dataset.cost) > parseInt(maxCost)) {
                itemArray[x].remove();
                x--;
            }
        }
        if (minCost != null) {
            if (parseInt(itemArray[x].dataset.cost) < parseInt(minCost)) {
                itemArray[x].remove();
                x--;
            }
        }
        if (cityFind != null) {
            if (String(itemArray[x].dataset.location) != String(cityFind)) {
                itemArray[x].remove();
                x--;
            }
        }
        for (var y = 0; y < condArray.length; y++) {
            var z = 0;

            if (String(itemArray[x].dataset.cond) == String(condArray[y])) {
                z++;
            }
            if (!z) {
                itemArray[x].remove();
                x--;
                continue;
            }
        }
    }
}

function findMax(event) {
    maxCost = event.currentTarget.value;
}

function findMin(event) {
    minCost = event.currentTarget.value;
}

function findCity(event) {
    cityFind = event.currentTarget.value;
}

function findCond(event) {
    var test = 0;

    for (var x = 0; x < condArray.length; x++) {
        if (event.currentTarget.value == condArray[x]) {
            condArray.splice(x, 1);
            test = test + 1;
        }
    }
    if (!test) {
        condArray.push(event.currentTarget.value);
    }
}

var newDesc = document.getElementById('post-text-input');
newDesc.addEventListener('change', function(event) {
    itemDesc = event.currentTarget.value;
})

var newPic = document.getElementById('post-photo-input');
newPic.addEventListener('change', function(event) {
    itemPic = event.currentTarget.value;
})

var newCost = document.getElementById('post-price-input');
newCost.addEventListener('change', function(event) {
    itemCost = event.currentTarget.value;
})

var newCity = document.getElementById('post-city-input');
newCity.addEventListener('change', function(event) {
    itemCity = event.currentTarget.value;
})

var newNew = document.getElementById('post-condition-new');
newNew.addEventListener('click', function(event) {
    itemCond = event.currentTarget.value;
})

var newExcellent = document.getElementById('post-condition-excellent');
newExcellent.addEventListener('click', function(event) {
    itemCond = event.currentTarget.value;
})

var newGood = document.getElementById('post-condition-good');
newGood.addEventListener('click', function(event) {
    itemCond = event.currentTarget.value;
})

var newFair = document.getElementById('post-condition-fair');
newFair.addEventListener('click', function(event) {
    itemCond = event.currentTarget.value;
})

var newPoor = document.getElementById('post-condition-poor');
newPoor.addEventListener('click', function(event) {
    itemCond = event.currentTarget.value;
})

var condNew = document.getElementById('filter-condition-new');
condNew.addEventListener('click', findCond);

var excellent = document.getElementById('filter-condition-excellent');
excellent.addEventListener('click', findCond);

var good = document.getElementById('filter-condition-good');
good = addEventListener('click', findCond);

var fair = document.getElementById('filter-condition-fair');
fair = addEventListener('click', findCond);

var poor = document.getElementById('find-condition-poor');
poor = addEventListener('click', findCond);

var enteredInfo = document.getElementById('filter-text');
enteredInfo.addEventListener('change', removeSymbols);

var minRefresh = document.getElementById('filter-min-price');
minRefresh.addEventListener('change', findMin);

var maxRefresh = document.getElementById('filter-max-price');
maxRefresh.addEventListener('change', findMax);

var cityRefresh = document.getElementById('filter-city');
cityRefresh.addEventListener('change', findCity);

var update = document.getElementById('filter-update-button');
update.addEventListener('click', sortPosts);