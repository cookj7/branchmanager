export class StorageItem {
    constructor(name, data = '') {
        this.name = name

        try {
            let item = JSON.parse(data)
            this.value = item.value || ''
        } catch(e) {
            this.value = ''
        }
    }

    setValue(value) {
        this.value = value
    }

    prepare() {
        return JSON.stringify({
            value: this.value,
        })
    }
}
