const STORAGE_TOKEN = 'HG5TM8THEIZFOR2IUXZYO5QBZ15A4CKD196K9PQW';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * This function uploads data into the backend server to be stored.
 * 
 * @param {string} key - This param defines the name of the Array where certain data is stored. 
 * @param {json} value - This param is a stringifyed JSON with the object values to be stored.
 * @returns 
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}


