/* eslint-disable @typescript-eslint/no-unused-vars */
const formattedDate = new Date();
const day = formattedDate.getDate().toString().padStart(2, '0');
const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
const year = formattedDate.getFullYear();

const formattedDateString = `${day}/${month}/${year}`;

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
        membership_level: "premium",
        date_joined: new Date()
    },
    {
        username: "Beta",
        email: "beta@gmail.com",
        password: "nioka666",
        phone_number: "087755588990",
        meembership_level: "free",
        date_joined: new Date()
    },
    {
        username: "Rina Rina Pratiwi",
        email: "Sabri.Rath14@yahoo.com",
        password: "Nugraha",
        phone_number: "(+62) 920 0387 3552",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.160Z"
    },
    {
        username: "Rahmawati Bella",
        email: "Devi.Hartmann@yahoo.co.id",
        password: "Najwa",
        phone_number: "(+62) 28 0090 718",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Koko Hermawan",
        email: "Galar66@gmail.co.id",
        password: "Rahmat",
        phone_number: "(+62) 875 3857 7269",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Cecep Narpati",
        email: "Hesti.Hamill59@yahoo.co.id",
        password: "Legawa",
        phone_number: "0261 6247 3738",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Luhung Syahreza",
        email: "Amalia83@gmail.com",
        password: "Raisa",
        phone_number: "(+62) 729 2448 326",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Ivan Ivan Pranowo",
        email: "Noviana_Bins53@yahoo.co.id",
        password: "Daliono",
        phone_number: "0855 5125 9961",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Hilda Padmasari",
        email: "Budi.Renner11@gmail.com",
        password: "Anggun",
        phone_number: "(+62) 459 9732 367",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Melinda Cici",
        email: "Samiah.Hilpert90@yahoo.co.id",
        password: "Dinda",
        phone_number: "0554 1973 2116",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Ade Ade Saputri",
        email: "Teguh22@yahoo.com",
        password: "Teguh",
        phone_number: "0966 6019 537",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Hidayat Nrima",
        email: "Malika.Heathcote17@gmail.com",
        password: "Banawa",
        phone_number: "(+62) 501 5512 072",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Soleh Soleh Manullang",
        email: "Cinta_Von48@yahoo.com",
        password: "Gilda",
        phone_number: "(+62) 531 7151 2969",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Cakrabirawa Cakrabirawa Hakim",
        email: "Olga65@gmail.com",
        password: "Jinawi",
        phone_number: "0846 9247 5767",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.161Z"
    },
    {
        username: "Cornelia Sudiati",
        email: "Aditya39@yahoo.com",
        password: "Hasta",
        phone_number: "(+62) 829 618 413",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.162Z"
    },
    {
        username: "Tirtayasa Marbun",
        email: "Kawaya59@gmail.co.id",
        password: "Lega",
        phone_number: "0831 340 813",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.163Z"
    },
    {
        username: "Iswahyudi Mahdi",
        email: "Anom30@gmail.co.id",
        password: "Hamima",
        phone_number: "(+62) 534 8647 663",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.163Z"
    },
    {
        username: "Ophelia Nurlaela",
        email: "Karma1@gmail.com",
        password: "Cakrabirawa",
        phone_number: "(+62) 490 6887 5879",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.163Z"
    },
    {
        username: "Najmudin Mitra",
        email: "Pardi_Brown6@yahoo.co.id",
        password: "Waluyo",
        phone_number: "029 4350 226",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.163Z"
    },
    {
        username: "Laksana Handoko",
        email: "Emin.Hand@yahoo.co.id",
        password: "Jono",
        phone_number: "0993 4762 308",
        membership_level: "Fans",
        date_joined: "2024-01-28T00:45:35.163Z"
    }
];

export const TransactionsSeeder = [
    {
        users_id: "655b27b99bb9954064cd77e4",
        username: "adhimNiokagi",
        membership_level: "Noble Fans",
        amount: 50000,
        photo_evidence: 'ev.jpg',
        status: "Unprocessed",
        date_transaction: formattedDateString
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
];

export const MembershipsSeeder = [
    {
        level: 'Fan',
        prices: 0,
        features: ['Streaming for free', 'No ads'],
    },
    {
        level: 'Ordinary Fans',
        prices: 50000,
        features: ['Basic feature 1', 'Basic feature 2', 'Premium feature 1', 'Premium feature 2'],
    },
    {
        level: 'Noble Fans',
        prices: 100000,
        features: ['Basic feature 1', 'Basic feature 2', 'Premium feature 1', 'Premium feature 2'],
    },
];

export const BookmarksSeeder = [
    {
        created_at: new Date()
    }
];