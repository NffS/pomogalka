/**
 * Created by Alex on 14.07.2014.
 */
var mongojs = require('mongojs');
var db = mongojs("127.0.0.1/pomogalka",["requests", "users"]);

db.requests.drop(function(){
    var request1 = {
        _id: 1,
        coord: {
            lat: 46.471120,
            lng: 30.740619,
            title: "Собор ёба!",
            infoWindow: {
                content: "<div class='circular' style='background: url(img/photo.jpg) no-repeat;'></div>" +
                    "<h2>Собор</h2>" +
                    "<p>Описание описывает описывает описывает описывает описывает описывает описывает описывает " +
                    "описывает описывает описывает описывает описывает описывает описывает описывает описывает " +
                    "описывает описывает описывает описывает описывает описывает " +
                    "описывает описывает описывает описывает описывает описывает</p>" +
                    "<paper-button raisedButton class='colored' label='Подробнее' onclick='openRequest(1)'></paper-button>"
            }
        },
        user: { user_id: 1, name: "John2", surname: "Malcovich2", avatar: "K1U2U23G43JEU.jpg" },
        address: "address",
        description: "description",
        title: "title",
        helperAmount: 2,
        state: "open", // closed
        type: "user", // poor, city
        candidates: [
            { user_id: 2, name: "John2", surname: "Malcovich2", avatar: "K1U2U23G43JEU.jpg" },
            { user_id: 3, name: "John3", surname: "Malcovich3", avatar: "K1U2U23G43JEU.jpg" }
        ],
        helpers: [
            { user_id: 3, name: "John3", surname: "Malcovich3", avatar: "K1U2U23G43JEU.jpg" },
            { user_id: 3, name: "John3", surname: "Malcovich3", avatar: "K1U2U23G43JEU.jpg" }
        ],
        helps: [{
            users: [
                { user_id: 2, name: "John2", surname: "Malcovich2", avatar: "K1U2U23G43JEU.jpg" },
                { user_id: 3, name: "John3", surname: "Malcovich3", avatar: "K1U2U23G43JEU.jpg" }
            ],
            date: new Date("27/01/2007")
        },{
            users: [
                { user_id: 2, name: "John2", surname: "Malcovich2", avatar: "K1U2U23G43JEU.jpg" },
                { user_id: 3, name: "John3", surname: "Malcovich3", avatar: "K1U2U23G43JEU.jpg" }
            ],
            date: new Date("27/01/2008")
        }
        ]
    };
    var request2 = {
        _id: 2,
        coord: {
            lat: 46.455410,
            lng: 30.754048,
            title: "Лорансятник",
            infoWindow: {
                content: "<div class='circular' style='background: url(img/photo.jpg) no-repeat;'></div>" +
                    "<h2>Собор</h2>" +
                    "<p>Описание описывает описывает описывает описывает описывает описывает описывает описывает " +
                    "описывает описывает описывает описывает описывает описывает описывает описывает описывает " +
                    "описывает описывает описывает описывает описывает описывает " +
                    "описывает описывает описывает описывает описывает описывает</p>" +
                    "<paper-button raisedButton class='colored' label='Подробнее' onclick='openRequest(2)'></paper-button>"
            }
        },
        user: { user_id: 1, name: "John2", surname: "Malcovich2", avatar: "K1U2U23G43JEU.jpg" },
        address: "address",
        description: "description",
        title: "title",
        helperAmount: 2,
        state: "open", // closed
        type: "user", // poor, city
        candidates: [
            { user_id: 2, name: "John2", surname: "Malcovich2", avatar: "K1U2U23G43JEU.jpg" },
            { user_id: 3, name: "John3", surname: "Malcovich3", avatar: "K1U2U23G43JEU.jpg" }
        ],
        helpers: [
            { user_id: 3, name: "John3", surname: "Malcovich3", avatar: "K1U2U23G43JEU.jpg" },
            { user_id: 3, name: "John3", surname: "Malcovich3", avatar: "K1U2U23G43JEU.jpg" }
        ],
        helps: [{
            users: [
                { user_id: 2, name: "John2", surname: "Malcovich2", avatar: "K1U2U23G43JEU.jpg" },
                { user_id: 3, name: "John3", surname: "Malcovich3", avatar: "K1U2U23G43JEU.jpg" }
            ],
            date: new Date("27/01/2007")
        },{
            users: [
                { user_id: 2, name: "John2", surname: "Malcovich2", avatar: "K1U2U23G43JEU.jpg" },
                { user_id: 3, name: "John3", surname: "Malcovich3", avatar: "K1U2U23G43JEU.jpg" }
            ],
            date: new Date("27/01/2008")
        }
        ]
    };
    db.requests.insert([request1, request2]);
});


db.users.drop(function(){
    var user1 = {
        _id: 2,
        name: "John2",
        surname: "Malcovich2",
        avatar: "K1U2U23G43JEU.jpg",
        phone: "099-23-45-852",
        address: "address",
        email: "e@mail.com",
        reputation: 0.1,
        requests: [
            {request_id: 1, title: "title1"},
            {request_id: 2, title: "title2"}
        ],
        helps: [
            {request_id: 1, title: "asd", date: new Date()},
            {request_id: 2, title: "asd", date: new Date()},
            {request_id: 3, title: "asd", date: new Date()}
        ]
    };
    db.users.insert(user1);
});

db.requests.insert({title: "title"}, function (err, data){
    console.log(err);
    console.log(data);
});


