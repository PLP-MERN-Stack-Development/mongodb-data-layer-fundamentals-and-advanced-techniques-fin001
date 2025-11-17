// queries.js

// ADDING MORE BOOKS TO THE COLLECTION

db.books.insertMany([
    {
        title: "The Silent Forest",
        author: "John Mathews",
        genre: "Adventure",
        published_year: 2005,
        price: 1200,
        in_stock: true,
        pages: 320,
        publisher: "Sunrise Publishing"
    },
    {
        title: "Digital Dreams",
        author: "Mary Johnson",
        genre: "Science Fiction",
        published_year: 2018,
        price: 1500,
        in_stock: true,
        pages: 410,
        publisher: "Nova Books"
    },
    {
        title: "Lost in Time",
        author: "Peter King",
        genre: "Science Fiction",
        published_year: 2012,
        price: 1800,
        in_stock: false,
        pages: 289,
        publisher: "Galaxy Press"
    },
    {
        title: "Cooking with Joy",
        author: "Sarah Cook",
        genre: "Cooking",
        published_year: 2020,
        price: 900,
        in_stock: true,
        pages: 150,
        publisher: "Kitchen House"
    },
    {
        title: "The Last Warrior",
        author: "Kevin Stone",
        genre: "Fantasy",
        published_year: 2010,
        price: 2000,
        in_stock: true,
        pages: 530,
        publisher: "Dragonfly Books"
    },
    {
        title: "Hidden Truths",
        author: "Anna Bright",
        genre: "Mystery",
        published_year: 2016,
        price: 1100,
        in_stock: false,
        pages: 350,
        publisher: "Sunrise Publishing"
    },
    {
        title: "African Tales",
        author: "James Otieno",
        genre: "Folklore",
        published_year: 1999,
        price: 700,
        in_stock: true,
        pages: 270,
        publisher: "Lakeview Press"
    }
]);

// BASIC CRUD & SEARCH QUERIES

db.books.find({ genre: "Fiction" });

db.books.find({ published_year: { $gt: 1910 } });

db.books.find({ author: "George Orwell" });

db.books.updateOne(
    { title: "The Great Gatsbys" },
    { $set: { price: 8.99 } }
);

db.books.deleteOne({ title: "Hidden Truths" });


// ADVANCED QUERIES

db.books.find({
    in_stock: true,
    published_year: { $gt: 1950 }
});

db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 });

db.books.find().sort({ price: 1 });

db.books.find().sort({ price: -1 });

db.books.find().skip(0).limit(5);

db.books.find().skip(5).limit(5);


// AGGREGATION PIPELINES

db.books.aggregate([
    { $group: { _id: "$genre", avg_price: { $avg: "$price" } } }
]);

db.books.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
]);

db.books.aggregate([
    {
        $group: {
            _id: {
                decade: {
                    $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ]
                }
            },
            total_books: { $sum: 1 }
        }
    },
    { $sort: { "_id.decade": 1 } }
]);


// INDEXING

db.books.createIndex({ title: 1 });

db.books.createIndex({ author: 1, published_year: -1 });

db.books.find({ title: "Brave New World" }).explain("executionStats");

db.books.find({ author: "Harper Lee", published_year: { $gt: 1910 } })
    .explain("executionStats");
