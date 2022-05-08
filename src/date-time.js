let locales = 'en-EN'

export function setLocales(locale) {
    locales = locale;
}

export const monthNames = [
    getMonthLong('1.1.1970'),
    getMonthLong('2.1.1970'),
    getMonthLong('3.1.1970'),
    getMonthLong('4.1.1970'),
    getMonthLong('5.1.1970'),
    getMonthLong('6.1.1970'),
    getMonthLong('7.1.1970'),
    getMonthLong('8.1.1970'),
    getMonthLong('9.1.1970'),
    getMonthLong('10.1.1970'),
    getMonthLong('11.1.1970'),
    getMonthLong('12.1.1970')
];

export const weekdays = [getWeekdayShort('1.4.1970'),
    getWeekdayShort('1.5.1970'),
    getWeekdayShort('1.6.1970'),
    getWeekdayShort('1.7.1970'),
    getWeekdayShort('1.8.1970'),
    getWeekdayShort('1.9.1970'),
    getWeekdayShort('1.10.1970')];

export function convertSelected(selected) {
    const options = {weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit'};

    return selected.toLocaleDateString(locales, options);
}

export function getDateRows(monthIndex, year) {
    const {days} = getMonthStats(monthIndex, year);
    const rows = getEmptyRows();
    const startIndex = new Date(year, monthIndex, 1).getDay();
    Array.from({length: days}).forEach((_, i) => {
        const index = startIndex + i;
        rows[index] = i + 1;
    });
    const filled = rows.map(i => (Array.isArray(i) ? undefined : i));

    return filled[35] ? filled : filled.slice(0, -7);
}

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = year => year % 4 === 0;

function getEmptyRows() {
    return Array.from({length: 42}).map(() => []);
}

export function getMonthLong(time) {
    return new Date(time).toLocaleDateString(locales, {
        month: 'long'
    })
}

function getWeekdayShort(time) {
    return new Date(time).toLocaleDateString(locales, {
        weekday: 'short'
    }).substr(0,2);
}

function getMonthDays(index, year) {
    return index !== 1 ? monthDays[index] : isLeapYear(year) ? 29 : 28;
}

function getMonthStats(monthIndex, year) {
    const today = new Date(year, monthIndex, 1);
    const index = today.getMonth();
    return {
        name: index[index],
        days: getMonthDays(index, year)
    };
}
