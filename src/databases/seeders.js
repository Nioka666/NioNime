export const AdminsSeeder = [
    {
        username: "nioka",
        email: "niokagi@gmail.com",
        password: "nioka666"
    }
]

export const UsersSeeder = [
    {
        username: "adhimNiokagi",
        email: "niokagi@gmail.com",
        password: "nioka666",
        phone_number: "087755588990",
        role: "admin",
        membership_level: "premium",
        age: 18,
        date_joined: new Date()
    },
    {
        username: "Beta",
        email: "beta@gmail.com",
        password: "nioka666",
        phone_number: "087755588990",
        role: "user",
        meembership_level: "free",
        age: 2,
        date_joined: new Date()
    },
];

export const TransactionsSeeder = [
    {
        username: "adhimNiokagi",
        membership_level: "premium",
        amount: 99000,
        status: "pending",
        date: new Date()
    },
];

export const AnimesSeeder = [
    {
        api_key: "spy-x-family",
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
        level: 'free',
        prices: {
            Monthly: 0,
            Yearly: 0,
        },
        features: ['Basic feature 1', 'Basic feature 2', 'Premium feature 1', 'Premium feature 2'],
    },
    {
        level: 'basic',
        prices: {
            Monthly: 9.99,
            Yearly: 99.99,
        },
        features: ['Basic feature 1', 'Basic feature 2', 'Premium feature 1', 'Premium feature 2'],
    },
    {
        level: 'premium',
        prices: {
            Monthly: 15.99,
            Yearly: 159.99,
        },
        features: ['Basic feature 1', 'Basic feature 2', 'Premium feature 1', 'Premium feature 2'],
    },
]

export const BookmarksSeeder = [
    {
        created_at: new Date()
    }
]