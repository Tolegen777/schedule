export const defaultDays = {
    Mon: 'Понидельник',
    Tue: 'Вторник',
    Wed: 'Среда',
    Thu: 'Четверг',
    Fri: 'Пятница',
    Sat: 'Суббота',
    Sun: 'Воскресенье',
}
export const dayParser = (dayEng) => {
    const [day, time] = dayEng.split(' ')
        return `${defaultDays[day]} ${time}`

}