/* =========================
   MENU
========================= */

const menus = {

    coffee: [
        ["01", "Iced Spanish Latte", "espresso · condensed milk · ice", 190],
        ["02", "Caramel Macchiato", "espresso · caramel · steamed milk", 210],
        ["03", "Classic Cappuccino", "espresso · milk · foam", 160],
        ["04", "Cold Brew", "slow brewed · smooth · cold", 180]
    ],

    other: [
        ["01", "Strawberry Matcha", "matcha · strawberry · milk", 210],
        ["02", "Iced Chocolate", "cocoa · milk · ice", 170],
        ["03", "Peach Iced Tea", "peach · black tea · lemon", 150],
        ["04", "Vanilla Milkshake", "vanilla · milk · cream", 190]
    ],

    bites: [
        ["01", "Avocado Toast", "sourdough · avocado · chilli", 220],
        ["02", "Pesto Sandwich", "pesto · mozzarella · tomato", 240],
        ["03", "Loaded Croissant", "cheese · herbs · butter", 190],
        ["04", "Café Fries", "crispy · parmesan · herbs", 170]
    ],

    sweet: [
        ["01", "Cinnamon Roll", "warm · buttery · cinnamon", 150],
        ["02", "Chocolate Brownie", "dark chocolate · fudgy", 140],
        ["03", "Strawberry Cheesecake", "cream cheese · strawberry", 220],
        ["04", "Banana Bread", "banana · walnut · warm spice", 130]
    ]

};


function showMenu(type) {

    const list = document.getElementById("menuList");

    list.innerHTML = "";

    menus[type].forEach(function(item) {

        list.innerHTML += `
            <div class="menu-item">

                <span class="menu-number">${item[0]}</span>

                <div>
                    <h3>${item[1]}</h3>
                    <p>${item[2]}</p>
                </div>

                <strong>₹${item[3]}</strong>

            </div>
        `;

    });
}


// Show coffee menu when page loads

showMenu("coffee");


/* =========================
   ORDER
========================= */

let order = [];
let total = 0;


function addToOrder(name, price) {

    order.push({
        name: name,
        price: price
    });

    total += price;

    document.getElementById("orderCount").textContent =
        order.length;

    updateOrder();

    showOrder();
}


function updateOrder() {

    const box = document.getElementById("orderItems");

    if (order.length === 0) {
        box.innerHTML = "Nothing here yet.";
    }

    else {

        box.innerHTML = "";

        order.forEach(function(item, index) {

            box.innerHTML += `
                <div class="order-item">
                    ${index + 1}. ${item.name}
                    <span style="float:right">
                        ₹${item.price}
                    </span>
                </div>
            `;

        });
    }

    document.getElementById("total").textContent = total;
}


function showOrder() {
    document.getElementById("orderBox")
        .classList.add("open");
}


function closeOrder() {
    document.getElementById("orderBox")
        .classList.remove("open");
}


function checkout() {

    if (order.length === 0) {
        alert("Your order is empty. The imaginary barista is concerned.");
        return;
    }

    alert(
        "☕ Order placed!\n\n" +
        "Your 4 PM is officially sorted.\n" +
        "Total: ₹" + total
    );

    order = [];
    total = 0;

    document.getElementById("orderCount").textContent = "0";

    updateOrder();
    closeOrder();
}


/* =========================
   DRINK BUILDER
========================= */

let drink = {
    base: null,
    milk: null,
    flavor: null
};


function choose(type, name, price, button) {

    drink[type] = {
        name: name,
        price: price
    };

    let buttons =
        button.parentElement.querySelectorAll("button");

    buttons.forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    updateDrink();
}


function updateDrink() {

    if (!drink.base) {
        return;
    }

    let base = drink.base.name;

    let milk = drink.milk
        ? drink.milk.name
        : "Regular Milk";

    let flavor = drink.flavor
        ? drink.flavor.name
        : "Classic";

    let price = drink.base.price;

    if (drink.milk) {
        price += drink.milk.price;
    }

    if (drink.flavor) {
        price += drink.flavor.price;
    }

    let name = "";

    if (base === "Cold Brew") {
        name = "Iced ";
    }

    name += flavor !== "Classic"
        ? flavor + " "
        : "";

    name += base === "Espresso"
        ? "Latte"
        : base;

    document.getElementById("drinkName")
        .textContent = name;

    document.getElementById("drinkDetails")
        .textContent =
        base + " · " + milk + " · " + flavor;

    document.getElementById("drinkPrice")
        .textContent = "₹" + price;
}


function addCustomDrink() {

    if (!drink.base) {
        alert("Pick at least a coffee base first ☕");
        return;
    }

    let name =
        document.getElementById("drinkName").textContent;

    let price =
        parseInt(
            document.getElementById("drinkPrice")
                .textContent.replace("₹", "")
        );

    addToOrder(name, price);
}


