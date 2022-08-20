function generateRandomName() {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let str = '';
    for (let i = 0; i < 32; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;
}

exports.generateRandomName = generateRandomName