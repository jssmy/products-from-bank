import * as moment from 'moment';

export class DateHelper {
    public static date(): moment.Moment {
        return moment();
    }

    public static stringToMomentDate(
        stringDate: string
    ): moment.Moment {
        return moment(stringDate)
    }
}