/* =========================
   DESSERT PAIRING
========================= */

const pairings = {

    latte: {
        name: "Cinnamon Roll",
        description: "Warm, buttery and slightly sweet.",
        price: 150
    },

    coldbrew: {
        name: "Chocolate Brownie",
        description: "Dark, fudgy and exactly what you need.",
        price: 140
    },

    matcha: {
        name: "Strawberry Cheesecake",
        description: "Creamy, fruity and a little fancy.",
        price: 220
    },

    cappuccino: {
        name: "Banana Bread",
        description: "Soft, warm and quietly comforting.",
        price: 130
    }

};


function pairDessert() {

    let drink =
        document.getElementById("drinkChoice").value;

    let item = pairings[drink];

    document.getElementById("pairResult").innerHTML = `

        <h3>${item.name}</h3>

        <p>${item.description}</p>

        <strong>₹${item.price}</strong>

        <br><br>

        <button
            onclick="addToOrder('${item.name}', ${item.price})"
            style="
                padding:10px 15px;
                border:1px solid #2c241e;
                background:transparent;
                cursor:pointer;
            "
        >
            ADD TO ORDER +
        </button>
    `;
}


/* =========================
   CAFÉ JOURNAL
========================= */

const journalEntries = [

    {
        date: "04.10.26",
        title: "The book on table seven.",
        text: "Someone left a book on table seven this afternoon. They never came back for it. We hope they're okay."
    },

    {
        date: "29.09.26",
        title: "Rain at 5:12 PM.",
        text: "It started raining just as everyone was leaving. Suddenly nobody seemed to be in a hurry anymore."
    },

    {
        date: "18.09.26",
        title: "The regular order.",
        text: "One cappuccino. No sugar. Extra foam. Same table. Same time. We think some routines are worth keeping."
    },

    {
        date: "02.09.26",
        title: "Someone met someone.",
        text: "Two people came in separately. They left together. We will absolutely not ask questions."
    }

];

let currentEntry = 0;


function displayJournal() {

    let entry = journalEntries[currentEntry];

    document.getElementById("journalDate")
        .textContent = entry.date;

    document.getElementById("journalTitle")
        .textContent = entry.title;

    document.getElementById("journalText")
        .textContent = entry.text;
}


function nextEntry() {

    currentEntry++;

    if (currentEntry >= journalEntries.length) {
        currentEntry = 0;
    }

    displayJournal();
}


function previousEntry() {

    currentEntry--;

    if (currentEntry < 0) {
        currentEntry = journalEntries.length - 1;
    }

    displayJournal();
}


/* =========================
   TABLE SELECTION
========================= */

function selectTable(number, button) {

    let buttons =
        document.querySelectorAll(".tables button");

    buttons.forEach(function(btn) {
        btn.style.background = "";
        btn.style.color = "";
    });

    button.style.background = "#8c4f35";
    button.style.color = "white";

    let descriptions = {

        1: "Table 01 · Window seat · good for people watching.",
        2: "Table 02 · Two seats · afternoon sun included.",
        4: "Table 04 · Quiet corner · one power outlet.",
        5: "Table 05 · Four seats · good for conversations.",
        6: "Table 06 · Bar seat · best for solo coffee.",
        7: "Table 07 · Bar seat · where the journal started."

    };

    document.getElementById("tableInfo")
        .textContent = descriptions[number];
}


/* =========================
   LOYALTY CARD
========================= */

let stamps = 0;


function addStamp() {

    if (stamps >= 5) {
        alert("🎉 You already earned your free coffee!");
        return;
    }

    stamps++;

    document.getElementById("stamp" + stamps)
        .classList.add("active");

    if (stamps === 5) {
        setTimeout(function() {
            alert("☕ FIVE COFFEES!\nYour next one is on us.");
        }, 200);
    }
}


/* =========================
   WHAT KIND OF 4 PM?
========================= */

function fourPM(type) {

    let result = "";

    if (type === "coffee") {

        result =
            "☕ You're a classic 4 PM person.<br>" +
            "Order a Caramel Macchiato + Cinnamon Roll.";

    }

    else if (type === "quiet") {

        result =
            "📖 Table 04 is waiting for you.<br>" +
            "Get a cappuccino and disappear for an hour.";

    }

    else if (type === "friends") {

        result =
            "🧑‍🤝‍🧑 Grab Table 05.<br>" +
            "Get the loaded croissants. Get two.";

    }

    else if (type === "rain") {

        result =
            "🌧️ Window seat. Iced Spanish Latte.<br>" +
            "Watch the rain and pretend you're in a movie.";

    }

    document.getElementById("pmResult")
        .innerHTML = result;
}