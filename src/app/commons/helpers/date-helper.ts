import * as moment from 'moment';

export class DateHelper {
    public static date(): moment.Moment {
        return moment();
    }

    public static stringToMomentDate(
        stringDate: string
    ): moment.Moment | null{
        if (!stringDate) {
            return null;
        }

        if (stringDate.includes('+')) {
            const dates = stringDate.split('+');
            const [date] = dates;
            return moment(date);   
        }
        return moment(stringDate)
    }
}