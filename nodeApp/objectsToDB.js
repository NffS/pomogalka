/**
 * Created by Alex on 14.07.2014.
 */
var mongojs = require('mongojs');
var db = mongojs("127.0.0.1/pomogalka",["requests", "users"]);

db.requests.drop(function(){
    var request1 = {
        _id: mongojs.ObjectId('53ce913521207bcc774d2251'),
        point: { type: "Point", coordinates: [ 46.471120, 30.740619 ] },
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
                    "<paper-button raisedButton class='colored' label='Подробнее' onclick='openRequest(\"53ce913521207bcc774d2251\")'></paper-button>"
            }
        },
        date: new Date(),
        user: { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
        address: "address",
        description: "description",
        title: "title",
        helperAmount: 2,
        state: "open", // closed
        type: "user", // poor, city
        candidates: [
            { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
            { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" }
        ],
        helpers: [
            { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" },
            { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" }
        ],
        helps: [{
                users: [
                    { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
                    { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" }
                ],
                date: new Date("27/01/2007")
            },{
                users: [
                    { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
                    { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" }
                ],
                date: new Date("27/01/2008")
            }
        ],
        messages: [ {
                user: { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
                text: "Hello. Im a banana",
                date: new Date()
            },{
                user: { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
                text: "Hello. Im a banana",
                date: new Date()
            },{
                user: { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
                text: "Hello. Im a banana",
                date: new Date()
            }
        ]
    };
    var request2 = {
        _id: mongojs.ObjectId('53ce913521207bcc774d225c'),
        point: { type: "Point", coordinates: [ 46.455410, 30.754048 ] },
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
                    "<paper-button raisedButton class='colored' label='Подробнее' onclick='openRequest(\"53ce913521207bcc774d225c\")'></paper-button>"
            }
        },
        date: new Date(),
        user: { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
        address: "address",
        description: "Описание описывает описывает описывает описывает описывает описывает описывает описывает " +
            "описывает описывает описывает описывает описывает описывает описывает описывает описывает " +
            "описывает описывает описывает описывает описывает описывает " +
            "описывает описывает описывает описывает описывает описывает",
        title: "title",
        helperAmount: 2,
        state: "open", // closed
        type: "user", // poor, city
        candidates: [
            { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
            { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" }
        ],
        helpers: [
            { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" },
            { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" }
        ],
        helps: [{
                users: [
                    { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
                    { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" }
                ],
                date: new Date("27/01/2007")
            },{
                users: [
                    { _id: 2, name: "John2", surname: "Malcovich2", avatar: "photo.jpg" },
                    { _id: 3, name: "John3", surname: "Malcovich3", avatar: "photo.jpg" }
                ],
                date: new Date("27/01/2008")
            }
        ]
    };
    db.requests.insert([request1, request2]);
    db.requests.ensureIndex({point:"2dsphere"});
});

var ch2 = {
    _id: mongojs.ObjectId('53ce913521207bcc774d225c'),
    title: "Заголовок оказаной помощи",
    helpers: [
        { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" },
        { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" }
    ],
    type: "toUser", //fromUser, create
    date: new Date()
};
var ch1 = {
    _id: mongojs.ObjectId('53ce913521207bcc774d2251'),
    title: "Заголовок оказаной помощи",
    helpers: [
        { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" },
        { _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'), name: "John3", surname: "Malcovich3", avatar: "photo.jpg" }
    ],
    type: "fromUser",
    date: new Date()
};
var ch3 = {
    _id: mongojs.ObjectId('53ce913521207bcc774d2251'),
    title: "Заголовок созданной помощи",
    type: "create",
    date: new Date(),
    description: "Описание ола ываты авышта выштваыь лва мвашыдм иошд алыо аыои аы ыао м аы м ылмы  лмытма аыомтыа лдаытмтамв дшвытамшваым штвамшыоав дшвыаомлы  жщыоишрмлжиы"
};
db.users.drop(function(){
    var user1 = {
        _id: mongojs.ObjectId('53d39edc7e0ffe00007f1190'),
        name: "John2",
        surname: "Malcovich2",
        avatar: "photo.jpg",
        phone: "099-23-45-852",
        address: "address",
        email: "e@mail.com",
        reputation: 0.1,
        requests: [
            {_id: mongojs.ObjectId('53ce913521207bcc774d2251'), title: "title1"},
            {_id: mongojs.ObjectId('53ce913521207bcc774d225c'), title: "title2"}
        ],
        helps: [
            {_id: mongojs.ObjectId('53ce913521207bcc774d225c'), title: "asd", date: new Date()},
            {_id: mongojs.ObjectId('53ce913521207bcc774d225c'), title: "asd", date: new Date()},
            {_id: mongojs.ObjectId('53ce913521207bcc774d2251'), title: "asd", date: new Date()}
        ],
        chronicle: [ch2,ch1,ch3,ch2,ch1,ch3,ch2,ch1,ch3,ch2,ch1,ch3]
    };
    db.users.insert(user1);
});


