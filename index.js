/**
 * @description Storage data with expiration time
 */
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Set storage
 * @param {string} key storage key
 * @param {any} value storage data
 * @param {number} expire expiration time(second)
 */
const setItem = async (key, value, expire = null) => {
    try {
        const expireDate = createExpiredDate(expire),
            saveData = {
                saveTime: new Date(),
                expireDate,
                value
            };

        return await AsyncStorage.setItem(key, JSON.stringify(saveData));
    } catch (e) {
        return e;
    }
};

/**
 * Merge storage
 * @param {string} key storage key
 * @param {any} value storage data
 * @param {number} expire expiration time(second)
 */
const mergeItem = async (key, value, expire = null) => {
    try {
        const prevCache = await AsyncStorage.getItem(key),
            prevData = JSON.parse(prevCache),
            expireDate = expire ? createExpiredDate(expire) : prevData.expireDate,
            saveData = {
                saveTime: new Date(),
                expireDate,
                value
            };

        return await AsyncStorage.mergeItem(key, JSON.stringify(saveData));
    } catch (e) {
        return e;
    }
}

/**
 * Get storage
 * @param {string} key storage key
 */
const getItem = async (key) => {
    try {
        const result = await AsyncStorage.getItem(key);

        return checkCacheData(result, key);
    } catch (e) {
        return e;
    }
};

/**
 * Remove storage
 * @param {string} key storage key
 */
const removeItem = async (key) => {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (e) {
        return e;
    }
};

/**
 * Clear all storage
 */
const clear = async () => {
    try {
        return await AsyncStorage.clear();
    } catch (e) {
        return e;
    }
};

/**
 * Get all keys of storage
 */
const getAllKeys = async () => {
    try {
        return AsyncStorage.getAllKeys();
    } catch (e) {
        return e;
    }
};

/**
 * Check storage data
 * @param {object} result
 * @param {string} key
 */
function checkCacheData(result, key) {
    if (!result) {
        return null;
    }

    try {
        const data = JSON.parse(result);

        // is expired
        if (checkExpireDate(data.expireDate)) {
            // remove data
            removeItem(key);
            return null;
        }

        return data.value;
    } catch (e) {
        return e;
    }
}

/**
 * Check expireDate
 * @param {string} expireDate
 */
function checkExpireDate(expireDate) {
    if (!expireDate) {
        return false;
    }

    const currentTime = new Date().getTime(),
        expiredTime = new Date(expireDate).getTime();

    return expiredTime < currentTime;
}

/**
 * Create expire time
 * @param {numner} expire
 */
function createExpiredDate(expire) {
    // if expire is 0 or undefined or null, return null
    if (!expire) {
        return null;
    }

    const seconds = expire * 1000, // transfer second to millisecond
        expiredTime = new Date().getTime() + seconds;

    return new Date(expiredTime);
}

export default {
    setItem,
    getItem,
    mergeItem,
    removeItem,
    clear,
    getAllKeys
};
