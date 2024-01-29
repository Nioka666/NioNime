import fs from 'fs';
import { allFakers } from '@faker-js/faker';

const data = [];

for (let i = 0; i < 50; i++) {
    try {
        const fullName = allFakers["id_ID"].person.fullName();
        const phoneNumber = allFakers["id_ID"].phone.number();
        const email = allFakers["id_ID"].internet.email();
        const password = allFakers["id_ID"].person.firstName();

        const personData = {
            username: fullName,
            email: email,
            password: password,
            phone_number: phoneNumber,
            membership_level: "Fans",
            date_joined: new Date()
        };

        data.push(personData);
    } catch (e) {
        console.log(`Terjadi kesalahan: ${e}`);
    }
}

const jsonData = JSON.stringify(data, null, 2);

try {
    fs.writeFileSync('./res/dummyData.json', jsonData);
    console.log('Data berhasil ditulis ke dummyData.json');
} catch (error) {
    console.error(`Terjadi kesalahan saat menulis file: ${error}`);
}
