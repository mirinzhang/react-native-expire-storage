# react-native-expire-storage

Use react-native AsyncStorage storage data by add expiration time

### Install

```bash
npm i -S react-native-expire-storage
```

### Usage

```javascript
import Storage from 'react-native-expire-storage';

// setItem
/**
 * Set storage
 * @param {string} key storage key
 * @param {any} value storage data
 * @param {number} expire expiration time(second)
 */
Storage.setItem('key1', {data: {name: 'tom', age: 12}, id: 0, str: 'key1 data'}, 60 * 60);

Storage.getItem('key1'); // {data: {name: 'tom', age: 12}, id: 0, str: 'key1 data'}

Storage.mergeItem('key1', {{data: {age: 13}, str: 'key1 data changed'}});

Storage.getItem('key1'); // {data: {name: 'tom', age: 13}, id: 0, str: 'key1 data changed'}

Storage.getAllKeys(); // ['key1']

Storage.removeItem();

// Storage.clear() // clear all storage data

Storage.getItem('key1'); // null
```
