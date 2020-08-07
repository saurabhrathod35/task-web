
import * as _ from 'lodash';
export interface BaseInterface {
    internals: Array<string>;
}

let count = 0;

export class Base {
    static schema;

    _id?: string = undefined;
    title: string = undefined;

    constructor(base?) { }

    static getSchema() {
        return this.schema;
    }

    static setSchema(schema) {
        this.schema = schema;
    }

    get(key) {
        return _.get(this, key);
    }

    setInstance(base?) {
        if (base) {
            for (const key in base) {
                if (base.hasOwnProperty(key)) {
                    if (typeof this[`set${key}`] === "function") {
                        // calling setter method for access child methods
                        this[`set${key}`](_.cloneDeep(base[key]));
                    } else {
                        this[key] = _.cloneDeep(base[key]);
                    }
                }
            }
        }
    }

    setId(id?) {
        this._id = id || this.getId();
    }

    getId() {
        return this._id || this.mongoObjectId();
    }
  
    settitle(title) {
        if(title) {
            this.title = title.trim();
        } // Don't remove if condition (title || '').trim() would add '' title in all the classes extended from Base class
    }

    getClone(key?) {
        if (key) {
            if (typeof this[key] === 'function') {
                return _.cloneDeep(this[key]());
            }

            return _.cloneDeep(this[key]);
        }
        
        return _.cloneDeep(this);
    }
    
    getExposeArray(array) {
        const exposeArray = []
        array.forEach((item) => {
            if (typeof item['getExpose'] === "function") {
                exposeArray.push(item['getExpose']());
            }
        });
        return exposeArray;
    }

    getExpose() {
        const exposeObject: any = {};
        for (const key in this) {
            // _.isUndefined() is used for false and 0 case don't remove
            if (!_.isUndefined(this[key]) && this.hasOwnProperty(key) && !((this['internals'] || []).find(item => item == key)) && key != 'internals') {
                if (typeof this['get' + key + 'Expose'] === "function") {
                    exposeObject[key] = this['get' + key + 'Expose']();
                } else if (this[key] && typeof this[key]['getExpose'] === "function") {
                    exposeObject[key] = this[key]['getExpose']();
                }   else {
                    exposeObject[key] = this[key];
                }
            }
        }
        return exposeObject;
    }

    private mongoObjectId() {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }

} 