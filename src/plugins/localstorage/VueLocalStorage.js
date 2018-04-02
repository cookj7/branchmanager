import { StorageItem } from './StorageItem'

class VueLocalStorage {
    /**
     * VueLocalStorage constructor
     */
    constructor () {
        this._properties = {}
        this._namespace = ''
        this._isSupported = true
    }

    /**
     * Namespace getter.
     *
     * @returns {string}
     */
    get namespace () {
        return this._namespace
    }

    /**
     * Namespace setter.
     *
     * @param {string} value
     */
    set namespace (value) {
        this._namespace = value ? `${value}.` : ''
    }

    /**
     * Concatenates localStorage key with namespace prefix.
     *
     * @param {string} lsKey
     * @returns {string}
     * @private
     */
    _getLsKey (lsKey) {
        return `${this._namespace}${lsKey}`
    }

    /**
     * Set a value to localStorage giving respect to the namespace.
     *
     * @param {string} key
     * @param {*} value
     * @private
     */
    _set (key, value) {
        const lsKey = this._getLsKey(key)

        window.localStorage.setItem(lsKey, value)
    }

    /**
     * Remove item from localStorage.
     *
     * @param key
     * @private
     */
    _remove(key) {
        const lsKey = this._getLsKey(key)

        return window.localStorage.removeItem(lsKey)
    }

    /**
     * Get value from localStorage giving respect to the namespace.
     *
     * @param {string} key
     * @returns {any}
     * @private
     */
    _get (key) {
        const lsKey = this._getLsKey(key)

        return window.localStorage[lsKey]
    }

    /**
     * Check value from localStorage giving respect to the namespace.
     *
     * @param {string} lsKey
     * @returns {boolean}
     * @private
     */
    _has (key) {
        const lsKey = this._getLsKey(key)

        return !!window.localStorage[lsKey]
    }

    /**
     * Get value from localStorage
     *
     * @param {String} lsKey
     * @param {*} defaultValue
     *
     * @returns {*}
     */
    get (key, defaultValue = null) {
        if (!this._isSupported) {
            return null
        }

        if (this._has(key)) {
            let item = new StorageItem(key, this._get(key))

            return item.value
        }

        return defaultValue
    }

    /**
     * Check for value from localStorage
     *
     * @param {String} lsKey
     *
     * @returns {*}
     */
    has (key) {
        if (!this._isSupported) {
            return null
        }

        return this._has(key)
    }

    /**
     * Set localStorage value
     *
     * @param {String} key
     * @param {*} value
     */
    set (key, value) {
        if (!this._isSupported) {
            return null
        }

        let item = new StorageItem(key)
        item.setValue(value)

        this._set(key, item.prepare())
    }

    /**
     * Remove value from localStorage
     *
     * @param {String} lsKey
     */
    remove (key) {
        if (!this._isSupported) {
            return null
        }

        this._remove(key)
    }
}

export default new VueLocalStorage()
