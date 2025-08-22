import { TransformFnParams } from "class-transformer";
import * as moment from "moment";

export function stringToDate(params: TransformFnParams) {
    const { value } = params;
    if(!value) {
        return value;
    }
    if(/\d{4}-\d{2}-\d{2}/.test(value)) {
        return moment(value, 'yyyy-MM-DD').toDate()
    }

    return new Date(value);
}