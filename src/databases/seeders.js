export const AdminsSeeder = [
    {
        username: "Adhim",
        email: "niokagi@gmail.com",
        password: "nioka666",
        profile_url: "gojj.jpg"
    }
];

export const UsersSeeder = [
    {
        username: "adhimNiokagi",
        email: "niokagi@gmail.com",
        password: "nioka666",
        phone_number: "087755588990",
        role: "admin",
        membership_level: "premium",
        date_joined: new Date()
    },
    {
        username: "Beta",
        email: "beta@gmail.com",
        password: "nioka666",
        phone_number: "087755588990",
        role: "user",
        meembership_level: "free",
        date_joined: new Date()
    },
];

export const TransactionsSeeder = [
    {
        username: "adhimNiokagi",
        membership_level: "Fan",
        amount: 8.33,
        status: "process",
        date_transaction: new Date()
    },
];

export const AnimesSeeder = [
    {
        slug: "spy-x-family",
        title: "Spy x Family",
        episodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        image: "img/tf.jpg",
        genres: "comedy",
        description: "test",
        status: "finished",
        type: "Sub",
        release_date: "2023"
    }
]

export const MembershipsSeeder = [
    {
        level: 'Fan',
        prices: 0,
        features: ['Streaming for free', 'No ads'],
    },
    // {
    //     level: 'basic',
    //     prices: {
    //         Monthly: 9.99,
    //         Yearly: 99.99,
    //     },
    //     features: ['Basic feature 1', 'Basic feature 2', 'Premium feature 1', 'Premium feature 2'],
    // },
    {
        level: 'Noble Fan',
        prices: 8.33,
        features: ['Basic feature 1', 'Basic feature 2', 'Premium feature 1', 'Premium feature 2'],
    },
]

export const BookmarksSeeder = [
    {
        created_at: new Date()
    }
]